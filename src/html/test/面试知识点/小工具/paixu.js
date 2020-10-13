/*
 * @Descripttion: 
 * @version: 
 * @Author: wang zhiguo
 * @Date: 2020-09-14 20:56:38
 * @LastEditors: wang zhiguo
 * @LastEditTime: 2020-09-14 20:59:36
 */
function compare(arr) {
    var resultArray = arr.sort((x, y) => {
        // let reg = /^[^\u4E00-\u9FA5A-Za-z]/
        let wreg = /^[\u4E00-\u9FA5A-Za-z]/;
        let zwreg = /^[\u4E00-\u9FA5]/;
        let ywreg = /^[A-Za-z]/;
      
        // console.log(x,reg.test(x), y,reg.test(y),  reg.test(x) && reg.test(y))
        if (wreg.test(x) && wreg.test(y)) {
          if ((zwreg.test(x) && zwreg.test(y)) || (ywreg.test(x) && ywreg.test(y))) {
            return x.localeCompare(y);
          } else {
            let one = zwreg.test(x) ? ConvertPinyin(x) : x;
            let tow = zwreg.test(y) ? ConvertPinyin(y) : y;
            return one.localeCompare(tow);
          }
        } else {
          return x.localeCompare(y);
        }
      });
      return resultArray
}
