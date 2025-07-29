interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-[#221122] flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-400 text-xl mb-2">
          Oops! Something went wrong
        </div>
        <div className="text-white/70 text-sm">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#c893c8] text-white px-6 py-2 rounded-lg hover:bg-[#d4a4d4] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
