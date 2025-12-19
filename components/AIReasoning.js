export default function AIReasoning({ reasoning, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🤖</div>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-gray-800">AI Reasoning</h3>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-4/6"></div>
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
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200 shadow-md">
      <div className="flex items-start gap-3">
        <div className="text-2xl">🤖</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-2">AI Reasoning</h3>
          <p className="text-gray-700 leading-relaxed">{reasoning}</p>
        </div>
      </div>
    </div>
  );
}
