let franchise = { // using arrow function to use lexical scope
  name: 'How to Train Your Dragon',
  allMovies: function () {
    return [1, 2, 3].map(number => {
      return this.name + ' ' + number;
    });
  },
};

let franchise = { // binding this to a variable solution
  name: 'How to Train Your Dragon',
  allMovies: function () {
    let self = this;
    return [1, 2, 3].map(function (number) {
      return self.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());

// it'll return undefined for `this.name` because the this keyword inside a nested function losses its // context. 

// to fix it, you can use the arrow function or bind this with call or bind