// Select HTML elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// Function to update empty message
function updateMessage() {
    if (taskList.children.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

// Add task
addBtn.addEventListener("click", function () {

    const taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task.");
        return;
    }

    // Create list item
    const taskItem = document.createElement("li");
    taskItem.classList.add("task");

    // Create task text
    const taskName = document.createElement("span");
    taskName.textContent = taskValue;
    taskName.classList.add("task-name");

    // Create Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete-btn");

    // Complete button event
    completeBtn.addEventListener("click", function () {

        taskName.classList.toggle("completed");

        if (taskName.classList.contains("completed")) {
            completeBtn.textContent = "Completed";
        } else {
            completeBtn.textContent = "Complete";
        }
    });

    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Delete button event
    deleteBtn.addEventListener("click", function () {

        taskItem.remove();

        updateMessage();
    });

    // Add elements to task item
    taskItem.appendChild(taskName);
    taskItem.appendChild(completeBtn);
    taskItem.appendChild(deleteBtn);

    // Add task to the list
    taskList.appendChild(taskItem);

    // Clear input
    taskInput.value = "";

    // Update empty message
    updateMessage();
});

// Add task when Enter key is pressed
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addBtn.click();
    }

});

// Show empty message initially
updateMessage();