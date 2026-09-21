// --- Using a regular function (constructor function) ---
function StudentFunction(name, course) {
    this.name = name;
    this.course = course;
}
// Methods added via prototype (shared across all instances)
StudentFunction.prototype.showInfo = function () {
    console.log(`${this.name} is enrolled in ${this.course}`);
};

const s1 = new StudentFunction("Aarav", "CSE");
s1.showInfo(); // Aarav is enrolled in CSE


// --- Using a class (ES6) ---
class Student {
    constructor(name, course) {
        this.name = name;      // property
        this.course = course;  // property
    }

    showInfo() {                // method
        console.log(`${this.name} is enrolled in ${this.course}`);
    }
}

// Creating multiple objects from the same class
const s2 = new Student("Priya", "IT");
const s3 = new Student("Rahul", "BCA");

s2.showInfo(); // Priya is enrolled in IT
s3.showInfo(); // Rahul is enrolled in BCA