import { useState, useEffect, useRef } from 'react';
import AudioEngine from './lib/AudioEngine';
import Backend from './lib/Backend';
import soundOptions from './lib/soundOptions';
import { CalendarIcon, TrendingUp, SettingsIcon } from './components/icons';
import Celebration from './components/Celebration';
import TimerView from './components/TimerView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import TaskInputModal from './components/TaskInputModal';
import NoteInputModal from './components/NoteInputModal';
import UpgradeModal from './components/UpgradeModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [notes, setNotes] = useState([]);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [view, setView] = useState('timer');
  const [darkMode, setDarkMode] = useState(false);
  const [settings, setSettings] = useState(Backend.storage.user.settings);
  const [suggestion, setSuggestion] = useState(25);
  const [showCelebration, setShowCelebration] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedSound, setSelectedSound] = useState('none');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [isPremium, setIsPremium] = useState(Backend.storage.user.isPremium);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    setSuggestion(Backend.getSmartSuggestion());
  }, []);

  useEffect(() => {
    if (soundEnabled && selectedSound !== 'none') {
      startSound(selectedSound);
    } else {
      AudioEngine.stop();
    }
    return () => AudioEngine.stop();
  }, [soundEnabled, selectedSound]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  const handleSessionComplete = async () => {
    setIsActive(false);
    setShowCelebration(true);

    const session = {
      id: Date.now(),
      taskDescription: currentTask,
      notes,
      startTime: startTimeRef.current,
      endTime: new Date(),
      duration:
        mode === 'focus'
          ? settings.focusDuration
          : mode === 'shortBreak'
            ? settings.shortBreak
            : settings.longBreak,
      completed: true,
      mode,
    };

    await Backend.saveSession(session);
    setTimeout(() => setShowCelebration(false), 3000);

    if (mode === 'focus') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      if (newCount % settings.sessionsBeforeLongBreak === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('focus');
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    const durations = {
      focus: settings.focusDuration * 60,
      shortBreak: settings.shortBreak * 60,
      longBreak: settings.longBreak * 60,
    };
    setTimeLeft(durations[newMode]);
    setIsActive(false);
  };

  const toggleTimer = () => {
    if (!isActive && !currentTask && mode === 'focus') {
      setShowTaskInput(true);
      return;
    }

    if (!isActive) {
      startTimeRef.current = new Date();
      setDarkMode(true);

      if (!AudioEngine.audioContext) {
        AudioEngine.init();
      }
      if (AudioEngine.audioContext?.state === 'suspended') {
        AudioEngine.audioContext.resume();
      }

      if (mode === 'focus' && settings.focusSound !== 'none') {
        setSelectedSound(settings.focusSound);
        setSoundEnabled(true);
      } else if (
        (mode === 'shortBreak' || mode === 'longBreak') &&
        settings.breakSound !== 'none'
      ) {
        setSelectedSound(settings.breakSound);
        setSoundEnabled(true);
      }
    } else {
      setDarkMode(false);
      setSoundEnabled(false);
    }

    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setDarkMode(false);
    const durations = {
      focus: settings.focusDuration * 60,
      shortBreak: settings.shortBreak * 60,
      longBreak: settings.longBreak * 60,
    };
    setTimeLeft(durations[mode]);
  };

  const startSound = (soundType) => {
    const sound = soundOptions.find((s) => s.id === soundType);
    if (!sound?.free && !isPremium) {
      setShowUpgradeModal(true);
      setSoundEnabled(false);
      return;
    }

    if (AudioEngine.audioContext && AudioEngine.audioContext.state === 'suspended') {
      AudioEngine.audioContext.resume();
    }

    switch (soundType) {
      case 'white':
        AudioEngine.createWhiteNoise(0.1);
        break;
      case 'brown':
        AudioEngine.createBrownNoise(0.15);
        break;
      case 'pink':
        AudioEngine.createPinkNoise(0.12);
        break;
      case 'beta-8':
        AudioEngine.createBinauralBeat(200, 8, 0.2);
        break;
      case 'beta-18':
        AudioEngine.createBinauralBeat(200, 18, 0.2);
        break;
      case 'alpha-10':
        AudioEngine.createBinauralBeat(200, 10, 0.2);
        break;
      case 'gamma-40':
        AudioEngine.createBinauralBeat(200, 40, 0.2);
        break;
      case 'meditation':
        AudioEngine.createMeditationTone(0.15);
        break;
      default:
        AudioEngine.stop();
    }
  };

  const toggleSound = () => {
    if (!audioUnlocked) {
      AudioEngine.init();
      if (AudioEngine.audioContext?.state === 'suspended') {
        AudioEngine.audioContext.resume().then(() => {
          setAudioUnlocked(true);
          setSoundEnabled(true);
        });
      } else {
        setAudioUnlocked(true);
        setSoundEnabled(true);
      }
      return;
    }

    if (!soundEnabled && selectedSound === 'none') {
      setSelectedSound('white');
      setSoundEnabled(true);
    } else {
      setSoundEnabled(!soundEnabled);
    }
  };

  const addNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, { text: noteText, time: new Date() }]);
      setNoteText('');
      setShowNoteInput(false);
    }
  };

  const handleSelectSound = (soundId) => {
    if (mode === 'focus') {
      setSettings({ ...settings, focusSound: soundId });
    } else {
      setSettings({ ...settings, breakSound: soundId });
    }
    setSelectedSound(soundId);
    setSoundEnabled(soundId !== 'none');
  };

  const handleAuth = () => {
    setIsPremium(true);
    Backend.storage.user.isPremium = true;
    Backend.storage.user.email = authEmail;
    setShowAuthModal(false);
    alert('Welcome to Premium! 🎉 (This is a demo)');
  };

  const analytics = Backend.getAnalytics();
  const streak = Backend.storage.user.streak;
  const totalSessions = Backend.storage.user.totalSessions;
  const bgGradient = darkMode ? 'bg-slate-950' : 'bg-white';

  return (
    <div
      className={`min-h-screen ${bgGradient} transition-all duration-1000 relative overflow-hidden`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 ${darkMode ? 'bg-purple-500/5' : 'bg-purple-200/20'} rounded-full blur-3xl animate-pulse`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${darkMode ? 'bg-blue-500/5' : 'bg-blue-200/20'} rounded-full blur-3xl animate-pulse`}
          style={{ animationDelay: '1s' }}
        />
      </div>

      {showCelebration && <Celebration streak={streak} />}

      <div className="relative z-10 max-w-md mx-auto px-6 py-8">
        <div className="text-center mb-8 pt-4">
          <h1
            className={`text-4xl font-light tracking-widest ${darkMode ? 'text-white' : 'text-slate-800'}`}
          >
            UnWrk
          </h1>
          <p
            className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mt-1 tracking-wide`}
          >
            Do less, achieve more
          </p>
          {!isPremium && (
            <button
              onClick={() => setShowAuthModal(true)}
              className="mt-4 text-xs px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 transition-transform shadow-lg"
            >
              ✨ Upgrade to Premium
            </button>
          )}
        </div>

        <div
          className={`flex gap-2 mb-8 p-2 rounded-2xl ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-lg`}
        >
          {[
            { key: 'timer', icon: <CalendarIcon /> },
            { key: 'analytics', icon: <TrendingUp /> },
            { key: 'settings', icon: <SettingsIcon /> },
          ].map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center ${
                view === v.key
                  ? darkMode
                    ? 'bg-purple-600 text-white'
                    : 'bg-indigo-600 text-white'
                  : darkMode
                    ? 'text-slate-300 hover:bg-slate-700/50'
                    : 'text-slate-700 hover:bg-white/50'
              }`}
            >
              {v.icon}
            </button>
          ))}
        </div>

        {view === 'timer' && (
          <TimerView
            mode={mode}
            timeLeft={timeLeft}
            isActive={isActive}
            currentTask={currentTask}
            sessionCount={sessionCount}
            darkMode={darkMode}
            settings={settings}
            suggestion={suggestion}
            soundEnabled={soundEnabled}
            audioUnlocked={audioUnlocked}
            isPremium={isPremium}
            streak={streak}
            totalSessions={totalSessions}
            onSwitchMode={switchMode}
            onToggleTimer={toggleTimer}
            onResetTimer={resetTimer}
            onShowTaskInput={() => setShowTaskInput(true)}
            onShowNoteInput={() => setShowNoteInput(true)}
            onToggleSound={toggleSound}
            onSelectSound={handleSelectSound}
            onShowUpgrade={() => setShowUpgradeModal(true)}
          />
        )}

        {view === 'analytics' && (
          <AnalyticsView
            darkMode={darkMode}
            isPremium={isPremium}
            analytics={analytics}
            onShowAuth={() => setShowAuthModal(true)}
          />
        )}

        {view === 'settings' && (
          <SettingsView darkMode={darkMode} settings={settings} onUpdateSettings={setSettings} />
        )}

        {showTaskInput && (
          <TaskInputModal
            darkMode={darkMode}
            currentTask={currentTask}
            isActive={isActive}
            onChangeTask={setCurrentTask}
            onClose={() => setShowTaskInput(false)}
            onSetActive={setIsActive}
          />
        )}

        {showNoteInput && (
          <NoteInputModal
            darkMode={darkMode}
            noteText={noteText}
            onChangeNote={setNoteText}
            onSave={addNote}
            onClose={() => setShowNoteInput(false)}
          />
        )}

        {showUpgradeModal && (
          <UpgradeModal
            darkMode={darkMode}
            onClose={() => setShowUpgradeModal(false)}
            onShowAuth={() => setShowAuthModal(true)}
          />
        )}

        {showAuthModal && (
          <AuthModal
            darkMode={darkMode}
            authEmail={authEmail}
            onChangeEmail={setAuthEmail}
            onSubmit={handleAuth}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </div>
    </div>
  );
}
