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
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Generation History</h3>
        <p className="text-gray-500 text-sm">No generations yet. Generate your first set of numbers!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4">Generation History</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {item.numbers.map((num, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold"
                  >
                    {num}
                  </span>
                ))}
                <span className="text-gray-400 mx-1">+</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                  {item.powerball}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">{formatTimestamp(item.timestamp)}</p>
            </div>
            <button
              onClick={() => copyToClipboard(item.numbers, item.powerball)}
              className="ml-3 px-3 py-1 text-xs text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
              title="Copy to clipboard"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
