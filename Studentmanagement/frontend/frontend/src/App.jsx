
import { useEffect, useState } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "./api";
import "./App.css";

const empty = { name: "", rollNo: "", email: "", department: "" };

const labels = {
  name: "Full name",
  rollNo: "Roll number",
  email: "Email address",
  department: "Department",
};

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

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await updateStudent(editId, form);
      else await addStudent(form);
      setForm(empty);
      setEditId(null);
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await deleteStudent(id);
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const edit = (s) => {
    setEditId(s._id);
    setForm({
      name: s.name,
      rollNo: s.rollNo,
      email: s.email,
      department: s.department,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancel = () => {
    setEditId(null);
    setForm(empty);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Student Management System</h1>
        <p>React · Express · MongoDB Atlas</p>
      </div>

      {error && <div className="alert">{error}</div>}

      <div className="card">
        <h2>{editId ? "Edit Student" : "Add New Student"}</h2>
        <form className="form-grid" onSubmit={submit}>
          {Object.keys(empty).map((k) => (
            <input
              key={k}
              type={k === "email" ? "email" : "text"}
              placeholder={labels[k]}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              required
            />
          ))}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editId ? "Update Student" : "Add Student"}
            </button>
            {editId && (
              <button type="button" className="btn btn-secondary" onClick={cancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <div className="table-header">
          <h2>Student Records</h2>
          <span className="badge">{students.length} students</span>
        </div>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : students.length === 0 ? (
          <p className="empty">No students yet. Add one above.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.rollNo}</td>
                    <td>{s.email}</td>
                    <td>{s.department}</td>
                    <td>
                      <button className="btn btn-edit" onClick={() => edit(s)}>
                        Edit
                      </button>
                      <button className="btn btn-delete" onClick={() => remove(s._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}