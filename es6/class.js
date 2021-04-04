class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  shout() {
    console.log('init-shout');
    return `My name is ${this.name}, age is ${this.age}`
  }

  static foo() {
    console.log('init-static');
    return `Here is a static function.`
  }
}


const cow = new Animal('betty', 2);
console.log(cow.shout());
// console.log(Animal.foo());

class Dog extends Animal{
  constructor(name, age, color = 'black', gender = 'female') {
    super(name, age);
    this.color = color;
    this.genderDog = gender;
  }

  get gender() {
    return this.genderDog;
  }
  // shout1() {
  //   console.log('----', this.shout());
  //   // return super.shout() + `, my color is ${this.color}`;
  // }
}

const dog = new Dog('bili', 23, 'pink', 'male');
// console.log(dog.shout1());
// console.log(dog.shout());
console.log(dog.gender);
// console.log(dog.__proto__);
// console.log(dog.__proto__.shout);
