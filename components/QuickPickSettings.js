export default function QuickPickSettings({ count, onCountChange, isLoading }) {
  const counts = [1, 3, 5, 10];

  return (
    <div>
      <label className="text-label block mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        Quantity
      </label>
      <div className="grid grid-cols-4 gap-4">
        {counts.map((num) => {
          const isSelected = count === num;
          return (
            <button
              key={num}
              onClick={() => onCountChange(num)}
              disabled={isLoading}
              className="h-14 rounded-md text-body font-normal transition-opacity hover:opacity-70 disabled:opacity-40"
              style={{
                backgroundColor: isSelected ? 'var(--color-accent-light)' : 'var(--color-bg)',
                border: isSelected ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                color: isSelected ? 'var(--color-accent)' : 'var(--color-text-primary)'
              }}
            >
              {num} {num === 1 ? 'Set' : 'Sets'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
