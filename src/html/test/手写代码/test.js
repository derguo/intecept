/*
 * @Descripttion: 
 * @version: 
 * @Author: wang zhiguo
 * @Date: 2020-05-04 12:05:29
 * @LastEditors: wang zhiguo
 * @LastEditTime: 2020-05-10 21:27:53
 */
let MyPromise = require('./promise')
// let p = new MyPromise(function (resolve, reject) {
//     // resolve("ok0")
//     setTimeout(() => {
//         resolve("ok0")
//     }, 3000);
// }).then((value) => {
//     console.log(value)
//     return "ok1"
// }).then(value => {
//     console.log(value)
//     return "ok2"
// })

// p.then(value => {
//     console.log(value)
// })

// p.then(value => {
//     console.log(value)
//     return new MyPromise(function (resolve, reject) {
//         reject("ok3")
//         // setTimeout(() => {
//         //     reject("ok3")
//         // }, 3000);
//     })
// }).then(value => {
//     console.log(value)
// })

let p1 = new MyPromise((resolve, reject) => {
    resolve('p1:hahaha')
    // reject('yingyingying')
})

let p2 = new MyPromise((resolve, reject) => {
    resolve('p2:hahaha')
    // reject('yingyingying')
})

p1.then(value => {
    console.log(1, value)
})
p2.then(value => {
    console.log(2, value)
})
p1.then(value => {
    console.log(1, value)
})




// let pr = new MyPromise((resolve, reject) => {
//     resolve('yingying')
// })



// let p = new Promise((resolve, reject) => {
//     resolve("ok")  
// })

// p.then(value => {
//     console.log(value)
//     bbb
// },err => {
//     console.log('then err',err)
// }).catch(err => {
//     console.log('err',err)
// })