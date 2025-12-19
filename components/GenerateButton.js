export default function GenerateButton({ onClick, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full max-w-md mx-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold rounded-lg shadow-sm hover:shadow-md transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900 flex items-center justify-center gap-3 border border-slate-700"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating Numbers...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Generate Numbers
        </>
      )}
    </button>
  );
}
