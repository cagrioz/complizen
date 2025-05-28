'use client';

import { useState, KeyboardEvent } from 'react';
import DeviceGraph from '../components/DeviceGraph';
import { mockSearchDevices, mockDevices } from '../utils/fdaApi';
import { FDADevice } from '../types/fda';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [devices, setDevices] = useState<FDADevice[]>(mockDevices);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setDevices(mockDevices);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const results = mockSearchDevices(searchQuery);
      if (results.length === 0) {
        setError('No devices found matching your search criteria.');
      }
      setDevices(results);
    } catch (error) {
      console.error('Error searching devices:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className="min-h-screen p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">FDA 510(k) Device Graph</h1>
        
        <div className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search by device name, K-number, manufacturer, or product code..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-red-400 text-sm">{error}</p>
          )}
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg p-4">
          <DeviceGraph devices={devices} />
        </div>

        <div className="mt-8 text-sm text-gray-400">
          <p>Showing {devices.length} devices</p>
          <p className="mt-2">
            Note: This is a prototype visualization of FDA 510(k) device relationships.
            Data is currently using mock data for demonstration purposes.
          </p>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-blue-400 mb-2">Search Tips:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Search by device name (e.g., "Cardiac")</li>
              <li>Search by K-number (e.g., "K123")</li>
              <li>Search by manufacturer (e.g., "MedTech")</li>
              <li>Search by product code (e.g., "DPS")</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
