/*
 * @Descripttion:
 * @version:
 * @Author: wang zhiguo
 * @Date: 2020-05-03 21:42:27
 * @LastEditors: wang zhiguo
 * @LastEditTime: 2020-05-10 21:42:13
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
 */

module.exports = (function () {
  return function MyPromise(executor) {
    // pending、fulfilled、rejected
    var value;
    var state = "pending";

    var onQueue = [];
    var inTaskOrNot;

    function change(s, v) {
      if (state === "pending") {
        value = v;
        state = s;
        insertTask();
      }
    }

    function run() {
      if (state === "rejected" && onQueue.length === 0) {
        console.error(
          "在MyPromise里，需要注册一个处理异常情况的回调函数！！！"
        );
      }
      while (onQueue.length) {
        let onObj = onQueue.shift();
        if (onObj[state].on) {
          try {
            let returnvalue = onObj[state].on(value);
            if (returnvalue instanceof MyPromise) {
              returnvalue.then(onObj["fulfilled"].next, onObj["rejected"].next);
            } else {
              onObj["fulfilled"].next(returnvalue);
            }
          } catch (error) {
            onObj["rejected"].next(error);
          }
        } else {
          onObj[state].next(value);
        }
      }
    }

    function insertTask(params) {
      if (state === "pending") {
        return;
      }
      clearTimeout(inTaskOrNot);
      inTaskOrNot = setTimeout(run, 0);
    }

    function register(onFulfilled, onRejected) {
      var nextPromise = new MyPromise(function (resolve, reject) {
        onQueue.push({
          fulfilled: { on: onFulfilled, next: resolve },
          rejected: { on: onRejected, next: reject },
        });
      });

      insertTask();
      return nextPromise;
    }

    var resolve = change.bind(this, "fulfilled");

    var reject = change.bind(this, "rejected");

    this.then = register.bind(this);

    this.catch = register.bind(this, undefined);

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  };
})();
