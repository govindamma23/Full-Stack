// E-Commerce Inventory & Cart System
// Combines OOP (classes, inheritance, encapsulation, polymorphism, abstraction),
// arrays, and standalone functions

// ---------------------------------------------
// ABSTRACTION + ENCAPSULATION: base Product class
// ---------------------------------------------
class Product {
  static totalProducts = 0;      // static: shared across all products
  #stock;                        // private field: only accessible via methods below

  constructor(name, price, stock) {
    if (new.target === Product) {
      throw new Error("Product is abstract and cannot be instantiated directly");
    }
    this.name = name;
    this.price = price;
    this.#stock = stock;
    Product.totalProducts++;
  }

  // Getter: safe, read-only access to the private field
  get stock() {
    return this.#stock;
  }

  // Encapsulated method: the only way to reduce stock from outside
  reduceStock(qty) {
    if (qty > this.#stock) {
      console.log(`Not enough stock for ${this.name}`);
      return false;
    }
    this.#stock -= qty;
    return true;
  }

  // ABSTRACTION: subclasses must implement this
  getShippingInfo() {
    throw new Error("getShippingInfo() must be implemented by subclass");
  }

  // Shared method, inherited by all subclasses
  getSummary() {
    return `${this.name} - $${this.price} (${this.#stock} in stock)`;
  }
}

// ---------------------------------------------
// INHERITANCE + POLYMORPHISM
// ---------------------------------------------
class PhysicalProduct extends Product {
  constructor(name, price, stock, weightKg) {
    super(name, price, stock);
    this.weightKg = weightKg;
  }

  // POLYMORPHISM: physical products have shipping costs based on weight
  getShippingInfo() {
    const cost = this.weightKg * 2; // $2 per kg
    return `Ships physically - weight: ${this.weightKg}kg - shipping: $${cost}`;
  }
}

class DigitalProduct extends Product {
  constructor(name, price, stock, fileSizeMB) {
    super(name, price, stock);
    this.fileSizeMB = fileSizeMB;
  }

  // POLYMORPHISM: digital products have no shipping cost
  getShippingInfo() {
    return `Digital download - size: ${this.fileSizeMB}MB - no shipping cost`;
  }
}

// ---------------------------------------------
// A "has-a" class: Cart CONTAINS an array of products (composition),
// rather than inheriting from Product
// ---------------------------------------------
class Cart {
  #items = []; // encapsulated array — accessed only through methods

  addItem(product, quantity) {
    if (!product.reduceStock(quantity)) return; // uses Product's encapsulated method
    this.#items.push({ product, quantity });
    console.log(`Added ${quantity} x ${product.name} to cart`);
  }

  getItems() {
    return [...this.#items]; // return a copy, not the real internal array
  }

  getTotal() {
    return this.#items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}

// ---------------------------------------------
// Standalone functions (arrays + functions, outside the classes)
// ---------------------------------------------

// Function: build an inventory array of mixed product types
function createInventory() {
  return [
    new PhysicalProduct("Wireless Mouse", 20, 50, 0.3),
    new PhysicalProduct("Mechanical Keyboard", 60, 30, 1.1),
    new DigitalProduct("E-book: Learn JS", 15, 999, 5),
    new DigitalProduct("Photoshop Course", 40, 999, 1200),
  ];
}

// Function: find products under a given price using filter
function findAffordable(inventory, maxPrice) {
  return inventory.filter((p) => p.price <= maxPrice);
}

// Function: sort inventory by price using sort
function sortByPrice(inventory, ascending = true) {
  return [...inventory].sort((a, b) =>
    ascending ? a.price - b.price : b.price - a.price
  );
}

// Function: total inventory value using reduce
function getInventoryValue(inventory) {
  return inventory.reduce((sum, p) => sum + p.price * p.stock, 0);
}

// --- Program execution ---

const inventory = createInventory();

console.log("--- Inventory ---");
inventory.forEach((p) => console.log(p.getSummary()));

console.log("\n--- Shipping Info (polymorphism) ---");
inventory.forEach((p) => console.log(`${p.name}: ${p.getShippingInfo()}`));

console.log("\n--- Products under $30 ---");
findAffordable(inventory, 30).forEach((p) => console.log(p.getSummary()));

console.log("\n--- Sorted by price (low to high) ---");
sortByPrice(inventory).forEach((p) => console.log(`$${p.price} - ${p.name}`));

console.log("\n--- Total Inventory Value ---");
console.log(`$${getInventoryValue(inventory)}`);

console.log("\n--- Shopping with Cart ---");
const cart = new Cart();
cart.addItem(inventory[0], 2);  // 2x Wireless Mouse
cart.addItem(inventory[2], 1);  // 1x E-book
cart.addItem(inventory[1], 100); // too many keyboards — should fail

console.log("\nCart items:");
cart.getItems().forEach((item) =>
  console.log(`${item.quantity} x ${item.product.name}`)
);
console.log(`Cart total: $${cart.getTotal()}`);

console.log("\n--- Static Property ---");
console.log(`Total products ever created: ${Product.totalProducts}`);

console.log("\n--- Trying to instantiate abstract Product directly ---");
try {
  new Product("Generic", 10, 5);
} catch (err) {
  console.log("Error caught:", err.message);
}