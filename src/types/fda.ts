export interface FDADevice {
  k_number: string;
  device_name: string;
  manufacturer: string;
  clearance_date: string;
  product_code: string;
  predicates: string[]; // Array of K-numbers
}

export interface DeviceNode {
  id: string;
  data: {
    label: string;
    device: FDADevice;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface DeviceEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export interface DeviceGraph {
  nodes: DeviceNode[];
  edges: DeviceEdge[];
} 
