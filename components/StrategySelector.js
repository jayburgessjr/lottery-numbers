export default function StrategySelector({ selectedStrategy, onStrategyChange }) {
  const strategies = [
    {
      id: 'random',
      name: 'Random',
      icon: '🎲',
      description: 'Pure random selection'
    },
    {
      id: 'hot',
      name: 'Hot Numbers',
      icon: '🔥',
      description: 'Frequently drawn recently'
    },
    {
      id: 'cold',
      name: 'Cold Numbers',
      icon: '❄️',
      description: 'Overdue numbers'
    },
    {
      id: 'balanced',
      name: 'Balanced',
      icon: '⚖️',
      description: 'Mix of hot & cold'
    }
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-slate-700 mb-3">
        Generation Strategy
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {strategies.map(strategy => {
          const isActive = selectedStrategy === strategy.id;

          return (
            <button
              key={strategy.id}
              onClick={() => onStrategyChange(strategy.id)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-left
                ${isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }
              `}
            >
              <div className="text-2xl mb-2">{strategy.icon}</div>
              <div className={`font-semibold text-sm mb-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                {strategy.name}
              </div>
              <div className={`text-xs ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                {strategy.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
