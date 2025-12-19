export default function QuickPickSettings({ count, onCountChange, onGenerate, isLoading }) {
  const counts = [1, 3, 5, 10];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-700">Quick Pick:</span>
        {counts.map(num => (
          <button
            key={num}
            onClick={() => onCountChange(num)}
            disabled={isLoading}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all border
              ${count === num
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {num} {num === 1 ? 'Set' : 'Sets'}
          </button>
        ))}
      </div>
    </div>
  );
}
