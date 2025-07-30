interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center gaming-grid-bg" style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}>
      <div className="text-center gaming-card max-w-md">
        <div className="text-error text-2xl font-black tracking-wider mb-6 animate-pulse">
          SYSTEM ERROR!
        </div>
        <div className="gaming-secondary-text text-sm mb-6 bg-surface-elevated p-4 border-l-4 border-error">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="gaming-button bg-gradient-to-r from-error to-neon-purple hover:from-neon-yellow hover:to-error"
        >
          RETRY SYSTEM
        </button>
      </div>
    </div>
  );
}
