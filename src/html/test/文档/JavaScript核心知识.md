# JavaScript核心
- [JavaScript核心](#javascript%E6%A0%B8%E5%BF%83)
    - [基础数据结构](#%E5%9F%BA%E7%A1%80%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
        - [栈stack（后进先出--LIFO，last in first out）](#%E6%A0%88stack%E5%90%8E%E8%BF%9B%E5%85%88%E5%87%BA--lifolast-in-first-out)
        - [堆heap](#%E5%A0%86heap)
        - [队列queue（先进先出--FIFO，first in first out）](#%E9%98%9F%E5%88%97queue%E5%85%88%E8%BF%9B%E5%85%88%E5%87%BA--fifofirst-in-first-out)
    - [内存空间](#%E5%86%85%E5%AD%98%E7%A9%BA%E9%97%B4)
        - [基础数据类型与变量](#%E5%9F%BA%E7%A1%80%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B8%8E%E5%8F%98%E9%87%8F)
        - [引用数据类型与堆内存空间](#%E5%BC%95%E7%94%A8%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B8%8E%E5%A0%86%E5%86%85%E5%AD%98%E7%A9%BA%E9%97%B4)
        - [内存空间管理](#%E5%86%85%E5%AD%98%E7%A9%BA%E9%97%B4%E7%AE%A1%E7%90%86)
    - [执行上下文](#%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87)
        - [执行上下文三种情况](#%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E4%B8%89%E7%A7%8D%E6%83%85%E5%86%B5)
        - [执行上下文的生命周期](#%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
    - [变量对象](#%E5%8F%98%E9%87%8F%E5%AF%B9%E8%B1%A1)
        - [变量对象的创建过程](#%E5%8F%98%E9%87%8F%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%88%9B%E5%BB%BA%E8%BF%87%E7%A8%8B)
    - [作用域与作用域链](#%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE)
      - [作用域](#%E4%BD%9C%E7%94%A8%E5%9F%9F)
        - [全局作用域](#%E5%85%A8%E5%B1%80%E4%BD%9C%E7%94%A8%E5%9F%9F)
        - [函数作用域](#%E5%87%BD%E6%95%B0%E4%BD%9C%E7%94%A8%E5%9F%9F)
        - [块级作用域](#%E5%9D%97%E7%BA%A7%E4%BD%9C%E7%94%A8%E5%9F%9F)
      - [作用域链（Scope chain）](#%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BEscope-chain)
    - [闭包](#%E9%97%AD%E5%8C%85)
    - [this](#this)
    - [变量对象](#%E5%8F%98%E9%87%8F%E5%AF%B9%E8%B1%A1-1)
### 基础数据结构
##### 栈stack（后进先出--LIFO，last in first out）
栈可以看作一个按照顺序排列的消息数据（事件）集合。

这个集合可以看作是一个内部嵌套了一个方法的函数，
而这个内部方法又嵌套了一个方法，就这么嵌套了N层。
当执行这个方法时，需要先执行内部的方法，也就是要先执行最内部的方法，然后就是等内部的一层层方法按照嵌套层级的反向顺序执行完毕，才能执行最外层的方法。

所以当你执行这么一个方法（栈）时，就是要先执行“最后来的方法”，所以叫做先进后出。


JavaScript是单线程语言，主线程执行同步代码。 
函数调用时， 便会在内存中形成了一个“调用记录”， 又称“调用帧”， 保存调用位置和内部变量等信息。 如果函数内部还调用了其他函数，那么在调用记录上方又会形成一个调用记录， 所有的调用记录就形成一个“调用栈”。（闭包、尾调用、尾递归优化）
##### 堆heap
堆是指一块已分配的用来存储所需数据的存储空间（内存）。

对象的值被分配在一个堆中，并用一个地址记录该值存储的位置，
这个地址存储在命名对象的变量（内存，也可以说栈内存）中。
所以复制这个变量只是复制了引用地址，而不是复制了这个对象。
##### 队列queue（先进先出--FIFO，first in first out）
队列也可以看作是指一个按照顺序排列的消息事件集合。

区别就是队列像一个直线单向传送带，先传送到终点的物品，先进行处理。
### 内存空间
##### 基础数据类型与变量
基础数据类型6种，undefined null String Number Boolen Symbol
函数运行时，会创建一个执行环境，这个执行环境叫做执行上下文（Execution Context）在执行上下文中，会创建一个变量对象（VO），基础数据类型就保存在变量对象中。
##### 引用数据类型与堆内存空间
引用数据类型的值是存储在堆内存空间中的对象，在js中不允许访问堆内存中的数据，因此不能直接操作对象的堆内存空间。在操作时，实际上是操作对象的引用而不是实际对象。
##### 内存空间管理
JavaScript不用直接分配内存呢，有垃圾回收机制。

JavaScript 的垃圾回收实现主要依靠“引用”的概念 当一块内存空间中的数据能够被访问时，垃圾回收器就认为“该数据能够被获得”。不能够被获得的数据，就会被打上标记，并回收内存空间。这种方式叫作：标记-清除算法
### 执行上下文
##### 执行上下文三种情况
- 全局环境：代码开始运行首先会进入全局环境。
- 函数环境：当函数被调用执行时，会进入当前函数中的执行代码。
- eval环境：效率低下不建议使用。
##### 执行上下文的生命周期
两个阶段：
1. 创建阶段
- 生成变量对象
- 确定作用域链
- 确定this指向
2. 执行阶段
- 变量赋值
- 函数引用
- 执行其他代码

![执行上下文的生命周期](./img/1.png)

### 变量对象

变量对象包含内容：

1. 函数所有参数（Firefox为单独的参数对象arguments）
2. 当前上下文中所有的函数声明。（function定义的，能提升的函数）
3. 当前上下文中的所有变量声明。（通过var声明的变量）

##### 变量对象的创建过程 
1. 在chrome中首先获取函数参数变量及其值，在firefox中直接将arguments保存在变量对象中。
2. 依次获取上下文中所有函数声明，也就是function关键字单独声明的函数。在变量对象中以函数的名字建立一个属性，值为指向这个函数所在的内存地址引用。如果属性名称已经存在，那么该属性的值会被新的引用覆盖。
3. 依次获取上下文中所有变量声明，也就是var关键字声明的变量。每找到一个变量，就在变量对象中以变量名建立一个属性。属性值为undefined。如果该变量名的属性已经存在。为了防止同名函数被修改成undefined，则直接跳过，原来属性值不会被修改。（在es6中let变量也存在提升，只不过值不是undefined，而是什么也没有。所以在作用域开始到定义let之间存在暂时性死区。用到let变量会报错。）
活动对象：在函数调用中。如果执行上下文处于函数调用的栈顶，则意味着当前上下文处于活动状态。此时变量对象称之为活动对象（AO，Activation Object）
全局全局上下文变量对象：以浏览器为例，变量对象就是windoow对象。而且全局上下文的变量对象不能变成活动对象。全局上下文的变量对象的生命周期与程序的生命周期一致。
### 作用域与作用域链
#### 作用域

分两种：1.全局作用域。2.函数作用域。

##### 全局作用域

以下三种情形会拥有全局作用域。
1. 全局对象下拥有的属性与方法。
2. 最外层声明的变量和方法。
3. 在非严格模式下，未定义的而直接赋值的变量

##### 函数作用域
函数作用域定义的变量和方法，只能被下层子作用域访问。
##### 块级作用域
#### 作用域链（Scope chain）
作用域链，是由当前执行环境和上层执行环境的一系列变量对象组成的，他保证了当前执行环境对符合访问权限的变量和函数的有序访问。
### 闭包
### this