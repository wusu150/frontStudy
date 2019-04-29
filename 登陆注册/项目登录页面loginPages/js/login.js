/**
 * Created by jkwu on 17-12-19.
 */
var url = 'http://localhost:3010';
var rolocalStorage = localStorage;
var rosessionStorage = localStorage;
// const $ = require('jquery');

/**
 * 拼接上配置的基础路径，最终计算出一个可以直接访问的URL地址，
 * 是整个rest异步访问非常重要的一项基础功能
 * @param url
 * @returns {string}
 */
function getRequestURL(url) {
  return "http://localhost:3010" + url;
}

/**
 * 把URL参数中序列化对象转为JSON对象
 * 如:a=1&b=2&b=3&c=4 转为 {a:1,b:[2,3],c:4}
 * @param str
 */
function unserializeURLParam(strPara) {
  var regResult;
  const ret = {};
  const regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g;
  while ((regResult = regPara.exec(strPara)) != null) {
    const k = regResult[1], v = regResult[2];
    if (!ret[k]) {
      ret[k] = v;
    } else if (Object.prototype.toString.call(ret[k]) === '[object Array]') {
      ret[k].push(v); //如果是数组，则直接把参值放进去
    } else {
      ret[k] = [ret[k]];  //如果之前的值，则转换成数组，把值放进去
      ret[k].push(v);
    }
  }
  return ret;
};

/**
 * 把URL中的URL地址和参数部分分解出来
 * http://www.amasoft.com/abc?a=1&b=2&b=3&c=4 {url:'http://www.amasoft.com/abc',param:{a:1,b[2,3],c:4}}
 * @param url
 * @returns {{url: string, param: {}}}
 */
function parseURL (url) {
  const ret = {url: url, param: {}};

  const regUrl = /^([^\?]+)\?([\w\W]+)$/;
  const arrUrl = regUrl.exec(url);

  if (arrUrl && arrUrl[2]) {
    ret.url = arrUrl[1];
    ret.param = unserializeURLParam(arrUrl[2]);
  } else {
    return ret;
  }

  return ret;
};

function restAjax(url, type, data) {
  // 网络请求
  const urlObject = parseURL(url);
  const reqURL = getRequestURL(urlObject.url);
  var paramObject = {};
  if (data) {
    if (typeof data !== 'object') {
      paramObject = unserializeURLParam(data);    //如果传的参数是字串，则对字串进行解析处理
    } else {
      paramObject = data;
    }
  }
  var reqData = urlObject.param || {};    //默认URL中参数填充，如果参数列表中有更新的，则使用更新的
  $.extend(reqData, paramObject);
  // console.log('url-param:',reqData,$.param(reqData));
  if (type.toLowerCase() === 'get' || type.toLowerCase() === 'delete') {
    reqData = $.param(reqData, true);
  }

  return new Promise(function (resolve, reject) {
      $.ajax({
        url: reqURL,
        data: reqData,
        cache: false,
        type: type,
        error: function(xhr, status, err) {
          reject(err);
        },
        success: function(result){
          resolve(result);
        },
      });
    });
  };


$(function() {
  var $loginContainer = $('#login-container');

  //登录
  $loginContainer.find('.loginBtn').on('click', function() {
    var username = $loginContainer.find('[name="username"]').val();
    var password = $loginContainer.find('[name="password"]').val();
    console.log(username + password);
    restAjax('/login', 'post', {
      username: username,
      password: password
    }).then(function(res) {
      rolocalStorage.setItem('username', username);
      rolocalStorage.setItem('password', password);
      rosessionStorage.setItem('username', username);
      rosessionStorage.setItem('password', password);
      console.log(res);
    }).then(function () {
      console.log('rolocalStorage:' + JSON.stringify(rolocalStorage));
      console.log('rosessionStorage:' + JSON.stringify(rosessionStorage));
    });
    // 通过ajax提交请求
    // $.ajax({
    //   type: 'post',
    //   url: url + '/login',
    //   data: {
    //     username: username,
    //     password: password
    //   },
    //   dataType: 'json',
    //   success: function(result) {
    //
    //     $loginContainer.find('.colWarning').html(result.message);
    //
    //     if (!result.code) {
    //       //登录成功
    //       window.location.reload();
    //     }
    //   }
    // })
  })
});