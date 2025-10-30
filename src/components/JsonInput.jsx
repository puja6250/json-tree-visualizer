import { useState } from "react";

function JsonInput({ onVisualize }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    try {
      const json = JSON.parse(input);
      onVisualize(json);
    } catch {
      alert("❌ Invalid JSON format!");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON data here...'
        className="w-full h-40 p-3 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSubmit}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Visualize JSON
      </button>
    </div>
  );
}

export default JsonInput;
