import { useEffect, useState } from 'react';

export default function HistoryList() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const saved = localStorage.getItem('powerball_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
  };

  const copyToClipboard = (numbers, powerball) => {
    const text = `${numbers.join(', ')} + PB ${powerball}`;
    navigator.clipboard.writeText(text);
  };

  // Refresh when window receives focus (to update from other tabs)
  useEffect(() => {
    const handleFocus = () => loadHistory();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (history.length === 0) {
    return (
      <div>
        <p className="text-label mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
          History
        </p>
        <p className="text-body text-center" style={{ color: 'var(--color-text-secondary)' }}>
          No generations yet. Generate your first set of numbers.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-label mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
        History
      </p>
      <div className="space-y-6">
        {history.slice(0, 10).map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-6 border-b"
            style={{ borderColor: index === Math.min(9, history.length - 1) ? 'transparent' : 'var(--color-border)' }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {item.numbers.map((num, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                    style={{ backgroundColor: 'var(--color-text-primary)' }}
                  >
                    {num}
                  </div>
                ))}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white ml-1"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  {item.powerball}
                </div>
              </div>
              <p className="text-caption" style={{ color: 'var(--color-text-tertiary)' }}>
                {formatTimestamp(item.timestamp)}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(item.numbers, item.powerball)}
              className="text-caption transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline' }}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
