// function timeout(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {resolve(444)}, ms, 'done');
//   });
// }
//
// timeout(9000).then((value) => {
//   console.log(value);
// });

constructor(props){
  super(props);
  this.events = [() => {
    return new Promise((resolve,reject) => {
      Modal.confirm({
        title:'1',
        onOk: () => {
          resolve()
        }
      })
    })
  },
    () => {
      return new Promise((resolve,reject) => {
        Modal.confirm({
          title:'2',
          onOk: () => {
            resolve()
          }
        })
      })
    },
    () => {
      return new Promise((resolve,reject) => {
        Modal.confirm({
          title:'3',
          onOk: () => {
            resolve()
          }
        })
      })
    }
  ]
}
_stackModal = async () => {
  for (let i = 0; i < this.events.length; i++) {
    await this.events[i]();
  }
};
// async，await，Promise，resolve，reject
//上面这段代码主要用来实现按照固定顺序进行弹窗，只有当点击确认按钮之后，才会进行下一步操作。
// 才会弹出第二个弹窗，依次弹出



