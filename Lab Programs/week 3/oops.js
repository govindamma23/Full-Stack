// Vehicle Rental System
// Demonstrates OOP concepts: Encapsulation, Inheritance, Polymorphism, Abstraction
// Plus regular functions working alongside classes

// ---------------------------------------------
// ABSTRACTION: base class that defines a contract
// but leaves some behavior to be implemented by subclasses
// ---------------------------------------------   
class Vehicle {
  // Static property: shared across ALL instances of Vehicle (and subclasses)
  static totalVehicles = 0;

  // ENCAPSULATION: private fields (marked with #) can't be accessed
  // directly from outside the class — only through methods we define
  #odometer = 0;

  constructor(brand, model, ratePerDay) {
    if (new.target === Vehicle) {
      // Prevents anyone from creating a plain "Vehicle" directly —      
      // it's meant to be abstract (only subclasses should be instantiated)
      throw new Error("Vehicle is abstract and cannot be instantiated directly");
    }
    this.brand = brand;
    this.model = model;
    this.ratePerDay = ratePerDay;
    this.isRented = false;
    Vehicle.totalVehicles++;
  }

  // Getter: reads the private #odometer field in a controlled way
  get mileage() {
    return this.#odometer;
  }

  // Encapsulated method: the only way to change #odometer from outside
  drive(km) {
    if (km < 0) {
      console.log("Distance can't be negative.");
      return;
    }
    this.#odometer += km;
  }

  rent() {
    this.isRented = true;
    console.log(`${this.brand} ${this.model} has been rented.`);
  }

  returnVehicle() {
    this.isRented = false;
    console.log(`${this.brand} ${this.model} has been returned.`);
  }

  // ABSTRACTION: subclasses are expected to override this.
  // The base version throws an error if a subclass forgets to implement it.
  describe() {
    throw new Error("describe() must be implemented by subclass");
  }

  // Regular method available to all subclasses via inheritance
  calculateCost(days) {
    return this.ratePerDay * days;
  }
}

// ---------------------------------------------
// INHERITANCE: Car and Bike both extend Vehicle,
// reusing its properties and methods
// ---------------------------------------------
class Car extends Vehicle {
  constructor(brand, model, ratePerDay, seats) {
    super(brand, model, ratePerDay); // calls Vehicle's constructor
    this.seats = seats;
  }

  // POLYMORPHISM: Car provides its own version of describe()
  describe() {
    return `${this.brand} ${this.model} (Car) - ${this.seats} seats - $${this.ratePerDay}/day`;
  }

  // POLYMORPHISM: Car overrides calculateCost with extra logic,
  // but still reuses the parent's version via super
  calculateCost(days) {
    const baseCost = super.calculateCost(days);
    const insurance = days * 5; // cars have a daily insurance fee
    return baseCost + insurance;
  }
}

class Bike extends Vehicle {
  constructor(brand, model, ratePerDay, hasGears) {
    super(brand, model, ratePerDay);
    this.hasGears = hasGears;
  }

  // POLYMORPHISM: Bike's own version of describe()
  describe() {
    return `${this.brand} ${this.model} (Bike) - Gears: ${this.hasGears} - $${this.ratePerDay}/day`;
  }
  // No override of calculateCost() — Bike just uses Vehicle's version directly
}

// ---------------------------------------------
// Regular functions (not tied to a class)
// working alongside the OOP structure
// ---------------------------------------------

// Function: create and return a fleet (array) of vehicles
function createFleet() {
  return [
    new Car("Toyota", "Camry", 40, 5),
    new Car("Honda", "Civic", 35, 5),
    new Bike("Yamaha", "FZ", 15, true),
    new Bike("Hero", "Splendor", 10, false),
  ];
}

// Function: total potential rental income for a fleet over N days
function totalFleetRevenue(fleet, days) {
  return fleet.reduce((sum, vehicle) => sum + vehicle.calculateCost(days), 0);
}

// Function: filter only vehicles matching a type (using instanceof)
function filterByType(fleet, VehicleClass) {
  return fleet.filter((vehicle) => vehicle instanceof VehicleClass);
}

// --- Program execution ---

const fleet = createFleet();

console.log("--- Fleet Descriptions ---");
fleet.forEach((v) => console.log(v.describe())); // polymorphism in action

console.log("\n--- Renting & Driving ---");
fleet[0].rent();
fleet[0].drive(120);
fleet[0].drive(80);
console.log(`${fleet[0].brand}'s mileage: ${fleet[0].mileage} km`); // uses getter
fleet[0].returnVehicle();

console.log("\n--- Cost for 3 days rental ---");
fleet.forEach((v) =>
  console.log(`${v.brand} ${v.model}: $${v.calculateCost(3)}`)
);

console.log("\n--- Total Fleet Revenue (3 days) ---");
console.log(`$${totalFleetRevenue(fleet, 3)}`);

console.log("\n--- Only Cars ---");
filterByType(fleet, Car).forEach((c) => console.log(c.describe()));

console.log("\n--- Total Vehicles Created (static property) ---");
console.log(Vehicle.totalVehicles);

console.log("\n--- Trying to instantiate abstract class directly ---");
try {
  const v = new Vehicle("Generic", "X", 10);
} catch (err) {
  console.log("Error caught:", err.message);
}