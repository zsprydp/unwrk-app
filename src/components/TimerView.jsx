import { Play, Pause, RotateCcw, Plus } from './icons';
import SoundPanel from './SoundPanel';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function TimerView({
  mode,
  timeLeft,
  isActive,
  currentTask,
  sessionCount,
  darkMode,
  settings,
  suggestion,
  soundEnabled,
  audioUnlocked,
  isPremium,
  streak,
  totalSessions,
  onSwitchMode,
  onToggleTimer,
  onResetTimer,
  onShowTaskInput,
  onShowNoteInput,
  onToggleSound,
  onSelectSound,
  onShowUpgrade,
}) {
  return (
    <div className="space-y-6">
      <div
        className={`flex gap-2 p-2 rounded-2xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-lg`}
      >
        <button
          onClick={() => onSwitchMode('focus')}
          className={`flex-1 py-2 rounded-xl text-sm transition-all ${
            mode === 'focus'
              ? 'bg-blue-500 text-white'
              : darkMode
                ? 'text-slate-300'
                : 'text-slate-700'
          }`}
        >
          Focus
        </button>
        <button
          onClick={() => onSwitchMode('shortBreak')}
          className={`flex-1 py-2 rounded-xl text-sm transition-all ${
            mode === 'shortBreak'
              ? 'bg-green-500 text-white'
              : darkMode
                ? 'text-slate-300'
                : 'text-slate-700'
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => onSwitchMode('longBreak')}
          className={`flex-1 py-2 rounded-xl text-sm transition-all ${
            mode === 'longBreak'
              ? 'bg-teal-500 text-white'
              : darkMode
                ? 'text-slate-300'
                : 'text-slate-700'
          }`}
        >
          Long Break
        </button>
      </div>

      <SoundPanel
        mode={mode}
        darkMode={darkMode}
        soundEnabled={soundEnabled}
        audioUnlocked={audioUnlocked}
        settings={settings}
        isPremium={isPremium}
        onToggleSound={onToggleSound}
        onSelectSound={onSelectSound}
        onShowUpgrade={onShowUpgrade}
      />

      {mode === 'focus' && settings.smartSuggestion && (
        <div
          className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-lg text-center`}
        >
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            💡 Suggested: {suggestion} min
          </p>
        </div>
      )}

      <div
        className={`p-12 rounded-3xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/60'} backdrop-blur-lg shadow-2xl`}
      >
        <div className="text-center">
          <div
            className={`text-7xl font-light mb-6 ${darkMode ? 'text-white' : 'text-slate-800'} tracking-tight`}
          >
            {formatTime(timeLeft)}
          </div>

          {currentTask && (
            <div className={`mb-6 p-4 rounded-xl ${darkMode ? 'bg-slate-700/50' : 'bg-white/50'}`}>
              <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {currentTask}
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={onToggleTimer}
              className={`p-6 rounded-full ${
                isActive
                  ? 'bg-red-500 hover:bg-red-600'
                  : darkMode
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white shadow-xl hover:scale-105 transition-transform`}
            >
              {isActive ? <Pause /> : <Play />}
            </button>

            <button
              onClick={onResetTimer}
              className={`p-6 rounded-full ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-gray-100'} ${darkMode ? 'text-white' : 'text-slate-700'} shadow-xl hover:scale-105 transition-transform`}
            >
              <RotateCcw />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onShowTaskInput}
          className={`flex-1 p-4 rounded-2xl ${darkMode ? 'bg-slate-800/50 text-white' : 'bg-white/60 text-slate-700'} backdrop-blur-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform`}
        >
          <Plus />
          Set Task
        </button>

        <button
          onClick={onShowNoteInput}
          className={`flex-1 p-4 rounded-2xl ${darkMode ? 'bg-slate-800/50 text-white' : 'bg-white/60 text-slate-700'} backdrop-blur-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform`}
        >
          <Plus />
          Quick Note
        </button>
      </div>

      <div
        className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-lg`}
      >
        <div className="flex justify-around text-center">
          <div>
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              {streak}
            </div>
            <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Day Streak
            </div>
          </div>
          <div>
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              {sessionCount}
            </div>
            <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Today</div>
          </div>
          <div>
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              {totalSessions}
            </div>
            <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}
