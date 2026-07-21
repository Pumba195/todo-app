function priorityColor(p) {
  if (p >= 8) return "bg-red-100 text-red-700";
  if (p >= 4) return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
}

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      className={`flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 hover:brightness-95 transition shadow-sm ${priorityColor(
        task.priority
      )}`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task)}
          className="w-4 h-4 accent-blue-600 cursor-pointer"
        />
        <span className={task.done ? "line-through text-gray-500 text-sm" : "text-gray-800 text-sm"}>
          {task.title}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full">P{task.priority}</span>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-600 transition text-sm"
        >
          ✕
        </button>
      </div>
    </li>
  );
}