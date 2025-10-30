import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim());
  };

  return (
    <div className="my-3">
      <input
        type="text"
        placeholder="Search JSON path (e.g., user.address.city)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-400 p-2 rounded w-80"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
