class Cat { // #2
  constructor(name) {
    this.name = name; // #5
    // console.log(`Hello! My name is ${this.name}!`); // #4
  }

  greet() { // #6
    console.log(`Hello! My name is ${this.name}!`); // #4
  }
}

// #3
let kitty = new Cat("Sophie");
kitty.greet();
// #4
