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
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-label" style={{ color: 'var(--color-text-tertiary)' }}>
          Historical Data
        </p>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-caption transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <p className="text-label mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
            Drawings
          </p>
          <p className="text-headline" style={{ color: 'var(--color-text-primary)' }}>
            {stats.totalDrawings}
          </p>
        </div>
        <div>
          <p className="text-label mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
            Hottest
          </p>
          <p className="text-headline" style={{ color: 'var(--color-text-primary)' }}>
            {stats.mostCommonMainNumber.number}
          </p>
        </div>
        <div>
          <p className="text-label mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
            Coldest
          </p>
          <p className="text-headline" style={{ color: 'var(--color-text-primary)' }}>
            {stats.leastCommonMainNumber.number}
          </p>
        </div>
        <div>
          <p className="text-label mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
            Hot PB
          </p>
          <p className="text-headline" style={{ color: 'var(--color-text-primary)' }}>
            {stats.mostCommonPowerball.number}
          </p>
        </div>
      </div>

      {/* Detailed View */}
      {showDetails && (
        <div className="space-y-12 pt-12 border-t" style={{ borderColor: 'var(--color-border)' }}>
          {/* Hot Numbers */}
          <div>
            <p className="text-label mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
              Hot Numbers
            </p>
            <div className="flex flex-wrap gap-4">
              {hotNumbers.mainNumbers.map((num) => (
                <div key={num} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-white"
                    style={{ backgroundColor: 'var(--color-text-primary)' }}
                  >
                    {num}
                  </div>
                  <span className="text-caption" style={{ color: 'var(--color-text-tertiary)' }}>
                    {mainNumberFreq[num]}×
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cold Numbers */}
          <div>
            <p className="text-label mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
              Cold Numbers
            </p>
            <div className="flex flex-wrap gap-4">
              {coldNumbers.mainNumbers.map((num) => (
                <div key={num} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold"
                    style={{ backgroundColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
                  >
                    {num}
                  </div>
                  <span className="text-caption" style={{ color: 'var(--color-text-tertiary)' }}>
                    {mainNumberFreq[num]}×
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Powerballs */}
          <div>
            <p className="text-label mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
              Hot Powerballs
            </p>
            <div className="flex flex-wrap gap-4">
              {hotNumbers.powerballs.map((num) => (
                <div key={num} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-white"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    {num}
                  </div>
                  <span className="text-caption" style={{ color: 'var(--color-text-tertiary)' }}>
                    {powerballFreq[num]}×
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-caption max-w-2xl" style={{ color: 'var(--color-text-tertiary)' }}>
              Past results don't predict future drawings. Each Powerball drawing is independent and random.
              Statistics are for entertainment purposes only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
