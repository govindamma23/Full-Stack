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