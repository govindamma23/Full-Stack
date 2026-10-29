use("collegeDB");


db.students.drop();


db.students.insertMany([
  { rollNo: 101, name: "Ravi", branch: "CSE", marks: 85 },
  { rollNo: 102, name: "Asha", branch: "ECE", marks: 92 },
  { rollNo: 103, name: "Meera", branch: "CSE", marks: 78 },
  { rollNo: 104, name: "Kiran", branch: "IT", marks: 66 },
]);


db.students.find();                                  
db.students.findOne({ rollNo: 101 });                
db.students.find({ branch: "CSE" });                 
db.students.find({ marks: { $gt: 80 } });            
db.students.find({}, { _id: 0, name: 1, marks: 1 }); 
db.students.find().sort({ marks: -1 });             


db.students.updateOne(
  { rollNo: 101 },
  { $set: { marks: 90 } }
);

db.students.updateMany(
  { branch: "CSE" },
  { $set: { section: "A" } }
);


db.students.deleteOne({ rollNo: 104 });
db.students.deleteMany({ marks: { $lt: 70 } });


db.students.find();