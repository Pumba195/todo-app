export default function TaskFilters({ search, setSearch, status, setStatus, sort, setSort }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 min-w-[150px] border border-gray-400 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-400 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="undone">Undone</option>
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-gray-400 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Sort: none</option>
        <option value="asc">Priority ↑</option>
        <option value="desc">Priority ↓</option>
      </select>
    </div>
  );
}