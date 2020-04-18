/*
1. If we have a Car class and a Truck class, how can you use the Speed object as a mix-in to make them goFast? How can you check whether your Car or Truck can now go fast?
*/

// const Speed = {
//   goFast() {
//     console.log(`I'm a ${this.constructor.name} and going super fast!`);
//   }
// };

// class Car {
//   goSlow() {
//     console.log(`I'm safe and driving slow.`);
//   }
// }

// class Truck {
//   goVerySlow() {
//     console.log(`I'm a heavy truck and like going very slow.`);
//   }
// }

// Object.assign(Car.prototype, Speed);

// let myCar = new Car();
// console.log(myCar.goFast());

// Object.assign(Truck.prototype, Speed);
// let myTruck = new Truck();
// console.log(myTruck.goFast());

/*
2.In the last question, we used a mix-in named Speed that contained a goFast method. We included the mix-in in the Car class and then called the goFast method from an instance of the Car class. You may have noticed that the string printed when we call goFast includes the name of the type of vehicle we are using. How is that done?

ANSWER:
  When we used the Object.assign method, we copied the properties from the Speed object into Car's prototype. And when we invoked the goFast method on myCar object, it checked the myCar object for that method, didn't find it so it looked at it's prototype and found the method there.

  When goFast was invoked with the myCar object to the left of it, it passed that object's context as this to the goFast method which was used in the this.constructor.name code in goFast method. Since myCar's object contructor is "Car", it used that as the name for this.constructor.name.
*/

/*
3. What do we mean when we say that classes are first-class values?

ANSWER:
  We mean that classes are just like functions and functions in javascript are first class values since they can be passed to another function, returned from another function, assigned to a variable and used anywhere as a value. Basically Javascript classes can be treated like any other javascript value.
*/

/*
4. Consider the following class declaration:

What does the static modifier do? How would we call the method manufacturer?

ANSWER:
  The static modifier lets you define methods/properties directly in the Class, not on the objects created with the class and static methods can be called with the class name.
*/

// class Television {
//   static manufacturer() {
//     // omitted code
//   }

//   model() {
//     // method logic
//   }
// }

// Television.manufacturer();

/*
5. Suppose we have the following classes:

What would happen if we added a play method to the Bingo class, keeping in mind that there is already a method of this name in the Game class from which the Bingo class inherits? Explain your answer. What do we call it when we define a method like this?

ANSWER:
  Since you are declaring the play method on Bingo, when this method is invoked, javascript will first check the Bingo's class for it's own play method, and if it doesn't find it there, it'll look at the prototype chain to check if it's there and return it if it is.

  When we define a method like this, it is called method overriding.
*/

// class Game {
//   play() {
//     return 'Start the game!';
//   }
// }

// class Bingo extends Game {
//   rulesOfPlay() {
//     // rules of play
//   }

//   play() { // added this
//     console.log("our own method");
//   }
// }

// let myGame = new Bingo(); // added this
// console.log(myGame.play());

/*
6. Let's practice creating a class hierarchy.

Create a class named Greeting that has a single method named greet. The method should take a string argument, and it should print that argument to the console.

Now, create two more classes that inherit from Greeting: one named Hello, and the other Goodbye. The Hello class should have a hi method that takes no arguments and logs "Hello". The Goodbye class should have a bye method that logs "Goodbye". Use the greet method from the Greeting class when implementing Hello and Goodbye; don't call console.log from either Hello or Goodbye.

*/

// class Greeting {
//   greet(string) {
//     console.log(string);
//   }
// }

// class Hello extends Greeting {
//   hi() {
//     this.greet("Hello");
//   }
// }

// class Goodbye extends Greeting {
//   bye() {
//     this.greet("Goodbye");
//   }
// }

/*
7. Ben and Alyssa are working on a vehicle management system. Thus far, they have created classes named Auto and Motorcycle to represent automobiles and motorcycles. After they noticed that the information and calculations performed was common to both vehicle types, they decided to break out the commonality into a separate class named WheeledVehicle. Their code, thus far, looks like this:


*/

class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}

const TrackingFuel = {
  range() {
    return this.fuel_capacity * this.fuel_efficiency;
  }
};

Object.assign(WheeledVehicle.prototype, TrackingFuel);

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30, 30, 32, 32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20, 20], 80, 8.0);
  }
}

// Their boss now wants them to incorporate a new type of vehicle: a Catamaran.

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;

    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
}

Object.assign(Catamaran.prototype, TrackingFuel);

/*
This new class doesn't fit well with our existing class hierarchy: Catamarans don't have tires, and aren't wheeled vehicles. However, we still want to share the code for tracking fuel efficiency and range. Modify the class definitions and move code into a mix-in, as needed, to share code between the Catamaran and the wheeled vehicle classes.
*/