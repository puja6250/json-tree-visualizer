import { useState } from "react";

function SearchBar({ onSearch }) {
  const [path, setPath] = useState("");

  const handleSearch = () => {
    if (path.trim()) onSearch(path);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        value={path}
        onChange={(e) => setPath(e.target.value)}
        placeholder="Enter JSON path (e.g., user.name)"
        className="border border-gray-400 rounded px-3 py-2 w-60"
      />
      <button
        onClick={handleSearch}
        className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
