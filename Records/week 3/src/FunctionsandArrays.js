// Function to calculate sum of array elements
function calculateSum(numbers) {
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        sum = sum + numbers[i];
    }

    return sum;
}

// Function to calculate average
function calculateAverage(numbers) {
    let sum = calculateSum(numbers);
    return sum / numbers.length;
}

// Array of numbers
let numbers = [10, 20, 30, 40, 50];

// Calling functions
let sum = calculateSum(numbers);
let average = calculateAverage(numbers);

// Display results
console.log("Array Elements:", numbers);
console.log("Sum:", sum);
console.log("Average:", average);