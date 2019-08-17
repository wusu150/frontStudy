function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve(444)}, ms, 'done');
  });
}

timeout(9000).then((value) => {
  console.log(value);
});
