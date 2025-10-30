import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

function TreeCanvas({ nodes, edges }) {
  return (
    <div className="h-[500px] border border-gray-300 rounded-lg bg-white my-4">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default TreeCanvas;
