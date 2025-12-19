export default function AIReasoning({ reasoning, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">🤖</div>
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">AI Analysis</h3>
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded animate-pulse w-full"></div>
              <div className="h-3 bg-slate-200 rounded animate-pulse w-5/6"></div>
              <div className="h-3 bg-slate-200 rounded animate-pulse w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reasoning) {
    return null;
  }

  return (
    <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">🤖</div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wide">AI Analysis</h3>
          <p className="text-slate-600 leading-relaxed text-sm">{reasoning}</p>
        </div>
      </div>
    </div>
  );
}
