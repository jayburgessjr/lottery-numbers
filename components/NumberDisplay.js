export default function NumberDisplay({ numbers, powerball, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 animate-pulse flex items-center justify-center border border-slate-200"
            >
              <span className="text-slate-300 text-sm">?</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 animate-pulse flex items-center justify-center border border-slate-200">
            <span className="text-slate-300 text-sm">?</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      {/* Main Numbers */}
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500 text-center mb-4 font-semibold">Main Numbers</p>
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
          {numbers && numbers.length > 0 ? (
            numbers.map((num, index) => (
              <div
                key={index}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl sm:text-2xl font-bold shadow-md border-2 border-slate-700 transition-transform duration-200 hover:scale-105"
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
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-300 text-xl"
              >
                ?
              </div>
            ))
          )}
        </div>
      </div>

      {/* Powerball Number */}
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500 text-center mb-4 font-semibold">Powerball</p>
        <div className="flex justify-center">
          {powerball ? (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-md border-2 border-rose-500 transition-transform duration-200 hover:scale-105">
              {powerball}
            </div>
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-300 text-2xl">
              ?
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
