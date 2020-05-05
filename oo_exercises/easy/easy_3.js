class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat.prototype);

console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.

/*
fakeCat.__proto__ is Cat {} which came from Cat.prototype

fakeCat.constructor.name is Function
*/

// ///////////

class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat);

console.log(fakeCat instanceof Function); // logs false for fakeCat instanceof Cat
console.log(fakeCat.name);           // logs Cat
console.log(fakeCat.speaks());       // logs error of fakeCat.speaks is not a function

/*
fakeCat.__proto__ is [Function: Cat]. So the actual constructor function become the __proto__ for fakeCat, not Cat's prototype (Cat.prototype) which is (Cat {})

fakeCat.constructor.name is Function
*/


// /////////////

let cat = {
  name: "kitty",
  age: 5,
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(cat.prototype);
console.log(fakeCat instanceof cat); // logs error of right hand side of instanceof is not callable
console.log(fakeCat.name);           // logs kitty
console.log(fakeCat.speaks());       // logs kitty says meowwww.

/*
fakeCat.__proto__ is { name: 'kitty', age: 5, speaks: [Function: speaks] } but you don't know the name of that object that is the prototype (you don't know that cat is the __proto__ if fakeCat)

cat.prototype does not exist because cat is an object, not a constructor function

fakeCat.constructor.name is Object
*/

/*
Summary: If you use Object.create, you have to use an object as the argument which can be two things:

  + either this:
    let cat = {
      name: "kitty",
      age: 5,
      speaks() {
        return `${this.name} says meowwww.`;
      }
    }

    with calling it like this: let fakeCat = Object.create(cat);

    -  You can't call it with this: let fakeCat = Object.create(cat.prototype) since cat doesn't have a cat.prototype (it returns undefined). Only an Object or null is accept as the argument (can't be undefined).

  + or this:

  class Cat {
    constructor(name) {
      this.name = name;
    }
    speaks() {
      return `${this.name} says meowwww.`;
    }
  }

    with calling is like this: let fakeCat = Object.create(Cat.prototype);

    - You can't call it like this: let fakeCat = Object.create(Cat) because it'll make [Function] as the __proto__ for fakeCat since [Function] is the __proto__ of Cat

*/