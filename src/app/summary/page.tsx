export default function SummaryPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
          📊 Competition Summary
        </h1>
        <p className="text-gray-600 text-lg">
          Track your progress and see how you're doing in the campero competition!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Coming Soon Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
          <p className="text-gray-600">
            Detailed analytics and progress tracking will be available here soon!
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Your Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Day 1</span>
              <span className="text-green-600 font-medium">2/5 ✓</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Day 2-7</span>
              <span className="text-gray-400">Upcoming</span>
            </div>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🏆 Leaderboard</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🥇</span>
              <span className="text-sm text-gray-600">Top scorer will appear here</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">🥈</span>
              <span className="text-sm text-gray-400">Second place</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">🥉</span>
              <span className="text-sm text-gray-400">Third place</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            💡 <strong>Tip:</strong> Complete more ratings to see detailed statistics and comparisons!
          </p>
        </div>
      </div>
    </div>
  );
}
