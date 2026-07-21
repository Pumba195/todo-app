"use client";
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, priority: Number(priority) });
    setTitle("");
    setPriority(1);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border border-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        min="1"
        max="10"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        title="Priority (1-10)"
        className="w-20 border border-gray-400 rounded-lg px-3 py-2.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-5 rounded-lg text-sm"
      >
        Add
      </button>
    </form>
  );
}