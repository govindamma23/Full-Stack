// Student Grade Manager
// Demonstrates arrays and functions in JavaScript

// Array of student objects
let students = [
  { name: "Aarav", scores: [85, 90, 78] },
  { name: "Diya", scores: [92, 88, 95] },
  { name: "Kabir", scores: [60, 55, 70] },
  { name: "Meera", scores: [45, 50, 40] },
];

// Function: add a new student to the array
function addStudent(name, scores) {
  students.push({ name, scores });
}

// Function: calculate average score for one student
function getAverage(scores) {
  const total = scores.reduce((sum, score) => sum + score, 0);
  return total / scores.length;
}

// Function: return array of { name, average } for all students
function getAllAverages() {
  return students.map((student) => ({
    name: student.name,
    average: getAverage(student.scores).toFixed(2),
  }));
}

// Function: find the top-scoring student
function getTopStudent() {
  return students.reduce((top, current) =>
    getAverage(current.scores) > getAverage(top.scores) ? current : top
  );
}

// Function: filter students who passed (average >= 60)
function getPassingStudents(passMark = 60) {
  return students
    .filter((student) => getAverage(student.scores) >= passMark)
    .map((student) => student.name);
}

// Function: sort students by average score, descending
function getRanked() {
  return [...students].sort(
    (a, b) => getAverage(b.scores) - getAverage(a.scores)
  );
}

// --- Program execution ---

addStudent("Rohan", [72, 68, 80]);

console.log("All student averages:");
console.log(getAllAverages());

console.log("\nTop student:");
console.log(getTopStudent().name);

console.log("\nPassing students (>= 60 average):");
console.log(getPassingStudents());

console.log("\nRanked list (highest to lowest):");
getRanked().forEach((s, i) => {
  console.log(`${i + 1}. ${s.name} - ${getAverage(s.scores).toFixed(2)}`);
});