/*
 * @Description: 
 * @Author: jkwu
 * @Date: 2020-08-20 23:01:11
 * @LastEditors: jkwu
 * @LastEditTime: 2020-08-21 09:17:29
 */
var Bagpipe = require('bagpipe');
var fs = require('fs');
var path = require('path');
// 设定最大并发数为10
var bagpipe = new Bagpipe(10);


// const promiseList = new Array(5000).fill(1).map((item, index) => {
// 	return new Promise((resolve, jecect) => {
// 		setTimeout(() => resolve(`${index}-${item}`), Math.random() * 1000);
// 	});
// });

// for (let i = 0; i < promiseList.length; i++) {
//   bagpipe.push(promiseList[i],  (data) => {
//     // 异步回调执行
//     console.log(i,data)
//   });
// }

// bagpipe.on('full', function (length) {
//   console.warn('底层系统处理不能及时完成，排队中，目前队列长度为:' + length);
// });

fs.readdir(path.resolve('../../'), (erro, data) => {
  // console.log(data)
  // var files = data.map(item => fs.stat(item, (erro, stat) => {
  //   return stat.isFile() ? item : ''
  // }));
let files = data.filter(file => {
  return fs.statSync(path.resolve('../../', file)).isFile()
  }
  );

  const dirs = data.filter(file => {
  return fs.statSync(path.resolve('../../', file)).isDirectory()
  }
  );

dirs.map(dir => {
  fs.readdir(path.resolve('../../', dir), (erro, data) => {
    files = files.concat(data);
  })
})

for (var i = 0; i < files.length; i++) {



  // fs.readFile(files[i], 'utf-8',  (err, data) => {
  //   console.log(data);
  // })
  bagpipe.push(fs.readFile, files[i], 'utf-8', function (err, data) {
    // 不会因为文件描述符过多出错
    // 妥妥的
    console.log(1)
  });
}
})
