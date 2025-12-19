import { useState, useEffect } from 'react';
import { getStatistics, analyzeFrequency, getHotNumbers, getColdNumbers } from '../lib/historical-data';

export default function StatsDashboard() {
  const [stats, setStats] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setStats(getStatistics());
  }, []);

  if (!stats) return null;

  const { mainNumberFreq, powerballFreq } = analyzeFrequency();
  const hotNumbers = getHotNumbers(10);
  const coldNumbers = getColdNumbers(10);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-xl">📊</span>
          Historical Statistics
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-lg p-4">
          <div className="text-xs text-gray-600 mb-1">Total Drawings</div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalDrawings}</div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="text-xs text-gray-600 mb-1">Hottest Number</div>
          <div className="text-2xl font-bold text-red-600">
            {stats.mostCommonMainNumber.number}
          </div>
          <div className="text-xs text-gray-500">({stats.mostCommonMainNumber.count}x)</div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="text-xs text-gray-600 mb-1">Coldest Number</div>
          <div className="text-2xl font-bold text-blue-600">
            {stats.leastCommonMainNumber.number}
          </div>
          <div className="text-xs text-gray-500">({stats.leastCommonMainNumber.count}x)</div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="text-xs text-gray-600 mb-1">Hot Powerball</div>
          <div className="text-2xl font-bold text-purple-600">
            {stats.mostCommonPowerball.number}
          </div>
          <div className="text-xs text-gray-500">({stats.mostCommonPowerball.count}x)</div>
        </div>
      </div>

      {/* Detailed View */}
      {showDetails && (
        <div className="space-y-4 mt-4 pt-4 border-t border-indigo-200">
          {/* Hot Numbers */}
          <div className="bg-white rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>🔥</span> Top 10 Hot Numbers
            </h4>
            <div className="flex flex-wrap gap-2">
              {hotNumbers.mainNumbers.map((num, idx) => (
                <div
                  key={num}
                  className="flex flex-col items-center"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white text-sm font-bold shadow">
                    {num}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">{mainNumberFreq[num]}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cold Numbers */}
          <div className="bg-white rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>❄️</span> Top 10 Cold Numbers (Overdue)
            </h4>
            <div className="flex flex-wrap gap-2">
              {coldNumbers.mainNumbers.map((num, idx) => (
                <div
                  key={num}
                  className="flex flex-col items-center"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white text-sm font-bold shadow">
                    {num}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">{mainNumberFreq[num]}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Powerballs */}
          <div className="bg-white rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>🔥</span> Hot Powerballs
            </h4>
            <div className="flex flex-wrap gap-2">
              {hotNumbers.powerballs.map((num) => (
                <div
                  key={num}
                  className="flex flex-col items-center"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white text-sm font-bold shadow">
                    {num}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">{powerballFreq[num]}x</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> Past results don't predict future drawings. Each Powerball drawing is independent and random. Statistics are for entertainment purposes only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
