import { Volume2, VolumeX } from './icons';
import soundOptions from '../lib/soundOptions';

export default function SoundPanel({
  mode,
  darkMode,
  soundEnabled,
  audioUnlocked,
  settings,
  isPremium,
  onToggleSound,
  onSelectSound,
  onShowUpgrade,
}) {
  return (
    <div
      className={`p-4 rounded-2xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-lg`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {mode === 'focus' ? '🎯 Focus Sound' : '☕ Break Sound'}
        </span>
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-lg transition-colors ${
            soundEnabled
              ? darkMode
                ? 'bg-purple-600 text-white'
                : 'bg-indigo-600 text-white'
              : darkMode
                ? 'bg-slate-700 text-slate-400'
                : 'bg-slate-200 text-slate-600'
          }`}
        >
          {soundEnabled ? <Volume2 /> : <VolumeX />}
        </button>
      </div>

      {!audioUnlocked && (
        <div
          className={`mb-3 p-3 rounded-lg ${darkMode ? 'bg-amber-900/20 border border-amber-700/30' : 'bg-amber-50 border border-amber-200'}`}
        >
          <p className={`text-xs ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
            📱 Tap the volume button above to enable sound on your device
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {soundOptions.map((option) => {
          const isSelected =
            mode === 'focus'
              ? settings.focusSound === option.id
              : settings.breakSound === option.id;
          const isLocked = !option.free && !isPremium;

          return (
            <button
              key={option.id}
              onClick={() => {
                if (isLocked) {
                  onShowUpgrade();
                  return;
                }
                onSelectSound(option.id);
              }}
              className={`p-3 rounded-xl text-left transition-all relative ${
                isSelected
                  ? darkMode
                    ? 'bg-purple-600 text-white'
                    : 'bg-indigo-600 text-white'
                  : darkMode
                    ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    : 'bg-white/50 text-slate-700 hover:bg-white/80'
              } ${isLocked ? 'opacity-60' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium truncate">{option.name}</div>
                {isLocked && <span className="text-xs">🔒</span>}
              </div>
              <div
                className={`text-xs mt-0.5 truncate ${
                  isSelected ? 'text-white/70' : darkMode ? 'text-slate-500' : 'text-slate-500'
                }`}
              >
                {option.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
