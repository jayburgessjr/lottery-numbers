export default function AIReasoning({ reasoning, isLoading }) {
  if (isLoading || !reasoning) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto text-center">
      <p className="text-label mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
        Reasoning
      </p>
      <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
        {reasoning}
      </p>
    </div>
  );
}
