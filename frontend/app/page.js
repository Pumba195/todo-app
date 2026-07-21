"use client";

import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "../lib/api";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    refreshTasks();
  }, [search, status, sort]);

  async function refreshTasks() {
    const data = await getTasks({ search, status, sort });
    setTasks(data);
  }

  async function handleAdd(newTask) {
    await createTask(newTask);
    refreshTasks();
  }

  async function handleToggle(task) {
    await updateTask(task.id, { done: !task.done });
    refreshTasks();
  }

  async function handleDelete(id) {
    await deleteTask(id);
    refreshTasks();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="text-center my-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Todo List
          </h1>
          <p className="mt-2 text-base text-gray-500 sm:text-lg max-w-md mx-auto">
            Stay on top of what matters
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <TaskForm onAdd={handleAdd} />
          <TaskFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            sort={sort}
            setSort={setSort}
          />
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
        </div>
      </div>
    </main>
  );
}