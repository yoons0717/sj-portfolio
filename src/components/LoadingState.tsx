export default function LoadingState() {
  return (
    <div className="min-h-screen bg-[#221122] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c893c8]"></div>
        <div className="text-white text-lg">Loading ...</div>
      </div>
    </div>
  );
}
