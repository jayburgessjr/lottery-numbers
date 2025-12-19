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
    <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2 uppercase tracking-wide">
          <span className="text-xl">{strategyInfo.emoji}</span>
          {sets.length} {strategyInfo.name} {sets.length === 1 ? 'Set' : 'Sets'}
        </h3>
        <button
          onClick={copyAll}
          className="text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-1.5 rounded-md hover:bg-white border border-slate-200 transition-colors"
        >
          Copy All
        </button>
      </div>

      <div className="space-y-3">
        {sets.map((set, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-sm transition-all group border border-slate-100"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-400 w-8">#{index + 1}</span>
                {set.numbers.map((num, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 text-white text-sm font-bold shadow-sm"
                  >
                    {num}
                  </span>
                ))}
                <span className="text-slate-300 mx-1">+</span>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-600 text-white text-sm font-bold shadow-sm">
                  {set.powerball}
                </span>
              </div>
            </div>
            <button
              onClick={() => copySet(set)}
              className="ml-3 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors opacity-0 group-hover:opacity-100"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
