var fs = require('fs');
var crypto = require('crypto');

// var path = './FLSMae665d32d.ipa';
var path = './FL.ipa';
var start = new Date().getTime();
var md5sum = crypto.createHash('md5');
var stream = fs.createReadStream(path);
stream.on('data', function(chunk) {
  md5sum.update(chunk);
});
stream.on('end', function() {
  str = md5sum.digest('hex');
  console.log('文件:'+path+',MD5签名为:'+str+'.耗时:'+(new Date().getTime()-start)/1000.00+"秒");
});



