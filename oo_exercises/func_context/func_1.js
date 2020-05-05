let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

// this inside fullName is referring to the global object as the context since this call only be used
// inside a method or function. 