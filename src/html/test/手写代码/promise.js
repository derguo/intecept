/*
 * @Descripttion:
 * @version:
 * @Author: wang zhiguo
 * @Date: 2020-05-03 21:42:27
 * @LastEditors: wang zhiguo
 * @LastEditTime: 2020-05-14 00:30:48
 */
/*
 * 1.有三个状态pending、fulfilled、rejected
 * 2.能存储一个值，这个值能且只能在内部改变一次
 * 3.有注册回调函数，then和catch，这里catch是then(undefined, function())的语法糖
 * 4.需要有模拟微任务的机制。负责把回调函数们放在当前宏任务之后执行，这里用settimeout来暂代，但是还不够谨慎
 * 5.有负责执行回调的函数负责执行注册的所有回调。
 * 6.在执行构造函数和执行回调函数的时候需要抓取报错error，处理报错原生Promise里有以下情况
 *   ①在promise的构造函数中报错，优先在then第二函数中处理
 *   ②在then第一第二函数报错，都是由下一个then或catch处理，也就是说传递给下一个promise处理
 *   ③promise内部报错不会对外抛出
 * 7.（本手写Promise在执行上是错的）执行顺序上，注册的回调是分别被插入微任务的，也就是说注册一个回调就形成一个微任务，不是注册的回调统一在一个微任务中一起执行。模拟这个MyPromise实现的是错误的
 *    也就是说分两种情况，如果在pending状态下注册的，当改变状态的时候，这些回调都会一起执行，如果在其他状态注册的，不同的promise注册按照注册顺序执行。
 * ！！！如上第七点已经得到修正，目前针对于第七点，处理方式和原生Promise机制是一样的
 */

module.exports = (function () {
  var con = 0;
  return function MyPromise(executor) {
    var c = ++con;
    // pending、fulfilled、rejected
    const PENDING = "pending";
    const FULFILLED = "fulfilled";
    const REJECTED = "rejected";
    var value;
    var state = PENDING;

    var onQueue = [];

    var lastp;

    function change(s, v) {
      if (state === PENDING) {
        value = v;
        state = s;
        if (!onQueue.length && state === REJECTED) {
          /* 当没有注册回调函数，而且状态为rejected，则在任务中放入一个提示任务。
          如果在一个运行的这个宏任务中注册了回调，则在run中提示任务被移除 */
          lastp = setTimeout(() => {
            console.error("在MyPromise里，需要注册一个处理错误的回调");
          }, 0);
        }
        onQueue.length && run();
      }
    }

    function run() {
      if (state === PENDING) {
        return;
      }

      while (onQueue.length) {
        /* 提示任务被移除，
        在这里只要注册了回调，上面的提示任务都会被移除，
        主要目的是把提示任务交给最后一个MyPromise去提示。
        原因是只要调用了register（也就是then或者catch）下面的代码会把状态往下传 
        如果这里判断相应状态移除提示任务，那么如果相应的状态回调为undefined，则就会保留提示，
        下面的代码又把状态传下去了，结果提示任务就提示两次
        并且如果注册多个回调，就会出现状态传递的多个分支。还要加以判断，麻烦没必要
        反正最后总会有个没有注册回调的MyPromise，
        把提示都抛给最后那个MyPromise处理，是最好的，也和原生Promise机制一样
        */
        clearTimeout(lastp);
        let onObj = onQueue.shift();
        setTimeout(() => {
          if (onObj[state].on) {
            try {
              let returnvalue = onObj[state].on(value);
              if (returnvalue instanceof MyPromise) {
                returnvalue.then(onObj[FULFILLED].next, onObj[REJECTED].next);
              } else {
                onObj[FULFILLED].next(returnvalue);
              }
            } catch (error) {
              onObj[REJECTED].next(error);
            }
          } else {
            onObj[state].next(value);
          }
        }, 0);
      }
    }

    function register(onFulfilled, onRejected) {
      var nextPromise = new MyPromise(function (resolve, reject) {
        onQueue.push({
          [FULFILLED]: { on: onFulfilled, next: resolve },
          [REJECTED]: { on: onRejected, next: reject },
        });
      });

      run();
      return nextPromise;
    }

    var resolve = change.bind(this, FULFILLED);

    var reject = change.bind(this, REJECTED);

    this.then = register.bind(this);

    this.catch = register.bind(this, undefined);

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  };
})();
