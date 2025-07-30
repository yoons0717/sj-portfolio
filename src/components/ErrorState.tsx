interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-center">
        <div className="text-error text-xl mb-2">
          Oops! Something went wrong
        </div>
        <div className="text-secondary text-sm">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-accent text-primary px-6 py-2 rounded-lg hover:bg-accent-light transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
