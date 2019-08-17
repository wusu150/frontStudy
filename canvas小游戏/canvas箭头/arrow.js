



window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded () {
  canvasApp(); // 包含整个Canvas应用程序
}
function canvasSupport(e) { return !!e.getContext; }
function canvasApp() {
  let canvas = document.getElementById('canvas');
  const ratio = 3;

  const colors = ['#faf', '#eef', '#ff0', '#f0f', '#aaf', '#0f0', '#ccc', '#999', '#eee', '#ccc', '#606'];
  if (!canvasSupport(canvas)) {
    return;
  }
  let ctx = canvas.getContext('2d');
  canvas.width = 1400;
  canvas.height = 800;
  canvas.style.width = 1400 + 'px';
  canvas.style.height = 800 + 'px';

  function getColor() {
    const colorIndex = Number.parseInt(Math.random() * (colors.length - 1));
    return colors[colorIndex];
  }

  function drawArrow(item) {
    const Point = {
      startX: item.startX,
      startY: item.startY,
      endX: item.endX,
      endY: item.endY,
      value: item.value,
    };
    const color = getColor();
    //状态设置
    ctx.beginPath();
    // ctx.transform(0.5,0.5,0.5,0,30,10);
    // ctx.transform(0, 0, 0, 0, Math.random() * 10, Math.random() * 10);
    //
    const startPoint = {
      x: 60 + Point.startX,
      y: 32.5 + Point.startY,
    };
    const endPoint = {
      x: 1200,
      y: 400,
    };

    const r = Math.sqrt(Math.pow((startPoint.x - endPoint.x), 2) + Math.pow(startPoint.y - endPoint.y, 2));
    const xDistance = startPoint.x - endPoint.x;
    const yDistance = startPoint.y - endPoint.y;
    const angle = Math.sin(yDistance / r);
    ctx.rotate(-angle);
    ctx.moveTo(2 + Point.startX,30 + Point.startY,);
    ctx.lineTo(40 + Point.startX,30 + Point.startY,);
    ctx.lineTo(40 + Point.startX,25 + Point.startY,);
    ctx.lineTo(60 + Point.startX,32.5 + Point.startY,);
    ctx.lineTo(40 + Point.startX,40 + Point.startY,);
    ctx.lineTo(40 + Point.startX,35 + Point.startY,);
    ctx.lineTo(2 + Point.startX,35 + Point.startY,);
    //ctx.lineTo(20,300)  //这一段可以省略。closePath会自动连接
    ctx.closePath();
    ctx.rotate(angle);
    console.log(color);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke(); //执行绘制
    ctx.save();
  }

  function moveArrow() {
   //状态设置
    ctx.beginPath();
    const moveX = 200;
    const moveY = 600;

    ctx.moveTo(60 + moveX,300 + moveY);
    ctx.lineTo(440 + moveX,300 + moveY)
    ctx.lineTo(440 + moveX,200 + moveY)
    ctx.lineTo(740 + moveX,350 + moveY)
    ctx.lineTo(440 + moveX,500 + moveY)
    ctx.lineTo(440 + moveX,400 + moveY)

    ctx.lineTo(60,400)
//ctx.lineTo(20,300)  //这一段可以省略。closePath会自动连接
    ctx.closePath();
    ctx.lineWidth = 5
    ctx.strokeStyle = '#ddd'
    ctx.stroke() //执行绘制
  }

  function windowToCanvas(curCanvas, x, y) {
    var bbox = curCanvas.getBoundingClientRect();
    return {
      x: (x - bbox.left) * (curCanvas.width / bbox.width),
      y: (y - bbox.top) * (curCanvas.height / bbox.height),
    };
  }

  function drawCircle() {
    // 开始画图
    const colorIndex = Math.random() * colors.length;
    const Point = {
      x: 1200,
      y: 400,
    };
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle= colors[colorIndex];
    ctx.arc(Point.x,Point.y, 30, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.arc(Point.x,Point.y, 120, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();
    ctx.save();
  }
  const dataSource = [];
  for (let i = 0; i < 100; i ++) {
    const Point = {
      startX: Math.random() * 10,
      startY: Math.random() * 700,
      endX: 1200,
      endY: 500,
      value: Math.random() * 700
    };
    dataSource.push(Point);
  }

  drawCircle();
  console.log(dataSource);
  dataSource.forEach((item, index) => {
    drawArrow(item);
  });
  // drawArrow({
  //   startX: 140,
  //   startY: 500,
  //   endX: 1200,
  //   endY: 500,
  //   value: Math.random() * 700
  // }, '#ccc');

  function moveArrow() {
    //状态设置
    ctx.beginPath();
    const moveX = 200;
    const moveY = 600;

    ctx.moveTo(60 + moveX,300 + moveY);
    ctx.lineTo(440 + moveX,300 + moveY)
    ctx.lineTo(440 + moveX,200 + moveY)
    ctx.lineTo(740 + moveX,350 + moveY)
    ctx.lineTo(440 + moveX,500 + moveY)
    ctx.lineTo(440 + moveX,400 + moveY)

    ctx.lineTo(60,400)
//ctx.lineTo(20,300)  //这一段可以省略。closePath会自动连接
    ctx.closePath();
    ctx.lineWidth = 5
    ctx.strokeStyle = '#ddd'
    ctx.stroke() //执行绘制
  }

  let i = 0;
  function moveArrows(q,b,c,f) {
    console.log(q,b,c,f);
    dataSource.map((item, index) => {
      const Point = {
        startX: item.startX + i,
        startY: item.startY + i,
        endX: 1200,
        endY: 500,
        value: Math.random() * 700
      };
      drawArrow(Point);
    });
    i+=1;
    requestAnimationFrame(moveArrows);
  }

  requestAnimationFrame(moveArrows);
}

