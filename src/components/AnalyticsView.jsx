import { TrendingUp, CalendarIcon, Award } from './icons';

export default function AnalyticsView({ darkMode, isPremium, analytics, onShowAuth }) {
  const stats = [
    { label: 'Efficiency Rate', value: `${analytics.efficiency}%`, icon: <TrendingUp /> },
    { label: 'Total Focus Time', value: `${analytics.totalMinutes} min`, icon: <CalendarIcon /> },
    {
      label: 'Weekly Forecast',
      value: `${analytics.weeklyForecast} min`,
      icon: <TrendingUp />,
    },
    { label: 'Best Time', value: analytics.bestTime, icon: <Award /> },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-light ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Your Progress
        </h2>
        {isPremium && (
          <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            Premium
          </span>
        )}
      </div>

      {!isPremium ? (
        <div
          className={`p-8 rounded-2xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/60'} backdrop-blur-lg text-center`}
        >
          <div className="text-4xl mb-4">📊</div>
          <h3
            className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}
          >
            Unlock Analytics
          </h3>
          <p className={`text-sm mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Track your productivity, see trends, and optimize your focus time
          </p>
          <button
            onClick={onShowAuth}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 transition-transform"
          >
            Upgrade to Premium
          </button>
        </div>
      ) : (
        <>
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/60'} backdrop-blur-lg flex items-center justify-between hover:scale-102 transition-transform`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${darkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-indigo-100 text-indigo-600'}`}
                >
                  {stat.icon}
                </div>
                <div>
                  <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {stat.label}
                  </div>
                  <div
                    className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}
                  >
                    {stat.value}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
