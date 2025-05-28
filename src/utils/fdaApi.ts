import axios from 'axios';
import { FDADevice } from '../types/fda';

const OPENFDA_BASE_URL = 'https://api.fda.gov/device/510k.json';

export async function searchDevices(query: string): Promise<FDADevice[]> {
  try {
    const response = await axios.get(OPENFDA_BASE_URL, {
      params: {
        search: query,
        limit: 100,
      },
    });

    return response.data.results.map((result: any) => ({
      k_number: result.k_number,
      device_name: result.device_name,
      manufacturer: result.manufacturer_name,
      clearance_date: result.decision_date,
      product_code: result.product_code,
      predicates: result.predicates || [],
    }));
  } catch (error) {
    console.error('Error fetching FDA data:', error);
    return [];
  }
}

// Mock data for development
export const mockDevices: FDADevice[] = [
  {
    k_number: 'K123456',
    device_name: 'Advanced Cardiac Monitor',
    manufacturer: 'MedTech Innovations',
    clearance_date: '2023-01-15',
    product_code: 'DPS',
    predicates: ['K123455', 'K123454'],
  },
  {
    k_number: 'K123455',
    device_name: 'Cardiac Monitoring System',
    manufacturer: 'CardioTech Solutions',
    clearance_date: '2022-06-20',
    product_code: 'DPS',
    predicates: ['K123454'],
  },
  {
    k_number: 'K123454',
    device_name: 'Basic Cardiac Monitor',
    manufacturer: 'HeartCare Medical',
    clearance_date: '2021-12-10',
    product_code: 'DPS',
    predicates: [],
  },
  {
    k_number: 'K123457',
    device_name: 'Smart Insulin Pump',
    manufacturer: 'DiabetesCare Inc',
    clearance_date: '2023-03-01',
    product_code: 'LZG',
    predicates: ['K123458'],
  },
  {
    k_number: 'K123458',
    device_name: 'Standard Insulin Pump',
    manufacturer: 'DiabetesCare Inc',
    clearance_date: '2022-08-15',
    product_code: 'LZG',
    predicates: [],
  },
  {
    k_number: 'K123459',
    device_name: 'Digital X-Ray System',
    manufacturer: 'ImagingTech Corp',
    clearance_date: '2023-02-28',
    product_code: 'IZL',
    predicates: ['K123460', 'K123461'],
  },
  {
    k_number: 'K123460',
    device_name: 'Portable X-Ray Unit',
    manufacturer: 'ImagingTech Corp',
    clearance_date: '2022-11-30',
    product_code: 'IZL',
    predicates: ['K123461'],
  },
  {
    k_number: 'K123461',
    device_name: 'Basic X-Ray System',
    manufacturer: 'Radiology Solutions',
    clearance_date: '2022-01-15',
    product_code: 'IZL',
    predicates: [],
  }
];

// Mock search function for development
export function mockSearchDevices(query: string): FDADevice[] {
  const searchTerm = query.toLowerCase();
  return mockDevices.filter(device => 
    device.device_name.toLowerCase().includes(searchTerm) ||
    device.k_number.toLowerCase().includes(searchTerm) ||
    device.manufacturer.toLowerCase().includes(searchTerm) ||
    device.product_code.toLowerCase().includes(searchTerm)
  );
} 
