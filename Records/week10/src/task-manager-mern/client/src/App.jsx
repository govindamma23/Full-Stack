import { useEffect, useState } from "react";

const API = "/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const load = async () => {
    const res = await fetch(API);
    setTasks(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    load();
  };

  const update = async (id, body) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    load();
  };

  const remove = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  };

  const saveEdit = async (id) => {
    if (editText.trim()) await update(id, { title: editText });
    setEditId(null);
  };

  const done = tasks.filter((t) => t.completed).length;

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <p className="count">{done} of {tasks.length} completed</p>

      <form onSubmit={addTask} className="add">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t._id} className={t.completed ? "done" : ""}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => update(t._id, { completed: !t.completed })}
            />
            {editId === t._id ? (
              <input
                className="edit"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(t._id)}
                autoFocus
              />
            ) : (
              <span>{t.title}</span>
            )}
            <div className="actions">
              {editId === t._id ? (
                <button onClick={() => saveEdit(t._id)}>Save</button>
              ) : (
                <button onClick={() => { setEditId(t._id); setEditText(t.title); }}>Edit</button>
              )}
              <button className="del" onClick={() => remove(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p className="empty">No tasks yet. Add one above!</p>}
    </div>
  );
}
