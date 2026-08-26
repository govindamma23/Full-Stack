class Person {
    introduce() {
        console.log("I am a person");
    }
}

class Student extends Person {
    study() {
        console.log("Student is studying");
    }
}

class CollegeStudent extends Student {
    attendClass() {
        console.log("College student is attending class");
    }
}

const student = new CollegeStudent();

student.introduce();
student.study();
student.attendClass();