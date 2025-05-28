import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FDADevice } from '../../types/fda';
import DeviceNode from '../DeviceNode';

const nodeTypes: NodeTypes = {
  device: DeviceNode,
};

interface DeviceGraphProps {
  devices: FDADevice[];
}

export default function DeviceGraph({ devices }: DeviceGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const initialNodes: Node[] = devices.map((device, index) => ({
      id: device.k_number,
      type: 'device',
      data: { label: device.device_name, device },
      position: {
        x: Math.cos(index * (2 * Math.PI / devices.length)) * 300 + 400,
        y: Math.sin(index * (2 * Math.PI / devices.length)) * 300 + 300,
      },
    }));

    const initialEdges: Edge[] = devices.flatMap((device) =>
      device.predicates
        .filter(predicate => devices.some(d => d.k_number === predicate)) // Only include edges to visible nodes
        .map((predicate) => ({
          id: `${device.k_number}-${predicate}`,
          source: device.k_number,
          target: predicate,
          animated: true,
          style: { stroke: '#60A5FA' },
        }))
    );

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [devices, setNodes, setEdges]);

  return (
    <div className="w-full h-[600px] border border-gray-700 rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-900"
      >
        <Background color="#374151" gap={16} />
        <Controls className="bg-gray-800" />
      </ReactFlow>
    </div>
  );
} 
