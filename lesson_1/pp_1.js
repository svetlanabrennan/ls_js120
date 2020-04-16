// create function to create object
// call each of the books

function createBook(title, author, read = false) {
  return {
    title: title,
    author: author,
    read,

    getDescription() {
      if (this.read === false) {
        console.log(`${this.title} was written by ${this.author}. I haven't read it.`);
      } else {
        console.log(`${this.title} was written by ${this.author}. I have read it.`);
      }

      // return `${this.title} was written by ${this.author}. ` + // course solution
      //        `I ${this.read ? 'have' : "haven't"} read it.`;
    },

    readBook() {
      this.read = true;
    },
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

// book1.getDescription();  // "Mythos was written by Stephen Fry."
// book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
// book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"

// console.log(book1.read); // => false
// console.log(book2.read); // => false
// console.log(book3.read); // => false

// console.log(book1.read); // => false
// book1.readBook();
// console.log(book1.read); // => true

book1.getDescription(); // Mythos was written by David Fry. I haven't read it.
book1.readBook();
book1.getDescription(); // Mythos was written by David Fry. I have read it.