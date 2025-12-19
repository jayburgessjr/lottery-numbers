export default function NumberDisplay({ numbers, powerball, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-full bg-gray-200 animate-pulse flex items-center justify-center"
            >
              <span className="text-gray-400 text-sm">?</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-200 animate-pulse flex items-center justify-center">
            <span className="text-red-400 text-sm">?</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Numbers */}
      <div>
        <p className="text-sm text-gray-600 text-center mb-3 font-medium">Main Numbers</p>
        <div className="flex justify-center gap-4 flex-wrap">
          {numbers && numbers.length > 0 ? (
            numbers.map((num, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg transform transition-all duration-300 hover:scale-110"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {num}
              </div>
            ))
          ) : (
            [1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center text-gray-400 text-xl"
              >
                ?
              </div>
            ))
          )}
        </div>
      </div>

      {/* Powerball Number */}
      <div>
        <p className="text-sm text-gray-600 text-center mb-3 font-medium">Powerball</p>
        <div className="flex justify-center">
          {powerball ? (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg transform transition-all duration-300 hover:scale-110">
              {powerball}
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center text-gray-400 text-2xl">
              ?
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
