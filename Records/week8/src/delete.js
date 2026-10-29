fetch("http://localhost:3000/students/3", {
  method: "DELETE"
})
  .then(response => {
    if (response.ok) {
      console.log("Student deleted successfully");
    }
  })
  .catch(error => console.log(error));