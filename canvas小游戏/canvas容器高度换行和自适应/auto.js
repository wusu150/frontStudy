



window.addEventListener('load', eventWindowLoaded, false);


///////实现自适应高度条件
function measureTextWidth(ctx, content, contentSize) {
  ctx.font = `${contentSize}px sans-serif`
  return ctx.measureText(content).width;
};

function drawText (ctx, content, x, y, otherProps) {
const { contentSize = 16 } = otherProps || {};
  ctx.beginPath();
  ctx.font = `${contentSize}px sans-serif`
  ctx.fillText(content, x, y);
  ctx.closePath();
}
function fillContainerAutoRect(ctx, x, y, width, height, otherProps) {
  const { paddingLeft = 10, paddingTop = 10, contents = [] } = otherProps || {};
  const contentX = x + paddingLeft;
  const contentY = y + paddingTop;
  
  let contentSize = 14;
  ctx.beginPath();
  let resultHeight = 0;
let tempContents = [];
  contents.forEach((content, index) => {
    let baseHeight = 20;
    let baseIndex = Math.ceil(measureTextWidth(ctx, content, 16) / (width * contentSize));
    resultHeight = baseHeight * baseIndex + 20 ;
    
    let temp = "";
    for (var a = 0; a < content.length; a++) {

      if (measureTextWidth(ctx, temp, contentSize) < (width - 5) && measureTextWidth(ctx, temp + (content[a]), contentSize) <= width - 5) {
        temp += content[a];
      } //context.measureText(text).width  测量文本text的宽度
      else {
        tempContents.push(temp);
        temp = content[a];
      }
    }
    tempContents.push(temp);
  });
  for (var b = 0; b < tempContents.length; b++) {
      ctx.fillText(tempContents[b], x, y + (b + 1) * 24); //字体20，间隔24。类似行高
  }
  ctx.closePath();
}


function eventWindowLoaded () {
  canvasApp(); // 包含整个Canvas应用程序
}
function canvasSupport(e) { return !!e.getContext; }
function canvasApp() {
  let canvas = document.getElementById('canvas');
  const ratio = 3;

  const colors = ['#faf', '#f0f', '#aaf', '#0f0', '#606'];
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

    ctx.moveTo(2 + Point.startX,30 + Point.startY,);
    ctx.lineTo(40 + Point.startX,30 + Point.startY,);
    ctx.lineTo(40 + Point.startX,25 + Point.startY,);
    ctx.lineTo(60 + Point.startX,32.5 + Point.startY,);
    ctx.lineTo(40 + Point.startX,40 + Point.startY,);
    ctx.lineTo(40 + Point.startX,35 + Point.startY,);
    ctx.lineTo(2 + Point.startX,35 + Point.startY,);
    //ctx.lineTo(20,300)  //这一段可以省略。closePath会自动连接
    ctx.closePath();

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


  const dataSource = [];
  for (let i = 0; i < 1; i ++) {
    const Point = {
      startX: Math.random() * 10,
      startY: Math.random() * 700,
      endX: 1200,
      endY: 500,
      value: Math.random() * 700
    };
    dataSource.push(Point);
  }



  drawArrow({
    startX: 140,
    startY: 500,
    endX: 1200,
    endY: 500,
    value: Math.random() * 700
  }, '#ccc');




fillContainerAutoRect(ctx, 10, 10, 380, 100, {
  title: '增信措施',
  contents: [
    '我是一个中国人,正在尝试canvas的使用,希望能够通过自己的方式进行实现canvas的自动换行,hahahahahha哈哈哈哈哈点点滴滴胆大妄为',
    '我是这段文字的第二行端午端午端午端午,没希望能够尽兴同样的方式进行换行'
  ]
});
  console.log(measureTextWidth(ctx, 'ww惹惹我惹我', 14).width);
  console.log(measureTextWidth(ctx, 'ww惹惹我惹我', 18).width);
}




