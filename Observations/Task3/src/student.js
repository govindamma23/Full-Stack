// Creating Student class
class Student {
    constructor(name, rollNo, department, cgpa) {
        this.name = name;
        this.rollNo = rollNo;
        this.department = department;
        this.cgpa = cgpa;
    }
}

// Selecting the button and profile section
const button = document.getElementById("displayBtn");
const profile = document.getElementById("profile");

// Adding click event
button.addEventListener("click", function () {

    // Getting values from input fields
    let name = document.getElementById("name").value;
    let rollNo = document.getElementById("rollNo").value;
    let department = document.getElementById("department").value;
    let cgpa = document.getElementById("cgpa").value;

    // Creating Student object
    let student = new Student(
        name,
        rollNo,
        department,
        cgpa
    );

    // Creating HTML elements dynamically
    let heading = document.createElement("h2");
    heading.textContent = "Student Profile";

    let nameText = document.createElement("p");
    nameText.textContent = "Name : " + student.name;

    let rollText = document.createElement("p");
    rollText.textContent = "Roll No : " + student.rollNo;

    let departmentText = document.createElement("p");
    departmentText.textContent =
        "Department : " + student.department;

    let cgpaText = document.createElement("p");
    cgpaText.textContent = "CGPA : " + student.cgpa;

    // Clear previous output
    profile.innerHTML = "";

    // Add elements to the webpage
    profile.appendChild(heading);
    profile.appendChild(nameText);
    profile.appendChild(rollText);
    profile.appendChild(departmentText);
    profile.appendChild(cgpaText);
});