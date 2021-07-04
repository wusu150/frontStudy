var a = 333;
let obj = {
  a: 555,
  test: () => {
    console.log(this.a)
  },
  test2: function () {
    console.log(this.a);
  }
};

obj.test();
obj.test2();
