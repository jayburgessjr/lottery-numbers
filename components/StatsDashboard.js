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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="text-xl">📊</span>
          Historical Statistics
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-1 rounded-md hover:bg-slate-50 transition-colors"
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-2 font-semibold">Total Drawings</div>
          <div className="text-3xl font-bold text-slate-900">{stats.totalDrawings}</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-2 font-semibold">Hottest Number</div>
          <div className="text-3xl font-bold text-slate-900">
            {stats.mostCommonMainNumber.number}
          </div>
          <div className="text-xs text-slate-500 mt-1">Drawn {stats.mostCommonMainNumber.count}×</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-2 font-semibold">Coldest Number</div>
          <div className="text-3xl font-bold text-slate-900">
            {stats.leastCommonMainNumber.number}
          </div>
          <div className="text-xs text-slate-500 mt-1">Drawn {stats.leastCommonMainNumber.count}×</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-2 font-semibold">Hot Powerball</div>
          <div className="text-3xl font-bold text-slate-900">
            {stats.mostCommonPowerball.number}
          </div>
          <div className="text-xs text-slate-500 mt-1">Drawn {stats.mostCommonPowerball.count}×</div>
        </div>
      </div>

      {/* Detailed View */}
      {showDetails && (
        <div className="space-y-4 mt-6 pt-6 border-t border-slate-200">
          {/* Hot Numbers */}
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
              <span>🔥</span> Top 10 Hot Numbers
            </h4>
            <div className="flex flex-wrap gap-3">
              {hotNumbers.mainNumbers.map((num, idx) => (
                <div
                  key={num}
                  className="flex flex-col items-center"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-slate-900 text-white text-sm font-bold shadow-sm">
                    {num}
                  </span>
                  <span className="text-xs text-slate-500 mt-1.5 font-medium">{mainNumberFreq[num]}×</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cold Numbers */}
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
              <span>❄️</span> Top 10 Cold Numbers (Overdue)
            </h4>
            <div className="flex flex-wrap gap-3">
              {coldNumbers.mainNumbers.map((num, idx) => (
                <div
                  key={num}
                  className="flex flex-col items-center"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-slate-300 text-slate-700 text-sm font-bold shadow-sm">
                    {num}
                  </span>
                  <span className="text-xs text-slate-500 mt-1.5 font-medium">{mainNumberFreq[num]}×</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Powerballs */}
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
              <span>🔥</span> Hot Powerballs
            </h4>
            <div className="flex flex-wrap gap-3">
              {hotNumbers.powerballs.map((num) => (
                <div
                  key={num}
                  className="flex flex-col items-center"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-rose-600 text-white text-sm font-bold shadow-sm">
                    {num}
                  </span>
                  <span className="text-xs text-slate-500 mt-1.5 font-medium">{powerballFreq[num]}×</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong className="font-semibold">Disclaimer:</strong> Past results don't predict future drawings. Each Powerball drawing is independent and random. Statistics are for entertainment purposes only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
