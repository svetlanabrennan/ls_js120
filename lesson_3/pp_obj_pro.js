/*
1. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.
*/

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// console.log(baz.foo + qux.foo);

// it'll log 2 to the console because baz copies all properties from qux. And then it access the 
// property foo from itself and ads it to the foo property from qux. 

/*
2. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.
*/

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// baz.foo = 2;

// console.log(baz.foo + qux.foo);

// it'll log 3 to the console because baz creates its own foo property with value of 2 and then 
// adds it to the foo property from qux. 

/*
3. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.
*/

// let qux = { foo: 1 };
// let baz = Object.create(qux);
// qux.foo = 2;

// console.log(baz.foo + qux.foo);

// it'll log 4 to the console because when qux reassigned foo to equal 2, and console.log adds foo 
// from baz which is foo from qux plus the foo from qux. 

/*
4. As we saw in problem 2, the following code creates a new property in the baz object instead of assigning the property in the prototype object.

let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

Write a function that searches the prototype chain of an object for a given property and assigns it a new value. If the property does not exist in any of the prototype objects, the function should do nothing. The following code should work as shown:

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false
*/

// let fooA = { bar: 1 };
// let fooB = Object.create(fooA);
// let fooC = Object.create(fooB);

// // c => b => a
// // Object.prototype.hasOwnProperty(prop)

// function assignProperty(obj, prop, val) {
//   while (obj !== null) {
//     if (obj.hasOwnProperty(prop)) {
//       obj[prop] = val;
//       break;
//     }

//     obj = Object.getPrototypeOf(obj);
//   }
// }

// assignProperty(fooC, "bar", 2);
// console.log(fooA.bar); // 2
// console.log(fooC.bar); // 2

// assignProperty(fooC, "qux", 3);
// console.log(fooA.qux); // undefined
// console.log(fooC.qux); // undefined
// console.log(fooA.hasOwnProperty("qux")); // false
// console.log(fooC.hasOwnProperty("qux")); // false

/*
5. Consider the following two loops:

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}
Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});

If foo is an arbitrary object, will these loops always log the same results to the console? Explain why they do or do not. If they don't always log the same information, show an example of when the results differ.
*/

// for (let property in foo) {
//   console.log(`${property}: ${foo[property]}`);
// }

// Object.keys(foo).forEach(property => {
//   console.log(`${property}: ${foo[property]}`);
// });

// the loops will not always log the same results to the console. for/in logs all properties, even 
// the inherit properties. Object.keys will only return the objects "own" properties. 

// let a = { foo: 5, bar: 6 };
// let b = Object.create(a);
// b.foo = 10;
// b.fun = 1;
// b.hello = "hi";

// for/in example
// for (let property in b) {
//   console.log(`${property}: ${b[property]}`);
// }
// will log:
// foo: 10
// fun: 1
// hello: hi
// bar: 6

// Object.keys example
// Object.keys(b).forEach(property => {
//   console.log(`${property}: ${b[property]}`);
// });
// will log fun: 1 and hello: "hi";

/*
6. How do you create an object that doesn't have a prototype? How can you determine whether an object has a prototype?
*/

// let a = Object.create(null);

// if (Object.getPrototypeOf(a)) {
//   console.log("has prototype");
// } else {
//   console.log("doesn't have prototype");
// }