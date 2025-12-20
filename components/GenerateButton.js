export default function GenerateButton({ onClick, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full h-16 rounded-md text-body font-normal text-white transition-opacity hover:opacity-90 disabled:opacity-70"
      style={{ backgroundColor: 'var(--color-accent)' }}
    >
      {isLoading ? 'Generating...' : 'Generate Numbers'}
    </button>
  );
}
