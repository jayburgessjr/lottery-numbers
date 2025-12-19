export default function StrategySelector({ selectedStrategy, onStrategyChange }) {
  const strategies = [
    {
      id: 'random',
      name: 'Random',
      icon: '🎲',
      description: 'Pure random selection',
      color: 'purple'
    },
    {
      id: 'hot',
      name: 'Hot Numbers',
      icon: '🔥',
      description: 'Frequently drawn recently',
      color: 'red'
    },
    {
      id: 'cold',
      name: 'Cold Numbers',
      icon: '❄️',
      description: 'Overdue numbers',
      color: 'blue'
    },
    {
      id: 'balanced',
      name: 'Balanced',
      icon: '⚖️',
      description: 'Mix of hot & cold',
      color: 'green'
    }
  ];

  const colorClasses = {
    purple: {
      active: 'bg-purple-100 border-purple-500 text-purple-900',
      hover: 'hover:bg-purple-50 hover:border-purple-300'
    },
    red: {
      active: 'bg-red-100 border-red-500 text-red-900',
      hover: 'hover:bg-red-50 hover:border-red-300'
    },
    blue: {
      active: 'bg-blue-100 border-blue-500 text-blue-900',
      hover: 'hover:bg-blue-50 hover:border-blue-300'
    },
    green: {
      active: 'bg-green-100 border-green-500 text-green-900',
      hover: 'hover:bg-green-50 hover:border-green-300'
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Generation Strategy
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {strategies.map(strategy => {
          const isActive = selectedStrategy === strategy.id;
          const colors = colorClasses[strategy.color];

          return (
            <button
              key={strategy.id}
              onClick={() => onStrategyChange(strategy.id)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-left
                ${isActive ? colors.active : `border-gray-200 ${colors.hover}`}
              `}
            >
              <div className="text-2xl mb-1">{strategy.icon}</div>
              <div className="font-semibold text-sm">{strategy.name}</div>
              <div className="text-xs text-gray-600 mt-1">{strategy.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
