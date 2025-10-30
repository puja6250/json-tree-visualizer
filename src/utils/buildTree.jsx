let id = 0;

function buildTree(data) {
  const nodes = [];
  const edges = [];
  const pathMap = {};

  function traverse(value, parentId = null, path = "$") {
    const nodeId = `${id++}`;
    pathMap[path] = nodeId;

    let label;
    let typeColor = "#60a5fa"; // default blue for objects

    if (Array.isArray(value)) {
      label = "Array";
      typeColor = "#22c55e"; // green
    } else if (typeof value === "object" && value !== null) {
      label = "Object";
      typeColor = "#6366f1"; // purple
    } else {
      label = `${value}`;
      typeColor = "#f59e0b"; // orange
    }

    nodes.push({
      id: nodeId,
      data: { label: `${path}: ${label}` },
      position: { x: Math.random() * 500, y: id * 60 },
      style: {
        border: "1px solid #999",
        padding: 10,
        borderRadius: 8,
        backgroundColor: typeColor,
        color: "white",
      },
    });

    if (parentId) edges.push({ id: `${parentId}-${nodeId}`, source: parentId, target: nodeId });

    if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([key, val]) => {
        const newPath = Array.isArray(value) ? `${path}[${key}]` : `${path}.${key}`;
        traverse(val, nodeId, newPath);
      });
    }
  }

  traverse(data);
  return { nodes, edges, pathMap };
}

export default buildTree;
