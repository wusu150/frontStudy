
const dp = new DPlayer({
  container: document.getElementById("dplayer"),
  autoplay: true,
  loop: true,
  hotkey: true,
  video: {
    url: './4qM0CKBHC37GVSs5ZeQ@@hd.mp4',
    // url: "./Nami.wmv"
  },
});

dp.play();

dp.on('ended', function () {
    console.log('player ended');
});

dp.on('error', function () {
    console.log('player ended');
});

dp.on('loadeddata', function () {
    console.log('player ended');
});

dp.on('loadstart', function () {
    console.log('player ended');
});