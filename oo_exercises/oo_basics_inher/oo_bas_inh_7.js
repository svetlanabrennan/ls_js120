const twoMixin = {
  tow() {
    return "I can tow a trailer!";
  }
}

class Truck {
  constructor() {
    Object.assign(this, twoMixin);
  }
}

class Car { }

let truck = new Truck();
console.log(truck.tow());

