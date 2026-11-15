const API = import.meta.env.VITE_API_URL;

export const getStudents = async () => {
  const res = await fetch(`${API}/api/students`);
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  return res.json();
};

export const addStudent = async (data) => {
  const res = await fetch(`${API}/api/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
};

export const updateStudent = async (id, data) => {
  const res = await fetch(`${API}/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
};

export const deleteStudent = async (id) => {
  const res = await fetch(`${API}/api/students/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
};