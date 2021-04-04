/*
 * @Description: 
 * @Author: jkwu
 * @Date: 2020-08-25 21:37:35
 * @LastEditors: jkwu
 * @LastEditTime: 2020-08-25 22:18:56
 */
const fs = require('fs');
const path = require('path');
const mineType = require('mime-types');  // 文件类型

// let filePath = path.resolve('./移动端.pdf');  // 如果是本地文件
let filePath = path.resolve('./shark.png');  // 如果是本地文件
let data = fs.readFileSync(filePath);
// let bufferData = new Buffer(data,'base64'); 
let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data.toString('base64'); 
console.log(base64);
console.log(filePath);
fs.writeFileSync(path.resolve('./base64File'), base64, err => {
  console.log('end');
})
// fs.writeFile('your/save/file/path', base64, err => {...});