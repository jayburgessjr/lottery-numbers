export default function MultipleSetsDisplay({ sets, strategy }) {
  const copySet = (set) => {
    const text = `${set.numbers.join(', ')} + PB ${set.powerball}`;
    navigator.clipboard.writeText(text);
  };

  const strategyLabels = {
    hot: 'Hot',
    cold: 'Cold',
    balanced: 'Balanced',
    random: 'Random'
  };

  const strategyName = strategyLabels[strategy] || 'Random';

  return (
    <div>
      <p className="text-label text-center mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
        {sets.length} {strategyName} {sets.length === 1 ? 'Set' : 'Sets'}
      </p>

      <div className="space-y-6">
        {sets.map((set, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-6 border-b"
            style={{ borderColor: index === sets.length - 1 ? 'transparent' : 'var(--color-border)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-caption" style={{ color: 'var(--color-text-tertiary)' }}>
                #{index + 1}
              </span>
              <div className="flex items-center gap-2">
                {set.numbers.map((num, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white"
                    style={{ backgroundColor: 'var(--color-text-primary)' }}
                  >
                    {num}
                  </div>
                ))}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white ml-2"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  {set.powerball}
                </div>
              </div>
            </div>
            <button
              onClick={() => copySet(set)}
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
