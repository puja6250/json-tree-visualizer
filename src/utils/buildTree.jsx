// utils/buildTree.js

let nodeId = 0;

function createNode(label, x, y, type = "object") {
  return {
    id: String(nodeId++),
    position: { x, y },
    data: { label },
    type,
  };
}

export default function buildTree(jsonData) {
  nodeId = 0;
  const nodes = [];
  const edges = [];
  const pathMap = {};

  let xSpacing = 250; // horizontal distance between nodes
  let ySpacing = 120; // vertical distance between levels

  function traverse(obj, depth = 0, x = 0, parent = null, path = "") {
    let nodeType =
      typeof obj === "object"
        ? Array.isArray(obj)
          ? "array"
          : "object"
        : "value";

    const node = createNode(
      path.split(".").pop() || "root",
      x,
      depth * ySpacing,
      nodeType
    );
    nodes.push(node);

    if (parent) {
      edges.push({ id: `${parent.id}-${node.id}`, source: parent.id, target: node.id });
    }

    pathMap[path] = node.id;

    if (typeof obj === "object" && obj !== null) {
      const keys = Object.keys(obj);
      keys.forEach((key, index) => {
        const childX = x + (index - (keys.length - 1) / 2) * xSpacing;
        traverse(obj[key], depth + 1, childX, node, `${path}.${key}`);
      });
    } else {
      // leaf node
      const valueNode = createNode(String(obj), x, (depth + 1) * ySpacing, "value");
      nodes.push(valueNode);
      edges.push({ id: `${node.id}-${valueNode.id}`, source: node.id, target: valueNode.id });
    }
  }

  traverse(jsonData, 0, 0, null, "root");

  return { nodes, edges, pathMap };
}
