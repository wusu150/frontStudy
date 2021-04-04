if (true){
  let a = 'name'
}
// console.log(a);

// const resul = 'name';
// resul = 'hellow';
// console.log(resul);

// let age = 2;
// let kitty = {
//   age: 1,
//   grow: function () {
//     console.log(++this.age);
//   }
// };
//
// kitty.grow();


// function f(a = 4,b = 5) {
//   console.log(a, b)
// }
// // f('', null);
// // f(undefined, null);
// f(88, 99);
//
// console.log(...[1, 2, 3]);
// // 1 2 3
// console.log(1, ...[2, 3, 4], 5);
// // 1 2 3 4 5


// 6.
let foo = ['one', 'two', 'three'];
let [ one = true, ...two] = foo;
console.log(one, two);

let jack = { name: 'one', code: 'two', gender: 'male' };
let { name = true, ...rest} = jack;
console.log(name, rest);
