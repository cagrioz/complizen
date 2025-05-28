import { Handle, Position } from 'reactflow';
import { FDADevice } from '../../types/fda';

interface DeviceNodeProps {
  data: {
    label: string;
    device: FDADevice;
  };
}

export default function DeviceNode({ data }: DeviceNodeProps) {
  const { device } = data;

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-gray-800 border-2 border-gray-700">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex flex-col">
        <div className="font-bold text-sm text-white">{device.device_name}</div>
        <div className="text-xs text-gray-400">K-Number: {device.k_number}</div>
        <div className="text-xs text-gray-400">Manufacturer: {device.manufacturer}</div>
        <div className="text-xs text-gray-400">
          Cleared: {new Date(device.clearance_date).toLocaleDateString()}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
} 
