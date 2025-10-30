import { useState } from "react";

function JsonInput({ onVisualize }) {
  const [text, setText] = useState(
    JSON.stringify(
      {
        user: {
          name: "Puja",
          age: 23,
          address: { city: "Bhubaneswar", pin: 751024 },
        },
        items: [{ name: "Book", price: 150 }],
      },
      null,
      2
    )
  );
  const [error, setError] = useState("");

  const handleVisualize = () => {
    try {
      const parsed = JSON.parse(text);
      setError("");
      onVisualize(parsed);
    } catch {
      setError("Invalid JSON! Please check your input.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-4">
      <textarea
        className="w-full h-48 border border-gray-400 p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
      <button
        onClick={handleVisualize}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Visualize
      </button>
    </div>
  );
}

export default JsonInput;
