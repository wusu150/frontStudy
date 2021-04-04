function matchExpression(reg) {
  var dataCache = [];
  if (typeof reg !== 'string') {
    throw new Error('非String类型');
  }
  var allArray = reg.split('');
  // 1.判断表达式是否合法
  var left = reg.split('(');
  var right = reg.split(')');
  if (left.length !== right.length) {
    throw new Error('无效的表达式');
  }
  // 2.简单表达式直接返回
  if (!reg.includes('(')) {
    return reg;
  }
  var start = 0;
  var end = -1;
  var dataArray = [];
  // 3.循环字符串
  allArray.forEach(function (a, index) {
    if (a === '(') {
      if (index === 0 || start === -1) {
        start = index;
      }
      dataCache.push('left');
    } else if (a === ')') {
      dataCache.push('right');
      if ((dataCache.filter(function(d) { return d === 'left'; }).length) === (dataCache.filter(function(d){ return d === 'right'; }).length)){
        end = index;
        var data = reg.substring(start + 1 , end);
        var preData = dataArray[dataArray.length - 1];
        var opt = preData ? reg.substring((preData.end) + 1, start) : '';
        if (data.includes('(')) {
          dataArray.push({
            start: start,
            end: index,
            str: data,
            preOpt: opt,
            children: matchExpression(data)
          });
        } else {
          dataArray.push({
            start: start,
            end: index,
            str: '('+data+')',
            preOpt: opt,
            match: data.match(/(\w+)([>|<|=])(\w+)/)
          });
        }
        start = -1;
      }
    }
  });
  return dataArray;
}
