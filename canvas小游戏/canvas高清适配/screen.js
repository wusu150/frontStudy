window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded () { canvasApp(); } // 包含整个Canvas应用程序
function canvasSupport(e) { return !!e.getContext; }
function canvasApp() {
  let canvas1 = document.getElementById('canvas1');
  let canvas2 = document.getElementById('canvas2');
  let ctx1 = canvas1.getContext('2d');
  let ctx2 = canvas2.getContext('2d');
  var getPixelRatio = function (context) {
    var backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;
    console.log('backingStore', backingStore);
    return (window.devicePixelRatio || 1) / backingStore;
  };
  var ratio1 = getPixelRatio(ctx1);
  var ratio2 = getPixelRatio(ctx2);
  console.log('backingStorePixelRatio', ctx2.backingStorePixelRatio);
  console.log('webkitBackingStorePixelRatio', ctx2.webkitBackingStorePixelRatio);
  console.log('mozBackingStorePixelRatio', ctx2.mozBackingStorePixelRatio);
  console.log('msBackingStorePixelRatio', ctx2.msBackingStorePixelRatio);
  console.log('oBackingStorePixelRatio', ctx2.oBackingStorePixelRatio);
  console.log('backingStorePixelRatio', ctx2.backingStorePixelRatio);
  console.log('devicePixelRatio', window.devicePixelRatio);
  console.log('ratio2', ratio2);



  // 设置高清像素
  canvas2.width = 500 * ratio2;
  canvas2.height = 250 * ratio2;
  canvas2.style.width = 500 + 'px';
  canvas2.style.height = 250 + 'px';


  function drawText1(point) {
    // 设置普通像素
    canvas1.width = 500;
    canvas1.height = 250;
    canvas1.style.width = 500 + 'px';
    canvas1.style.height = 250 + 'px';
    ctx1.transform(ratio1,0,0,ratio1,0,0);
    ctx1.font="15px 宋体";
    ctx1.fillStyle= '#555';

    ctx1.fillText('像素清晰度对比', 125, 125);
    ctx1.save();



  }
  function drawText2(point) {
    ctx2.font="30px 宋体";
    ctx2.fillStyle= '#555';
    ctx2.fillText('像素清晰度对比', 250, 250);
    ctx2.save();
  }
  drawText1();
  drawText2();
}
