const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "tasks.json");

// ---- tiny JSON-file "database" ----
function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}
function save(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// ---- middleware ----
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, "public")));

// ---- REST API ----
app.get("/api/tasks", (_req, res) => res.json(load()));

app.post("/api/tasks", (req, res) => {
  const title = (req.body.title || "").trim();
  if (!title) return res.status(400).json({ error: "Title is required." });

  const tasks = load();
  const task = { id: Date.now(), title, done: false, createdAt: new Date().toISOString() };
  tasks.push(task);
  save(tasks);
  res.status(201).json(task);
});

app.patch("/api/tasks/:id", (req, res) => {
  const tasks = load();
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found." });

  if (typeof req.body.done === "boolean") task.done = req.body.done;
  if (typeof req.body.title === "string" && req.body.title.trim()) task.title = req.body.title.trim();
  save(tasks);
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const tasks = load();
  const next = tasks.filter((t) => t.id !== Number(req.params.id));
  if (next.length === tasks.length) return res.status(404).json({ error: "Task not found." });
  save(next);
  res.status(204).end();
});

// ---- error handling ----
app.use("/api", (_req, res) => res.status(404).json({ error: "Not found." }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(PORT, () => console.log(`Task tracker running at http://localhost:${PORT}`));