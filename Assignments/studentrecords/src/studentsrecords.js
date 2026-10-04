use("collegeDB");
 

db.createCollection("students");
 

db.students.deleteMany({});
 

db.students.insertMany([
  { rollNo: "23CM001", name: "Ravi Kumar",    branch: "CSE-AIML", year: 3, marks: 85, email: "ravi@example.com" },
  { rollNo: "23CM002", name: "Sneha Reddy",   branch: "CSE-AIML", year: 3, marks: 92, email: "sneha@example.com" },
  { rollNo: "23CM003", name: "Arjun Varma",   branch: "CSE",      year: 2, marks: 68, email: "arjun@example.com" },
  { rollNo: "23CM004", name: "Priya Sharma",  branch: "ECE",      year: 3, marks: 77, email: "priya@example.com" },
  { rollNo: "23CM005", name: "Kiran Babu",    branch: "CSE",      year: 4, marks: 45, email: "kiran@example.com" },
  { rollNo: "23CM006", name: "Lakshmi Devi",  branch: "IT",       year: 2, marks: 88, email: "lakshmi@example.com" },
  { rollNo: "23CM007", name: "Manoj Naidu",   branch: "ECE",      year: 1, marks: 59, email: "manoj@example.com" },
  { rollNo: "23CM008", name: "Divya Rao",     branch: "CSE-AIML", year: 2, marks: 73, email: "divya@example.com" },
  { rollNo: "23CM009", name: "Suresh Raju",   branch: "IT",       year: 4, marks: 48, email: "suresh@example.com" },
  { rollNo: "23CM010", name: "Anitha Kumari", branch: "CSE",      year: 3, marks: 81, email: "anitha@example.com" }
]);
 

db.students.find().pretty();
 

db.students.find({ branch: "CSE-AIML" });
 

db.students.find({ marks: { $gt: 75 } });
 

db.students.find({ rollNo: "23CM004" });

db.students.findOne({ rollNo: "23CM004" });
)
db.students.find({ year: 3 });                                  
db.students.find({ marks: { $gte: 60, $lte: 80 } });            
db.students.find({ year: 3, marks: { $gt: 80 } });              
db.students.find({ $or: [{ branch: "IT" }, { marks: { $lt: 50 } }] }); // OR
 

db.students.updateOne({ rollNo: "23CM005" }, { $set: { marks: 55 } });
 

db.students.updateOne({ rollNo: "23CM003" }, { $set: { email: "arjun.varma@example.com" } });
db.students.updateOne({ rollNo: "23CM007" }, { $set: { branch: "CSE" } });
db.students.find({ rollNo: { $in: ["23CM003", "23CM005", "23CM007"] } });
 

db.students.deleteOne({ rollNo: "23CM009" });
db.students.find({ rollNo: "23CM009" });   // returns nothing
 

db.students.find().sort({ marks: -1 });
 

db.students.createIndex({ rollNo: 1 }, { unique: true });
db.students.getIndexes();
 

db.studentsBig.drop();
const bulk = [];
for (let i = 1; i <= 100000; i++) {
  bulk.push({
    rollNo: "R" + String(i).padStart(6, "0"),
    name: "Student " + i,
    branch: ["CSE", "CSE-AIML", "ECE", "IT"][i % 4],
    year: (i % 4) + 1,
    marks: Math.floor(Math.random() * 101),
    email: "student" + i + "@example.com"
  });
}
db.studentsBig.insertMany(bulk);
 
// (a) WITHOUT index -> COLLSCAN: scans all 100000 documents
let before = db.studentsBig.find({ rollNo: "R099999" }).explain("executionStats");
print("WITHOUT INDEX");
print("  stage              :", before.queryPlanner.winningPlan.stage);
print("  docs examined      :", before.executionStats.totalDocsExamined);
print("  time (ms)          :", before.executionStats.executionTimeMillis);
 
// (b) Create the index
db.studentsBig.createIndex({ rollNo: 1 });
 
// (c) WITH index -> IXSCAN: examines just 1 document
let after = db.studentsBig.find({ rollNo: "R099999" }).explain("executionStats");
print("WITH INDEX");
print("  stage              :", after.queryPlanner.winningPlan.stage,
      "->", after.queryPlanner.winningPlan.inputStage.stage);
print("  docs examined      :", after.executionStats.totalDocsExamined);
print("  time (ms)          :", after.executionStats.executionTimeMillis);
 

 

db.students.find({ marks: { $gt: 80 } });
 
db.students.find({ marks: { $lt: 50 } });
db.students.find().sort({ marks: -1 }).limit(1);
 

db.students.find({ branch: "CSE" });
 

db.students.find().sort({ marks: -1 });
 

db.students.aggregate([
  { $group: { _id: "$branch", avgMarks: { $avg: "$marks" }, count: { $sum: 1 } } },
  { $sort: { avgMarks: -1 } }
]);
 