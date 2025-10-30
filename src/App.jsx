import { useState } from "react";
import JsonInput from "./components/JsonInput";
import TreeCanvas from "./components/TreeCanvas";
import SearchBar from "./components/SearchBar";
import buildTree from "./utils/buildTree";
import "./index.css";

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [pathMap, setPathMap] = useState({});
  const [searchResult, setSearchResult] = useState("");

  const handleVisualize = (data) => {
    const { nodes, edges, pathMap } = buildTree(data);
    setJsonData(data);
    setNodes(nodes);
    setEdges(edges);
    setPathMap(pathMap);
  };

  const handleSearch = (path) => {
    if (pathMap[path]) {
      setSearchResult(`✅ Match found: ${path}`);
    } else {
      setSearchResult("❌ No match found");
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">JSON Tree Visualizer</h1>
      <JsonInput onVisualize={handleVisualize} />
      {jsonData && (
        <>
          <SearchBar onSearch={handleSearch} />
          <p className="text-gray-700 my-2">{searchResult}</p>
          <TreeCanvas nodes={nodes} edges={edges} />
        </>
      )}
    </div>
  );
}

export default App;
