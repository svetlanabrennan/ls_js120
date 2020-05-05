class Auto {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Auto {
  getWheels() {
    return 4;
  }
}

class Motorcycle extends Auto {
  getWheels() {
    return 2;
  }
}

class Truck extends Auto {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }
}