const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function getTasks({ search, status, sort }) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status !== "all") params.append("status", status);
  if (sort) params.append("sort", sort);

  const res = await fetch(`${API_URL}/tasks?${params.toString()}`);
  return res.json();
}

export async function createTask({ title, priority }) {
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, priority }),
  });
}

export async function updateTask(id, changes) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
}

export async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
}