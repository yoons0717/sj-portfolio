export default function LoadingState() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center gaming-grid-bg" style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}>
      <div className="flex flex-col items-center space-y-6 gaming-card">
        <div className="relative">
          <div className="animate-spin w-16 h-16 border-4 border-accent border-t-transparent"></div>
          <div className="absolute inset-0 animate-ping w-16 h-16 border-4 border-neon-yellow border-t-transparent opacity-20"></div>
        </div>
        <div className="gaming-title text-xl animate-pulse">LOADING SYSTEM...</div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-accent animate-bounce"></div>
          <div className="w-2 h-2 bg-accent animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-accent animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
