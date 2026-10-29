fetch("http://localhost:3000/students/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    id: "1",
    name: "Ravi Kumar",
    branch: "CSE",
    marks: 95
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));