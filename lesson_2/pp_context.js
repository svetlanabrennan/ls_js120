/*
1. The code below should output "Christopher Turk is a Surgeon". Without running the code, what will it output? If there is a difference between the actual and desired output, explain the difference.
*/

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return this.firstName + ' ' + this.lastName + ' is a '
//       + this.occupation + '.';
//   }
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription);

// it outputs "undefined undefined is a undefined" because the method getDescription was removed from it's context so this refers to the global object within the logReturnVal function. 

/*
2. Modify the program from the previous problem so that logReturnVal accepts an additional context argument. If you then run the program with turk as the context argument, it should produce the desired output.
*/

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return this.firstName + ' ' + this.lastName + ' is a '
//       + this.occupation + '.';
//   }
// };

// function logReturnVal(func, context) {
//   let returnVal = func.call(context);
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription, turk);

/*
3. Suppose that we want to extract getDescription from turk, but we always want it to execute with turk as its execution context. How would you modify your code to do that?
*/

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return this.firstName + ' ' + this.lastName + ' is a '
//       + this.occupation + '.';
//   }
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// let description = turk.getDescription.bind(turk)
// logReturnVal(description);

/*
4. Consider the following code. Will this code produce the following output? Why or why not?
The Elder Scrolls: Arena
The Elder Scrolls: Daggerfall
The Elder Scrolls: Morrowind
The Elder Scrolls: Oblivion
The Elder Scrolls: Skyrim

*/

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

// it won't produce the expected output because functions that are passed as arguments to another 
// function lose their context, so the seriesTitle is undefined;

// you'll have to create a variable and assign the series title to it, and use that variable in the
// nested function


/*
5. Use let self = this; to ensure that TESgames.listGames uses TESGames as its context and logs the proper output.
*/

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function () {
//     let self = this;
//     this.titles.forEach(function (title) {
//       console.log(self.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();

/*
6. The forEach method provides an alternative way to supply the execution context for the callback function. Modify the program from the previous problem to use that technique to produce the proper output:
*/

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function () {
//     this.titles.forEach(function (title) {
//       console.log(this.seriesTitle + ': ' + title);
//     }, this);
//   }
// };

// TESgames.listGames();

/*
7. Use an arrow function to achieve the same result:
*/

// const TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames: function () {
//     this.titles.forEach(title => {
//       console.log(this.seriesTitle + ': ' + title);
//     });
//   }
// };

// TESgames.listGames();


/*
8. Consider the following code:
What will the value of foo.a be after this code runs?
*/

// let foo = {
//   a: 0,
//   incrementA: function () {
//     function increment() {
//       this.a += 1;
//     }

//     increment();
//   }
// };

// console.log(foo.incrementA());
// foo.incrementA();
// foo.incrementA();

// foo.a remains 0 because increment() is invoked as a function so a.this refers to a global object
// which doens't exist so it's undefined

/*
9. Use one of the methods we learned in this lesson to invoke increment with an explicit context such that foo.a gets incremented with each invocation of incrementA.
*/

// let foo = { // option 1
//   a: 0,
//   incrementA: function () {
//     let self = this;
//     function increment() {
//       self.a += 1;
//     }

//     increment();
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();


let foo = { // option 2
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a);