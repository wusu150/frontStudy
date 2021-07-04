function CircleClock(canvas) {
  // 定义一个CircleClock构造函数，用于初始化 
  this.canvas = document.querySelector(canvas);
  this.context = this.canvas.getContext("2d");
  this.width = 800;
  this.height = 700;
  this.progress = 0;  // 用于记录当前的进度
  this.seconds = 0; // 需要倒计时的时间，秒
  this.currentSeconds = 0; // 当前倒计时到的位置
}

CircleClock.prototype.setProgress = function (progress) {
    // 用于设置从外部设置进度
  this.progress = progress;
};

CircleClock.prototype.getProgress = function () {
    // 用于获取进度
  return this.progress;
};

CircleClock.prototype.drawBackgroundCircle  = function () {
    // 画圆形的背景环形条
  const x = this.width / 2;
  const y = this.height / 2;
  this.context.strokeStyle = "#40C4FF";
  this.context.lineWidth = 16;
  this.context.beginPath();
  // 绘制圆形背景。从弧度-(Math.PI / 2)到2 * Math.PI
  this.context.arc(x, y, this.width / 5, -(Math.PI / 2), 2 * Math.PI);
  this.context.stroke();
};

CircleClock.prototype.drawCurrentProgressCircle = function () {
  const x = this.width / 2;
  const y = this.height / 2;
  // 绘制倒计时环形进度条
  const canvasGradient = this.context.createLinearGradient(
    0,
    0,
    0,
    this.height
  );
  // 在offset为0的位置(即起点位置)添加一个蓝色的渐变
  canvasGradient.addColorStop(0, "#00BCD4");
  // 在offset为0.4的位置(线段左起20%的位置)添加一个绿色的渐变
  canvasGradient.addColorStop(0.4, "#7C4DFF");
  // 在offset为0.8的位置(即终点位置)添加一个红色的渐变
  canvasGradient.addColorStop(0.8, "#DCE775");
  // 在offset为1的位置(即终点位置)添加一个红色的渐变
  canvasGradient.addColorStop(1, "#FF5722");
  // 将strokeStyle的属性值设为该CanvasGradient对象

  this.context.strokeStyle = canvasGradient;

  // 计算进度
  const progress = 1 - this.currentSeconds / this.seconds;
  this.setProgress(progress);
  // - (Math.PI/2),  (progress) *(3/2 *Math.PI)   [-0.5, 1.5]-[0, 1],
  this.context.lineWidth = 16;
  this.context.lineCap = "round";
  this.context.beginPath();
  // 绘制圆形进度环
  this.context.arc(
    x,
    y,
    this.width / 5,
    -(Math.PI / 2),
    (-0.5 + 2 * progress) * Math.PI
  );
  this.context.stroke();
};

CircleClock.prototype.createLinearGradientByTime = function () {
    // 按照进度，计算渐变色
  const progress = this.getProgress();
  // 修改填充颜色
  const canvasGradient = this.context.createLinearGradient(
    this.width / 2 - 18,
    this.height / 2 - 18,
    this.width / 2,
    this.height / 2 + 50
  );

  canvasGradient.addColorStop(0, "#00BCD4");
  progress > 0 && progress < 0.4 && canvasGradient.addColorStop(0.3, "#7C4DFF");

  progress > 0.4 &&
    progress < 0.8 &&
    canvasGradient.addColorStop(0.6, "#DCE775");
  progress > 0.6 &&
    progress < 0.9 &&
    canvasGradient.addColorStop(0.8, "#EEFF41");
  canvasGradient.addColorStop(1, "#FF5722");
  return canvasGradient;
};

CircleClock.prototype.drawTimeText = function () {
    // 绘制环中间文字倒计时
  this.context.fillStyle = this.createLinearGradientByTime();
  this.context.textAlign = "start";
  this.context.font = "36px bold";
  this.context.textBaseline = "alphabetic";
  let s = parseInt(this.currentSeconds);
  let ss = parseInt(s % 60);
  let mm = parseInt(s / 60);
  const text = `${mm.toString().padStart(2, 0)}: ${ss
    .toString()
    .padStart(2, 0)}`;
    // 计算文本长度，适配位置
  const textWidth = this.context.measureText(text).width;
  this.context.fillText(
    text,
    this.width / 2 - textWidth / 2,
    this.height / 2 + 18
  );
};

CircleClock.prototype.clear = function () {
    // 清理canvas
  this.context.clearRect(0, 0, this.width, this.height); //每改变一次动画就要对这个空间范围进行一次刷新，不然会重叠在一起
};

CircleClock.prototype.setTime = function (seconds) {
    // 设置初始时间，需要倒计时的时间
  this.seconds = seconds;
};

CircleClock.prototype.setCurrentTime = function (currentSeconds) {
    // 实时同步当前剩下的时间
  this.currentSeconds = currentSeconds;
};

CircleClock.prototype.run = function (seconds, endCallback) {
    // 开始运行项目，运行时传入初始时间和回调函数
  let count = 0;
  const intervalTime = setInterval(() => {
    this.setTime(seconds);
    const allTime = this.seconds;
    const unPass = allTime - count;
    count = count + 1;
    console.log("unPass", unPass);
    if (unPass < 0) {
      //   clearInterval(intervalTime);
      this.setTime(30);
      count = 0;
      endCallback && endCallback();
    } else {
      this.update(unPass);
    }
  }, 1000);
};

CircleClock.prototype.update = function (unPass) {
  this.setCurrentTime(unPass);
  this.clear();
  this.drawBackgroundCircle();
  this.drawCurrentProgressCircle();
  this.drawTimeText();
};

const circleClock = new CircleClock("canvas");
circleClock.run(30, () => {
  console.log("倒计时执行完毕");
});
