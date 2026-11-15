
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useEffect, useState } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "./api";

const empty = { name: "", rollNo: "", email: "", department: "" };

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      setStudents(await getStudents());
      setError("");
    } catch (e) {
      setError("Could not load students: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await updateStudent(editId, form);
      else await addStudent(form);
      setForm(empty);
      setEditId(null);
      await load(); // re-fetch so the list always shows fresh data
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (id) => {
    try { await deleteStudent(id); await load(); }
    catch (e) { setError(e.message); }
  };

  const edit = (s) => {
    setEditId(s._id);
    setForm({ name: s.name, rollNo: s.rollNo, email: s.email, department: s.department });
  };

  return (
    <div style={{ maxWidth: 800, margin: "30px auto", fontFamily: "sans-serif" }}>
      <h2>Student Management System</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit} style={{ display: "grid", gap: 8, marginBottom: 20 }}>
        {Object.keys(empty).map((k) => (
          <input
            key={k}
            placeholder={k}
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            required
          />
        ))}
        <button type="submit">{editId ? "Update" : "Add"} Student</button>
      </form>

      {loading ? <p>Loading...</p> : (
        <table border="1" cellPadding="6" width="100%">
          <thead>
            <tr><th>Name</th><th>Roll No</th><th>Email</th><th>Dept</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td><td>{s.rollNo}</td><td>{s.email}</td><td>{s.department}</td>
                <td>
                  <button onClick={() => edit(s)}>Edit</button>{" "}
                  <button onClick={() => remove(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}