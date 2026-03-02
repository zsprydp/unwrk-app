export default function Celebration({ streak }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-12 text-center transform animate-bounce">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-2">Session Complete!</h2>
        <p className="text-lg text-gray-600">
          {streak > 0 && `${streak} day streak! `}
          Keep going!
        </p>
      </div>
    </div>
  );
}
