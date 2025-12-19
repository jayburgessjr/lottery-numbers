export default function MultipleSetsDisplay({ sets, strategy }) {
  const copySet = (set) => {
    const text = `${set.numbers.join(', ')} + PB ${set.powerball}`;
    navigator.clipboard.writeText(text);
  };

  const copyAll = () => {
    const text = sets
      .map((set, idx) => `Set ${idx + 1}: ${set.numbers.join(', ')} + PB ${set.powerball}`)
      .join('\n');
    navigator.clipboard.writeText(text);
  };

  const strategyLabels = {
    hot: { emoji: '🔥', name: 'Hot' },
    cold: { emoji: '❄️', name: 'Cold' },
    balanced: { emoji: '⚖️', name: 'Balanced' },
    random: { emoji: '🎲', name: 'Random' }
  };

  const strategyInfo = strategyLabels[strategy] || strategyLabels.random;

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-xl">{strategyInfo.emoji}</span>
          {sets.length} {strategyInfo.name} {sets.length === 1 ? 'Set' : 'Sets'}
        </h3>
        <button
          onClick={copyAll}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Copy All
        </button>
      </div>

      <div className="space-y-3">
        {sets.map((set, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-500 w-12">#{index + 1}</span>
                {set.numbers.map((num, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold shadow"
                  >
                    {num}
                  </span>
                ))}
                <span className="text-gray-400 mx-1">+</span>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white text-sm font-bold shadow">
                  {set.powerball}
                </span>
              </div>
            </div>
            <button
              onClick={() => copySet(set)}
              className="ml-3 px-3 py-1 text-xs text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
