/* eslint-disable max-lines-per-function */
function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],

    info() {
      return (`${this.name} is a ${year} year student`);
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(code, note) {
      let courseIndex = this.courses.findIndex(obj => obj.code === code);
      if (this.courses[courseIndex].notes) {
        this.courses[courseIndex].notes.push(note);
      } else {
        this.courses[courseIndex].notes = [note];
      }
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.notes) {
          console.log(`${course.name}: ${course.notes.join("; ")}`);
        }
      });
    },

    updateNote(code, note) {
      let courseIndex = this.courses.findIndex(obj => obj.code === code);
      this.courses[courseIndex].notes = [note];
    }
  };
}

let foo = createStudent('Foo', '1st');
console.log(foo.info());
console.log(foo.listCourses());
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
console.log(foo.listCourses());

foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes(); // "Math: Fun Course; Remember to study for algebra"

foo.addNote(102, 'Difficult subject');
foo.viewNotes();
foo.updateNote(101, 'Fun course');
foo.viewNotes();