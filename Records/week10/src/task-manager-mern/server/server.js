require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ---- Model ----
const Task = mongoose.model(
  "Task",
  new mongoose.Schema(
    {
      title: { type: String, required: true, trim: true },
      completed: { type: Boolean, default: false },
    },
    { timestamps: true }
  )
);

// ---- Routes (CRUD) ----
app.get("/api/tasks", async (req, res) => {
  res.json(await Task.find().sort({ createdAt: -1 }));
});

app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Task.create({ title: req.body.title });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { title, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true, omitUndefined: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---- Start ----
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("DB connection error:", err.message));
