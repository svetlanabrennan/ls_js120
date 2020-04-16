/*
What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?
*/

// let RECTANGLE = {
//   area: function () {
//     return this.width * this.height;
//   },
//   perimeter: function () {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area();
//   this.perimeter = RECTANGLE.perimeter();
// }

// let rect1 = new Rectangle(2, 3);

// console.log(rect1.area);
// console.log(rect1.perimeter);

// it'll log NaN for both console.log calls because the the area and perimeter is invoked with this set to the RECTANGLE object instead of the rect1 object. 

/*
2. How would you fix the problem in the code from problem 1?
*/

// let RECTANGLE = {
//   area: function () {
//     return this.width * this.height;
//   },
//   perimeter: function () {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area.call(this)
//   this.perimeter = RECTANGLE.perimeter.call(this);
// }

// let rect1 = new Rectangle(2, 3);

// console.log(rect1.area);
// console.log(rect1.perimeter);

/*
3. Write a constructor function called Circle that takes a radius as an argument. You should be able to call an area method on any objects created by the constructor to get the circle's area. Test your implementation with the following code:
*/

// function Circle(radius) {
//   this.radius = radius;
// }

// Circle.prototype.area = function () {
//   return Math.PI * (this.radius * this.radius);
// }

// let a = new Circle(3);
// let b = new Circle(4);

// console.log(a.area());

// a.area().toFixed(2); // => 28.27
// b.area().toFixed(2); // => 50.27
// a.hasOwnProperty('area'); // => false

/*
4.What will the following code log to the console and why?
*/

// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype.swingSword = function () {
//   return this.swung;
// };

// console.log(ninja.swingSword());

// it'll return true because ninja is the context when swingSword is invoked

/*
5. What will the following code output and why? Try to answer without running the code.
*/

// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype = {
//   swingSword: function () {
//     return this.swung;
//   },
// };

// console.log(ninja.swingSword());

// it'll return undefined because Ninja.prototype is reassigning the prototype of Ninja instead of creating a method under the prototype and ninja still has the original prototype and it can't find a swingSword method. 

/*
6. Implement the method described in the comments below:
*/

// function Ninja() {
//   this.swung = false;
// }

// // Add a swing method to the Ninja prototype which
// // modifies `swung` and returns the calling object

// Ninja.prototype.swing = function () {
//   this.swung = true;
//   return this;
// }

// let ninjaA = new Ninja();
// let ninjaB = new Ninja();

// console.log(ninjaA.swing().swung);      // logs `true`
// console.log(ninjaB.swing().swung);      // logs `true`

/*
7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:
*/

// let ninjaA;

// {
//   const Ninja = function () {
//     this.swung = false;
//   };

//   ninjaA = new Ninja();
// }

// // create a `ninjaB` object here; don't change anything else
// let ninjaB = Object.create(ninjaA);

// console.log(ninjaA.constructor === ninjaB.constructor); // => true
// console.log(ninjaA);
// console.log(ninjaB);

/*
8. What happens in each of the following cases? Try to answer without running the code.
*/

// function Greeting() { }

// Greeting.prototype.greet = function (message) {
//   console.log(message);
// };

// function Hello() { }

// Hello.prototype = Object.create(Greeting.prototype);

// Hello.prototype.hi = function () {
//   this.greet('Hello!');
// };

// function Goodbye() { }

// Goodbye.prototype = Object.create(Greeting.prototype);

// Goodbye.prototype.bye = function () {
//   this.greet("Goodbye");
// };

// // Case 1
// let hello = new Hello();
// hello.hi();
// // "Hello!"


// // Case 2
// let hello = new Hello();
// hello.bye();
// // hello.bye() is not a function, Hello.prototype or Greeting.prototype don't have a bye method

// // Case 3
// let hello = new Hello();
// hello.greet();
// // undefined - the greet method is not passed an argument to console.log

// Case 4
// let hello = new Hello();
// hello.greet('Goodbye');
// // Goodbye

// // Case 5
// Hello.hi();
// // Hello.hi is not a function - hi method is not defined on the Constructor Hello, but on it's prototype

/*
9.Since a constructor is just a function, you can call it without the new operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the new operator. The function should return the same result with either form. Use the code below to check your solution:

*/

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }
  this.name = first + " " + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe