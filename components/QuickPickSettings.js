export default function QuickPickSettings({ count, onCountChange, onGenerate, isLoading }) {
  const counts = [1, 3, 5, 10];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Quick Pick:</span>
        {counts.map(num => (
          <button
            key={num}
            onClick={() => onCountChange(num)}
            disabled={isLoading}
            className={`
              px-3 py-1 rounded-md text-sm font-medium transition-all
              ${count === num
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
