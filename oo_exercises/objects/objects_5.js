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

let school = {
  students: [],

  addStudent(name, year) {
    if (["1st", "2nd", "3rd", "4th", "5th"].includes(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log("Invalid Year.");
    }
  },

  enrollStudent(student, courseName, courseCode) {
    // let studentIndex = this.students.findIndex(student => student.name === name);
    // this.students[studentIndex].courses.push(course)
    student.addCourse({ name: courseName, code: courseCode });
  },

  addGrade(student, courseName, courseGrade) {
    let courseIndex = student.courses.findIndex(course => course.name === courseName);
    student.courses[courseIndex].grade = courseGrade;
  },

  getReportCard(student) {
    student.courses.forEach(course => {
      if (course.grade) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In progress`);
      }
    });
  },

  courseReport(courseName) {
    let studentsInCourse = this.students.map(student => {
      let course = student.courses.filter(obj => obj.name === courseName)[0] || { grade: undefined };
      return { name: student.name, grade: course.grade };
    }).filter(student => student.grade);

    if (studentsInCourse.length > 0) {
      console.log(`==${courseName} Grades==`);

      let average = studentsInCourse.reduce((prev, curr) => {
        console.log(`${curr.name}: ${curr.grade}`);
        return prev + curr.grade;
      }, 0) / studentsInCourse.length;

      console.log("---");
      console.log(`Course Average: ${String(average)}`);
    }
  },
};

let foo = school.addStudent("foo", "3rd");
let bar = school.addStudent("bar", "1st");
let qux = school.addStudent("qux", "2nd");

school.enrollStudent(foo, "Math", 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, "Physics", 202);
school.addGrade(foo, "Math", 95);
school.addGrade(foo, "Advanced Math", 90);

school.enrollStudent(bar, "Math", 101);
school.addGrade(bar, "Math", 91);

school.enrollStudent(qux, "Math", 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, "Math", 93);
school.addGrade(qux, "Advanced Math", 90);

//console.log(school.students[0]);

//school.getReportCard(foo);
school.courseReport("Math");
// school.courseReport("Advanced Math");
school.courseReport("Physics");

//console.log(school.students);
