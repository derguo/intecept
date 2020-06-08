&emsp;&emsp;网上很多手写Promise。根据自己的理解，也写了一份，晒出来希望能被大家指正。也给自己一个梳理的过程。初学者要辩证的看这个文档，你需要对原生Promise很熟悉。

&emsp;&emsp;代码其实非常简单，不到100行代码，主要是充分了解原生Promise都能做什么，有什么特征。在根据这些功能特征列出模拟Promise的需求，问题就解决了一大半了。这里会一步步的列出原生Promise的功能特征。再一步步的添加代码。每一步代码都是在上一步的代码基础上添加或修改得来的，在代码中会标识出哪里做了修改和增加，这样就不用翻来翻去看上一步的代码了，保证思路连贯性

&emsp;&emsp;说明一下，这里研究原生的Promise只看表象，不深入分析。文中代码的运行和测试都是在chrome【版本 81.0.4044.129（正式版本） （64 位）】中进行

&emsp;&emsp;文中代码虽然已经都测试过了，但是不能保证在复制粘贴过程中没错。所以最好理解之后自己敲一遍

**还有更重要的是：这里用setTimeout来模拟微任务，会和原生的Promise在程序中执行顺序有所不同。这点一定要了解。**
关于事件循环写了 一个简述文章，有兴趣的可以看一下:<a target="_blank" href="https://juejin.im/post/5ec00c83e51d454d9c3f94ca" title="简述JavaScript事件循环EventLoop">简述JavaScript事件循环EventLoop</a>

正文看起来有点长，其实都是重复的代码占的位置，内容很简单

### 一、Promise是个容器
首先是模拟Promise需要实现的最基本的需求
- **promise这个容器，用来存储异步或同步执行的结果。** 
- **还要有状态，来反映同步或者异步处理的阶段。有三种状态**

  1. pending 异步或同步的执行阶段，这个时候结果值为undefined
  2. fulfilled，通常表示同步或者异步成功返回了结果的状态，这时候结果值记录返回的正确结果
  3. rejected，通常表示同步或者异步出现错误时的状态，这个时候结果值记录错误的原因
- **在Promise对象外部不能直接访问到Promise的状态和值**

- **还需要有个执行同步或异步的函数（执行函数），以Promise参数的形式，在Promise构造函数中执行**

上代码：

```
/*'↓↓↓定义了MyPromise函数，参数executor（执行函数），数据类型是Funciotn,用来执行同步或异步操作↓↓↓'*/
/*'↓↓↓之所以用函数不用class，是为了方便定义对象私有变量和私有方法↓↓↓'*/
function MyPromise(executor){
    /*'↓↓↓定义了三个状态PENDING、FULFILLED、REJECTED↓↓↓'*/
    const PENDING = "pending";
    const FULFILLED = "fulfilled";
    const REJECTED = "rejected";
    
    /*'↓↓↓value变量存储异步结果（Promise的值），pending状态下是undefined，fulfilled状态下是执行结果，rejected状态下是错误原因↓↓↓'*/
    let value;
    
    /*'↓↓↓state变量用来存储Promise状态，初始状态是pending↓↓↓'*/
    let state = PENDING;
    
    /*'↓↓↓都定义好了，再运行执行函数↓↓↓'*/
    executor()
}

```

最基本的部分完成

### 二、内部操作状态和值

上面定义了容器中的状态和需要存储值的变量，而且运行了用户自己定义的执行方法，但是当执行函数有了结果，怎么改变容器的状态和存储结果呢？这就需要定义操作状态和值方法来处理。需求如下
- **值和状态只能改变一次**
- **操作状态和值的方法不向外暴露，内部通过resolve方法把状态改成fulfilled，通过reject方法把状态改变成rejected，并改变状态对应的值。这两个方法作为参数传给执行函数executor，由用户决定什么时候通过这两个方法改变状态和值。**

继续完善MyPromise ↓↓↓↓↓
```
function MyPromise(executor){
    const PENDING   = "pending";
    const FULFILLED = "fulfilled";
    const REJECTED  = "rejected";
    let value;
    let state = PENDING;
    
    /*'↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓这里是新加的改变状态和值的方法↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓'*/
    function change(newState, newValue){ //'用来修改状态和相应的值的方法'
        if (state === PENDING) {//'限制了只能在状态pending下改变，这样就保证状态和值只能改一次'
        value = newState;
        state = newValue;
      }
    }
    
    let resolve = change.bind(this, FULFILLED);// '定义了resolve函数，只能把状态改成fulfilled'
    let reject = change.bind(this, REJECTED);// '定义了reject函数，只能把状态改成fulfilled'
    //'resolve和reject都是change的偏函数，其实绑定this没啥意义，就是写着方便，修改方便，只关注change就行了，也便于阅读代码'
    /*'↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑这里是新加的改变状态和值的方法↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑'*/
    
    executor(resolve, reject)// ←←←'通过executor参数，传递到Promise外部使用'
}
```

### 三、需要注册回调函数
能存储状态和值了，也能修改状态和值了，但是还需要在相应状态下处理值的方法的呢，所以就需要注册回调函数了。

**Promise对象中有两个方法then和catch注册回调函数**
- **then有两个参数，第一个参数用来注册状态变为fulfilled时候处理返回值的回调，并且当状态改变之后，随时注册都可以处理那个已经固定了的返回值，第二个参数用来注册状态变为rejected时候处理错误原因的回调，并且当状态改变之后，随时注册都可以处理那个已经固定了的错误原因**
- **catch方法注册的回调等同于then的第二个函数的作用一样，其实catch就是then的语法糖，相当于then(undefined，function)**
- **catch和then都返回一个新的Promise**
- **一个Promise对象可以注册很多个回调，也就是new了一个Promise可以分别点上很多then或者catch，这里说的不是链式调用呦，是分别分别分别调用then或者catch。还是举个例子吧**
```
let p = new Promise((resolve, reject) => {})
p.then(value => {})
p.then(value => {})
p.catch(value => {})
/*'↑↑↑↑↑↑上面的代码说的是分别注册很多回调↑↑↑↑↑↑↑'*/
/*'各个回调是独立的，返回的新Promise也不是同一个，这相当于Promise状态传递出现了分支，这个后面再展开'*/

/*'↓↓↓↓↓↓下面是链式调用，这里说的不是这种情况↓↓↓↓↓↓↓↓↓↓↓↓↓'*/
p.then(value => {}).then(value => {}).then(value => {}).then(value => {})

```

根据上面的需求先吧这两个用来注册回调的方法加上
```
function MyPromise(executor){
    const PENDING   = "pending";
    const FULFILLED = "fulfilled";
    const REJECTED  = "rejected";
    let value;
    let state = PENDING;
    
    function change(newState, newValue){
        if (state === PENDING) {
        value = newState;
        state = newValue;
      }
    }
    
    let resolve = change.bind(this, FULFILLED);
    let reject = change.bind(this, REJECTED);
    
    /*'↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓这里是注册回调的方法↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓'*/
    var onQueue = []; //'→→→→→为了能注册多个回调，定义了onQueue，存储注册的回调，等待状态改变后调用'
    function register(onFulfilled, onRejected) {//'→→→→→用来注册回调的方法'
        let nextPromise = new MyPromise((nextResolve, nextReject) => {
          /*'↓↓↓↓↓↓↓↓↓向onQueue中添加注册的方法，用这种对象结构保存是为了之后调用方便↓↓↓↓↓↓↓↓↓'*/
          /*'↓↓↓↓↓↓↓↓↓至于为什么在Promise里写，后面会的内容会详细提到↓↓↓↓↓↓↓↓↓'*/
          onQueue.push({
            [FULFILLED]: { on: onFulfilled},
            [REJECTED]: { on: onRejected},
          });
        })
        return nextPromise;
    }
    this.then = register.bind(this);            //'→→→→→定义了Promise对象的then方法，注册处理返回值的回调方法'
    this.catch = register.bind(this, undefined);//'→→→→→定义了Promise对象的catch方法，是then的语法糖'
    /*'↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑这里是注册回调的方法↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑'*/
    
    executor(resolve, reject)
}
```
### 四、需要一个机制，来处理注册的回调。
当状态不是pending的时候，就需要执行注册的回调，那么就需要有一个处理回调的机制。这里添加一个run方法处理这个功能

在加功能之前还是定需求，看看原生Promise都干了些什么

**首先需要说明一下：这里说的执行注册的回调函数，并不是说直接执行，要遵循js的event loop事件循环机制。原生的Promise是把回调放入微任务等待，等此次宏任务执行完毕，再执行当前微任务**

**这里我们用setTimeout这个宏任务来模拟微任务**

**再看看什么时候开始处理回调：**
- **当状态从pending变为fulfilled或rejected的时候，就需要处理注册的回调**
- **当状态不是pending的时候，注册回调之后就需要马上处理**

不要着急，还有别的，看看链式调用都发生了什么，上例子：
```
new Promise((resolve, reject) => {
    // resolve('p ok')
    reject('p err')
}).then(value => {
    console.log("成功1 "+value)
    return "p1"
}, error => {
    console.log("失败1 "+error)//←←←←←←输出这里
    return "p1 err"
}).catch(err => {
    console.log("失败2 "+error)
    return "p2 err"
}).then(value => {
    console.log("成功3 "+value)//←←←←←←输出这里
    return new Promise((resolve, reject) => {
        reject("新的Promise失败了")
    })
}, error => {
    console.log("失败3 "+error)
    return "p3 err"
}).then(value => {
    console.log("成功4 "+value)
}, error => {
    console.log("失败4 "+error)//←←←←←←输出这里
})

//输出:
//失败1 p err
//test.html:56 成功3 p1 err
//test.html:66 失败4 新的Promise失败了


```
整了一个好长的链，简单说明一下情况，为了说的清楚，用一个图来解释一下：
![avatar](https://user-gold-cdn.xitu.io/2020/5/15/17218f37316a3b6b?w=914&h=594&f=jpeg&s=202156)
根据上面的例子总结出如下几点
- **then方法返回的Promise状态和值和用它注册的回调函数返回值有关。**
  1. 当回调函数返回值为非Promise对象的时候，then返回的Promise对象的状态是fulfilled，值为回调函数的返回值
  2. 当回调函数返回值为Promise对象的时候，then返回的Promise对象状态和值，继承回调函数返回的Promise对象的状态和值。
- **当前环节（当前then或者catch），没有相应状态的回调函数的时候，状态和值会向下传递。**
- 
根据上述原生Promise特征，继续增加MyPromise功能，加一个run方法用来实现处理注册的回调函数的机制
```
function MyPromise(executor){
    const PENDING   = "pending";
    const FULFILLED = "fulfilled";
    const REJECTED  = "rejected";
    let value;
    let state = PENDING;
    
    function change(newState, newValue){
        if (state === PENDING) {
        value = newState;
        state = newValue;
        run()//'→→→→→这里执行run方法。在状态改变的时候尝试处理一下回调函数
      }
    }
    
    let resolve = change.bind(this, FULFILLED);
    let reject = change.bind(this, REJECTED);
    
    /*'↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓这里处理注册的回调函数↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓'*/
    function run(){
      if (state === PENDING) {
        return;
      }
      while (onQueue.length) {
        let onObj = onQueue.shift();//'←←←从注册的回调中拿出一份，放入下面模拟的微任务中'
        setTimeout(() => {          //'←←←用setTimeout模拟微任务，把回调放入，等待执行'
          if (onObj[state].on) {    //'←←←判断当前状态下，是否注册了回调函数'
            let returnvalue = onObj[state].on(value);//'←←←有就运行回调函数，得到返回值'
            if (returnvalue instanceof MyPromise) {  //'←←←判断返回值是不是MyPromise类型'
              /*'↓↓↓返回值是MyPromise类型，用这个MyPromise对象的then方法，能得到返回MyPromise对象的状态和值
                 ↓↓↓再利用nextPromise的resolve和reject方法作为参数得到状态和值，这样就实现了继承状态和值'*/
              returnvalue.then(onObj[FULFILLED].next, onObj[REJECTED].next);
            } else {
              //'↓↓↓返回值不是MyPromise类型，直接改变nextPromise状态为fulfilled，值为回调函数的返回值'
              onObj[FULFILLED].next(returnvalue);   
            }
          } else {
            /*'↓↓↓当前状态没有注册回调函数，
               ↓↓↓则利用保存的nextPromise对象的resolve或reject，改变nextPromise对象的状态
               ↓↓↓这就相当于传递了状态和值'*/
            onObj[state].next(value);
          }  
        }, 0);
      }
    }
    /*'↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑这里处理注册的回调函数↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑'*/
    
    var onQueue = []; 
    function register(onFulfilled, onRejected) {
        let nextPromise = new MyPromise((nextResolve, nextReject) => {
          onQueue.push({
            /*"↓↓↓这里添加了next属性，为什么呢
               ↓↓↓上面的需求中提到了，状态和值会有向下传递的情况，还会有继承回调函数返回Promise对象状态和值的情况
               ↓↓↓要想改变下一个Promise对象（nextPromise）状态，只能通过它的resolve和reject方法
               ↓↓↓所以这里就把这俩方法提保存起来以便传递和继承状态使用↓↓↓↓"*/
            [FULFILLED]: { on: onFulfilled, next: nextResolve},
            [REJECTED]: { on: onRejected, next: nextReject},//'←←←之所以分开存，就是因为在方便向下传递状态'
          });
        })
        run() //'→→→→→这里执行run方法。用来处理注册的回调函数，run方法里有判断，为pending状态不处理回调函数'
        return nextPromise;
    }
    this.then = register.bind(this);
    this.catch = register.bind(this, undefined);
    
    executor(resolve, reject)
}
```
### 五、 报错处理
还是先上几个例子，看看原生Promise特点，总结一下需求。

- **Promise错误是不向外抛出的**
 
先来一个小实验
```
new Promise(() => {
    xxx;// 用一个未定义的变量抛错
})// 控制台输出了错误
console.log('我是后面的代码')// '但是也输出了这句，没有被阻塞，说明没有抛出到Promise外面'
```
上面的例子错误输出了，后面的代码也执行了。错误只是简单的输出，说明没有抛出到Promise外面。
但是如果Promise的参数是不是function类型，会发生什么
```
new Promise("hahaha") //Uncaught TypeError: Promise resolver hahaha is not a function
console.log('我是后面的代码')//'这里没有输出输出了'
```
上面例子错误输出了，后面的代码没有输出。说明错误抛出来了，所以：
- **Promise参数不是function类型，会向外抛出错误**

再来个例子，看看Promise是怎么处理各个部分报错的。
```
new Promise((resolve, reject) => {
    xxx;
    // resolve("ok")
    // reject('no')
    // xxx;
}).then(value => {                
    //xxx;
    console.log(value)//输出位置0
},err => {                        
    //xxx;
    console.log("err1",err)//输出位置1
}).catch(err => {                 
    console.log("err2",err)//输出位置2
})

当Prosmise的执行函数有错，输出位置1输出：err1 ReferenceError: xxx is not defined
当then第一个参数有错误，输出位置2输出：err1 ReferenceError: xxx is not defined
当then第二个参数有错误，输出位置2输出：err2 ReferenceError: xxx is not defined
这个例子把then的第二个参数去掉
当Prosmise的执行函数和then第一个参数有错，都在输出位置2输出：err2 ReferenceError: xxx is not defined
```
大家可以再变换一些方式测试错误处理的方式。根据以上例子可以总结
- **Promise对象执行函数报错，会把状态改成rejected,调用自身注册的onrejected函数。**
- **如果在Promise对象状态改变之后报错，则不会得到处理，更不会抛到对象外**
- **如果自身没有注册onrejected函数，错误逐级向下传递的。直到最后。也就是说，错误会在离它最近的onrejected函数得到处理。** 这与rejected状态传递方式一样。

```
function MyPromise(executor){
    const PENDING   = "pending";
    const FULFILLED = "fulfilled";
    const REJECTED  = "rejected";
    let value;
    let state = PENDING;
    
    function change(newState, newValue){
        if (state === PENDING) {
        value = newState;
        state = newValue;
        run()
      }
    }
    
    let resolve = change.bind(this, FULFILLED);
    let reject = change.bind(this, REJECTED);
    
    function run(){
      if (state === PENDING) {
        return;
      }
      while (onQueue.length) {
        let onObj = onQueue.shift();
        setTimeout(() => {
          if (onObj[state].on) {
            try{//'在加了回调函数运行时抓取错误'
              let returnvalue = onObj[state].on(value);
              if (returnvalue instanceof MyPromise) {
                returnvalue.then(onObj[FULFILLED].next, onObj[REJECTED].next);
              } else {
                onObj[FULFILLED].next(returnvalue);   
              }
            }catch(error){
              onObj[REJECTED].next(error);//'←←←如果回调函数报错则，以rejected的状态向下传递'
            }
          } else {
            onObj[state].next(value);
          }  
        }, 0);
      }
    }
    
    var onQueue = []; 
    function register(onFulfilled, onRejected) {
        let nextPromise = new MyPromise((nextResolve, nextReject) => {
          onQueue.push({
            [FULFILLED]: { on: onFulfilled, next: nextResolve},
            [REJECTED]: { on: onRejected, next: nextReject},
          });
        })
        run() 
        return nextPromise;
    }
    this.then = register.bind(this);
    this.catch = register.bind(this, undefined);
    
    //'↓↓↓加了判断，如果executor不是函数类型，就向外抛错'
    if (!(executor instanceof Function)) {
      throw new TypeError(executor + " 不是个函数。亲！MyPromise参数得是个函数的呢");
    }
    
    //'↓↓↓这里又加了try为执行函数运行时抓取错误'
    //'↓↓↓但是有个问题就是如果executor不是函数，光加个try就不会向外抛出错误了，所以在这前边再加个判断'
    try {
      executor(resolve, reject);
    } catch (error) {
      /*'↓↓↓如果执行函数报错，改变自身状态为rejected。
         ↓↓↓如果在状态改变之后报错，也会执行这里，但是前面已经限制了状态只能改变一次。
         ↓↓↓在这里调用reject方法就没有用了。达到了状态改变之后报错不处理的效果。'*/
      reject(error);
    }
}
```
**写到这里promise最基本的功能就实现了**。但是有那么一点点特征还没有，是锦上添花的功能，是啥呢。上例子
```
new Promise((resolve, reject) => {
    // xxx;
    resolve("ok")
    // reject('no')
})
//resolve时，控制台没输出
//reject时，控制台输出：Uncaught (in promise) no。意思就是错误没有处理
//在状态改变之前的错误，报错输出在控制台，但是也只是输出而已不是抛出错误。因为不会阻塞代码
```
上面例子说明报错和rejected状态没有被处理，虽然不会抛出，也不会影响程序。但是会在控制台有红字提示。所以最后把这个提示功能加上,下面的代码调整了一下顺秩序，看着更顺眼点，再添加提示的功能
```
function MyPromise(executor){
    const PENDING   = "pending";
    const FULFILLED = "fulfilled";
    const REJECTED  = "rejected";
    let value;
    let state = PENDING;
    
    let tipTask;//'为了能移除提示任务用的'
    
    function change(newState, newValue){
        if (state === PENDING) {
        value = newState;
        state = newValue;
        if (!onQueue.length && state === REJECTED) {
          /* '当状态为rejected，而且没有注册回调函数，则在任务中放入一个提示任务。
          如果在MyPromise运行的这个宏任务中注册了回调，则在run中提示任务被移除
          直到最后，肯定会有没有注册回调函数的MyPromise对象。这个对象就会执行这个提示任务了
          例如一个链式调用p.then().then()....then()不可能无穷的，总会有最后一个。
          这最后一个返回的promise就不会被注册回调。所以这里添加的提示任务就会被执行了
          ' */
          tipTask = setTimeout(() => {//'为了能移除这个任务。把变量放在MyPromise函数作用域下'
            console.error("在MyPromise里，需要注册一个处理错误的回调 \n" + (value || ''));
          }, 0);
        }
        run()
      }
    }
    
    function run(){
      if (state === PENDING) {
        return;
      }
      while (onQueue.length) {
        clearTimeout(tipTask);//'如果注册了回调。这里把change方法里加的提示任务移除掉'
        
        let onObj = onQueue.shift();
        setTimeout(() => {
          if (onObj[state].on) {
            try{
              let returnvalue = onObj[state].on(value);
              if (returnvalue instanceof MyPromise) {
                returnvalue.then(onObj[FULFILLED].next, onObj[REJECTED].next);
              } else {
                onObj[FULFILLED].next(returnvalue);   
              }
            }catch(error){
              onObj[REJECTED].next(error);
            }
          } else {
            onObj[state].next(value);
          }  
        }, 0);
      }
    }
    
    var onQueue = []; 
    function register(onFulfilled, onRejected) {
        let nextPromise = new MyPromise((nextResolve, nextReject) => {
          onQueue.push({
            [FULFILLED]: { on: onFulfilled, next: nextResolve},
            [REJECTED]: { on: onRejected, next: nextReject},
          });
        })
        run() 
        return nextPromise;
    }
    
    let resolve = change.bind(this, FULFILLED);
    let reject = change.bind(this, REJECTED);
    
    this.then = register.bind(this);
    this.catch = register.bind(this, undefined);
    
    if (!(executor instanceof Function)) {
      throw new TypeError(executor + " 不是个函数。亲！MyPromise参数得是个函数的呢");
    }
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
}
```
好了这就得到一个相对完美的模拟Promise的手写代码了。

其实Uncaught (in promise) no或者内部报错没处理在控制台输出，实际上在chrome中是在所有当前存在的宏任务队列任务（不是所有，是当前，也就是在运行这个Promise的宏任务运行时，所存在的宏任务）都执行完毕之后再输出（个人怀疑这个提示用的是不是setTimeout0呀哈哈哈）。

这里用setTimeout模拟的微任务，在js事件循环（event loop）循序上会和原生Promise有区别。

本文希望能给大家帮助，也希望能得到指点。文中使用的词语都是相对口语化的，如果您在正式场合使用，比如面试中，请使用更高大上的专业用语。谢谢