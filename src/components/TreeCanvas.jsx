import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

function TreeCanvas({ nodes, edges, onNodeClick }) {
  const [nodeState, , onNodesChange] = useNodesState(nodes);
  const [edgeState, , onEdgesChange] = useEdgesState(edges);

  return (
    <div
      style={{
        width: "90%",
        height: "550px",
        margin: "0 auto", // centers the tree horizontally
        background: "#f9fafb",
        borderRadius: "12px",
        padding: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {nodes.length > 0 ? (
        <ReactFlow
          nodes={nodeState.map((n) => ({
            ...n,
            data: {
              ...n.data,
              label: (
                <div
                  onClick={() => onNodeClick(n.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#2563eb",
                    color: "white",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {n.data.label}
                </div>
              ),
            },
          }))}
          edges={edgeState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <MiniMap nodeColor="#2563eb" />
          <Background variant="dots" gap={12} size={1} />
          <Controls />
        </ReactFlow>
      ) : (
        <p style={{ color: "#6b7280" }}>No tree to display yet...</p>
      )}
    </div>
  );
}

export default TreeCanvas;
