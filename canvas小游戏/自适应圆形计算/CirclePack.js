window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded () {
  canvasApp(); // 包含整个Canvas应用程序
}
function canvasSupport(e) {
  return !!e.getContext;
}
function canvasApp() {
  let canvas = document.getElementById('canvas');
  let currentTooltipId = null;
  Point = function (x, y) {
    this.x = x;
    this.y = y;
  };

  const colors = ['#faf', '#eef', '#ff0', '#f0f', '#aaf', '#0f0', '#ccc', '#999', '#eee', '#ccc', '#606'];
  if (!canvasSupport(canvas)) {
    return;
  }
  let ctx = canvas.getContext('2d');
  canvas.width = (window.innerWidth - 100) * 2;
  canvas.height = (window.innerWidth - 100) * 2;
  canvas.style.width = window.innerWidth - 100;
  canvas.style.height = window.innerWidth - 100;


  function drawScreen() {
    ctx.lineWidth = 0.5;
    // ctx.strokeStyle = '#b3c3de';
    ctx.font = '24px Arial';
  }

  function windowToCanvas(curCanvas, x, y) {
    var bbox = curCanvas.getBoundingClientRect();
    return {
      x: (x - bbox.left) * (curCanvas.width / bbox.width),
      y: (y - bbox.top) * (curCanvas.height / bbox.height),
    };
  }

  function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function removeTooltip() {
    console.log('移除');
    if (currentTooltipId) {
      const curTooltip = document.getElementById(currentTooltipId);
      curTooltip && curTooltip.parentNode.removeChild(curTooltip);
    }
  }

  function setTooltipStyle(tooltip, item) {
    // tooltip.setAttribute('class', 'circle-pack-tooltip');
    const tooltipElement = `${item.name}: ${item.value}`;
    tooltip.className = 'circle-pack-tooltip';
    tooltip.innerHTML = tooltipElement;
    tooltip.style.left = item.x / 2 + 20 + 'px';
    tooltip.style.top = item.y / 2 + 'px';
    return tooltip;
  }

  function showTooltip(item, e) {
    removeTooltip(); // 每次展示之前都进行移除操作
    let tooltip = document.createElement('div');
    currentTooltipId = 'tooltip' + Math.random() * 1000;
    tooltip.id = currentTooltipId;
    tooltip = setTooltipStyle(tooltip, item);
    canvas.parentNode.appendChild(tooltip);
  }

  function findPoint(point, dataArray = []) {
    const inCircleArray = dataArray
      .filter(((item) => {
        const itemR = item.r * canvas.height;
        const distance = Math.sqrt(Math.pow(canvas.width * item.x - point.x, 2) + Math.pow(canvas.height * item.y - point.y, 2));
        return itemR > distance;
      }));
    inCircleArray.length && console.log(inCircleArray);
    return inCircleArray[inCircleArray.length - 1];
  }

  function addListener(dataArray) {
    canvas.onmousemove = function (e) {
      var loc = windowToCanvas(canvas, e.clientX, e.clientY);

      let item1 = {
        name: '这是一个需要展示的div',
        x: e.clientX,
        y: e.clientY
      };
      let item = {
        name: '这是一个需要展示的div',
        x: loc.x,
        y: loc.y,
      };
      const { name, value } = findPoint(item, dataArray) || {};
      item = {
        x: loc.x,
        y: loc.y,
        name,
        value,
      };
      // showTooltip(item1, e);
      showTooltip(item, e);
    };
    canvas.onmouseout = function (e) {
      // var loc = windowToCanvas(canvas, e.clientX, e.clientY);
      removeTooltip();
    }
  }


  function drawText(point) {
    const name = point.name;
    if (!point.hasChildren) {
      ctx.font="30px 宋体";
      // ctx.fontFamily="宋体";
      // ctx.fontFamily="serif";
      ctx.fillStyle= '#555';
      // ctx.fontWeight= '100';
      // this.canvasContext.fontSize="8px";
      // this.canvasContext.fontFamily="宋体";
      // this.canvasContext.fillStyle= '#545454';
      // this.canvasContext.fontWeight= 'normal';
      const nameWidth = ctx.measureText(name).width;
      const position = {
        x: (canvas.width) * point.x - nameWidth/2,
        // x: (canvas.width) * 0.5 * (point.x - point.r * 0.5),
        y: (canvas.width) * point.y,
      };
      ctx.fillText(name, position.x, position.y);
      ctx.save();
    }
  }

  function getColor(point) {
    const name = point.name;
    if ('一部门' === name) {
      return '#B5B5B6';
    } else if ('二部门' === name) {
      return '#3E3A39';
    } else if ('三部门' === name) {
      return '#EA0011';
    } else if ('四部门' === name) {
      return '#D5B45C';
    } else {
      return '#ffffff'
    }
  }

  function drawCircle(point) {
    let color = point.color;
    color = getColor(point);
    // 开始画图
    ctx.beginPath();
    if (point.depth === 1) {
      ctx.arc((canvas.width) * point.x,(canvas.height)  * point.y, point.r  * canvas.width, 0, 2 * Math.PI, true);
      // ctx.arc((canvas.width) / 2,(canvas.height) / 2, 50, 0, 2 * Math.PI, true);
      ctx.font="12px";
      ctx.lineWidth = 0.2;
      ctx.fillStyle= color;
      ctx.fill();
      ctx.stroke();
      ctx.save();
    } else if (point.depth === 2) {
      ctx.arc((canvas.width) * point.x,(canvas.height)  * point.y, point.r  * canvas.width, 0, 2 * Math.PI, true);
      // ctx.arc((canvas.width) / 2,(canvas.height) / 2, 50, 0, 2 * Math.PI, true);
      ctx.font="12px";
      ctx.lineWidth = 0.2;
      ctx.fillStyle= 'rgba(255,255,255,0.5)';
      ctx.fill();
      ctx.stroke();
      ctx.save();
    }
  }

  function sortData(data) {
    if (data && Array.isArray(data) && typeof data === 'object') {
      return data.sort((a,b) => a.depth - b.depth >= 0).sort((a,b) => a.r - b.r <= 0);
    }
    return [];
  }




  // const items = [
  //   { x: 1, y: 1, r: 1, name: '1', color: '#c0f' },
  //   { x: 0.23, y: 0.4, r: 0.5 },
  //   { x: 0.23, y: 0.4, r: 0.5, name: '1', color: '#c0c' },
  //   { x: 1, y: 1, r: 0.2, name: '1', color: '#c26' },
  //   { x: 0.7, y: 0.6, r: 0.2, name: '1', color: '#ee2' },
  //   { x: 1.8, y: 1, r: 0.6, name: '1', color: '#c4f' },
  //   { x: 1, y: 1, r: 0.9, name: '1', color: '#c8f' },
  //   { x: 1, y: 1, r: 0.5, name: '1', color: '#cef' },
  //   { x: 1, y: 1, r: 0.3, name: '1', color: '#aaf' },
  // ].sort((a,b) => a.r - b.r <= 0);


  const items = [
    //       { name: '大院',
    // x: 1,
    // y: 1,
    // r: 1, color: '#aaf' },
    {"hasChildren":true,"name":"flare","value":10000,"depth":0,"x":0.5,"y":0.5,"r":0.5},
    {"hasChildren":true,"name":"二部","value":2000,"depth":1,"x":0.23972703881147284,"y":0.5,"r":0.23972703881147275},
    {"hasChildren":true,"name":"一部","value":1000,"depth":1,"x":0.6476156253739862,"y":0.5,"r":0.1681615477510407},
    {"hasChildren":true,"name":"三部","value":1000,"depth":1,"x":0.5109997934474375,"y":0.8200157305903104,"r":0.17979527910860457},
    {"hasChildren":true,"name":"四部","value":1000,"depth":1,"x":0.5109997934474375,"y":0.1799842694096896,"r":0.17979527910860457},
    {"hasChildren":false,"name":"6组","value":1800,"depth":2,"x":0.17979527910860466,"y":0.5,"r":0.17979527910860457},
    {"hasChildren":false,"name":"5组","value":200,"depth":2,"x":0.41952231792007744,"y":0.5,"r":0.05993175970286819},
    {"hasChildren":false,"name":"3组","value":500,"depth":2,"x":0.5742145100444253,"y":0.5,"r":0.09476043242147979},
    {"hasChildren":false,"name":"4组","value":300,"depth":2,"x":0.742376057795466,"y":0.5,"r":0.07340111532956092},
    {"hasChildren":false,"name":"1组","value":100,"depth":2,"x":0.674357673742068,"y":0.5936927882308636,"r":0.04237815369434076},
    {"hasChildren":false,"name":"2组","value":100,"depth":2,"x":0.674357673742068,"y":0.40630721176913637,"r":0.04237815369434076},
    {"hasChildren":false,"name":"10组","value":800,"depth":2,"x":0.45106803374456933,"y":0.8200157305903104,"r":0.11986351940573638},
    {"hasChildren":false,"name":"9组","value":200,"depth":2,"x":0.6308633128531739,"y":0.8200157305903104,"r":0.05993175970286819},
    {"hasChildren":false,"name":"14组","value":800,"depth":2,"x":0.45106803374456933,"y":0.1799842694096896,"r":0.11986351940573638},
    {"hasChildren":false,"name":"13组","value":200,"depth":2,"x":0.6308633128531739,"y":0.1799842694096896,"r":0.05993175970286819}
  ];

  const data1 = [
    {"hasChildren":true,"name":"test1","value":20,"depth":0,"x":0.5,"y":0.5,"r":0.5},
    {"hasChildren":false,"name":"test4","value":10,"depth":1,"x":0.30263177306438005,"y":0.41017972112445467,"r":0.28315466456252486},
    {"hasChildren":false,"name":"test3","value":5,"depth":1,"x":0.7860070210636685,"y":0.41017972112445467,"r":0.20022058343676352},
    {"hasChildren":false,"name":"test2","value":5,"depth":1,"x":0.6201388588121458,"y":0.7746531507161527,"r":0.20022058343676352}
    ];

  const data2 = [
    {"hasChildren":true,"name":"flare","value":340,"depth":0,"x":0.5,"y":0.5,"r":0.5},
    {"hasChildren":true,"name":"一部门","value":115,"depth":1,"x":0.2898511263387511,"y":0.5,"r":0.2008064091689125},
    {"hasChildren":true,"name":"二部门","value":75,"depth":1,"x":0.6717627107862454,"y":0.5,"r":0.18110517527858183},
    {"hasChildren":true,"name":"三部门","value":75,"depth":1,"x":0.5,"y":0.8188948247214182,"r":0.18110517527858183},
    {"hasChildren":true,"name":"四部门","value":75,"depth":1,"x":0.5,"y":0.18110517527858183,"r":0.18110517527858183},
    ];

  const resultData = sortData(data2);
  // const resultData = sortData(items);
  // const resultData = sortData(data1);

  resultData.forEach((item, index) => {
    drawCircle({ ...item, color: colors[index]});
    drawText(item);
  });
  // resultData.forEach(item => drawText(item));
  addListener(resultData);
  // ctx.scale(1/2,1/2);
}
