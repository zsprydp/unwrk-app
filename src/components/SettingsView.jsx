import soundOptions from '../lib/soundOptions';

export default function SettingsView({ darkMode, settings, onUpdateSettings }) {
  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-light mb-6 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
        Settings
      </h2>

      <div
        className={`p-6 rounded-2xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/60'} backdrop-blur-lg space-y-4`}
      >
        <div>
          <label className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-2 block`}>
            Focus Duration (minutes)
          </label>
          <input
            type="number"
            value={settings.focusDuration}
            onChange={(e) =>
              onUpdateSettings({ ...settings, focusDuration: parseInt(e.target.value) })
            }
            className={`w-full p-3 rounded-xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-800'} border-0 focus:ring-2 focus:ring-indigo-500`}
          />
        </div>

        <div>
          <label className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-2 block`}>
            Short Break (minutes)
          </label>
          <input
            type="number"
            value={settings.shortBreak}
            onChange={(e) =>
              onUpdateSettings({ ...settings, shortBreak: parseInt(e.target.value) })
            }
            className={`w-full p-3 rounded-xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-800'} border-0 focus:ring-2 focus:ring-indigo-500`}
          />
        </div>

        <div>
          <label className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-2 block`}>
            Long Break (minutes)
          </label>
          <input
            type="number"
            value={settings.longBreak}
            onChange={(e) => onUpdateSettings({ ...settings, longBreak: parseInt(e.target.value) })}
            className={`w-full p-3 rounded-xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-800'} border-0 focus:ring-2 focus:ring-indigo-500`}
          />
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <label
            className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-3 block`}
          >
            🎯 Focus Sound
          </label>
          <select
            value={settings.focusSound}
            onChange={(e) => onUpdateSettings({ ...settings, focusSound: e.target.value })}
            className={`w-full p-3 rounded-xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-800'} border-0 focus:ring-2 focus:ring-indigo-500`}
          >
            {soundOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name} - {option.desc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-3 block`}
          >
            ☕ Break Sound
          </label>
          <select
            value={settings.breakSound}
            onChange={(e) => onUpdateSettings({ ...settings, breakSound: e.target.value })}
            className={`w-full p-3 rounded-xl ${darkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-800'} border-0 focus:ring-2 focus:ring-indigo-500`}
          >
            {soundOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name} - {option.desc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Smart Suggestions
          </span>
          <button
            onClick={() =>
              onUpdateSettings({ ...settings, smartSuggestion: !settings.smartSuggestion })
            }
            className={`w-12 h-6 rounded-full transition-colors ${settings.smartSuggestion ? 'bg-indigo-600' : 'bg-slate-300'}`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transform transition-transform ${settings.smartSuggestion ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Soft Blocking
          </span>
          <button
            onClick={() => onUpdateSettings({ ...settings, softBlocking: !settings.softBlocking })}
            className={`w-12 h-6 rounded-full transition-colors ${settings.softBlocking ? 'bg-indigo-600' : 'bg-slate-300'}`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transform transition-transform ${settings.softBlocking ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
