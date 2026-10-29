fetch("http://localhost:3000/students")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));