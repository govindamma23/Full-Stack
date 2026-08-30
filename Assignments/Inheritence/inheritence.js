//single inheritence
class Vehicle {
    start() {
        console.log("Vehicle starts");
    }
}

class Car extends Vehicle {
    drive() {
        console.log("Car is driving");
    }
}

const car = new Car();

car.start();
car.drive();
//MultilevelInheritence
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
//Hierarchial
// Parent class
class Animal {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(this.name + " is eating");
    }
}

// Child class 1
class Dog extends Animal {
    bark() {
        console.log(this.name + " is barking");
    }
}

// Child class 2
class Cat extends Animal {
    meow() {
        console.log(this.name + " is meowing");
    }
}

// Create Dog object
let dog = new Dog("Tommy");

console.log("Dog:");
dog.eat();
dog.bark();

console.log();

// Create Cat object
let cat = new Cat("Kitty");

console.log("Cat:");
cat.eat();
cat.meow();
//Multiple
class Employee {
    work() {
        console.log("Employee is working");
    }
}

class Developer extends Employee {
    code() {
        console.log("Developer is writing code");
    }
}

class Manager extends Employee {
    manage() {
        console.log("Manager is managing the team");
    }
}

const developer = new Developer();
developer.work();
developer.code();

const manager = new Manager();
manager.work();
manager.manage();
