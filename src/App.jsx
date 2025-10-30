import { useState } from "react";
import JsonInput from "./components/JsonInput";
import TreeCanvas from "./components/TreeCanvas";
import SearchBar from "./components/SearchBar";
import buildTree from "./utils/buildTree";
import * as htmlToImage from "html-to-image";
import "./App.css";

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [pathMap, setPathMap] = useState({});
  const [searchResult, setSearchResult] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Build tree data
  const handleVisualize = (data) => {
    const { nodes, edges, pathMap } = buildTree(data);
    setJsonData(data);
    setNodes(nodes);
    setEdges(edges);
    setPathMap(pathMap);
  };

  // ✅ Search JSON path
  const handleSearch = (path) => {
    if (pathMap[path]) {
      setSearchResult(`✅ Match found: ${path}`);
    } else {
      setSearchResult("❌ No match found");
    }
  };

  // ✅ Clear/reset input & tree
  const handleClear = () => {
    setJsonData(null);
    setNodes([]);
    setEdges([]);
    setPathMap({});
    setSearchResult("");
  };

  // ✅ Download tree as image
  const handleDownload = () => {
    const tree = document.getElementById("tree-container");
    if (!tree) return;
    htmlToImage.toPng(tree).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "json-tree.png";
      link.href = dataUrl;
      link.click();
    });
  };

  // ✅ Copy JSON path
  const handleNodeClick = (path) => {
    navigator.clipboard.writeText(path);
    alert(`📋 Copied path: ${path}`);
  };

  // ✅ Your return should be INSIDE the function
  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center w-full mb-6">
          <h1 className="text-3xl font-bold mb-3 text-blue-500 text-center">
            JSON Tree Visualizer
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg transition ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* JSON Input Section */}
        <div className="w-full flex justify-center mb-4">
          <JsonInput onVisualize={handleVisualize} />
        </div>

        {/* Search + Buttons Section */}
        {jsonData && (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              <SearchBar onSearch={handleSearch} />
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Clear
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Download Tree
              </button>
            </div>

            <p className="my-2 text-lg font-medium">{searchResult}</p>

            {/* Tree Section */}
            <div id="tree-container">
              <TreeCanvas
                nodes={nodes}
                edges={edges}
                onNodeClick={handleNodeClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
