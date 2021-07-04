/*
 * @Description: 
 * @Author: jkwu
 * @Email: suwu150@163.com
 * @Date: 2020-07-29 19:49:12
 * @LastEditors: jkwu
 * @LastEditorsEmail: suwu150@163.com
 * @LastEditTime: 2020-07-29 20:02:38
 */ 

// 用 Promise 实现一个函数，每 5s 判断一个随机数是否大于 3，大于则打印一句日志 continue，小于则结束流程，若随机数一直大于 3，程序在 60s 后也结束，并打印 done

const status = () => { 
  return new Promise((resolve, reject) => {
    let count = 1;
    const currentInterval = setInterval(() => {
      const numberRandom = Math.random() * 10;
      console.log(numberRandom, count);
      if (numberRandom >= 3) {
         count++;
         if (count === 12) {
           clearInterval(currentInterval);
           resolve();
         }
         console.log('continue');
      } else {
        clearInterval(currentInterval);
        reject({ error: 'end' });
      }
    }, 5000)
  }).catch(error => console.log(error));
}

status();