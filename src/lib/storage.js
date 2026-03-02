const STORAGE_KEY = 'unwrk';

const defaults = {
  sessions: [],
  user: {
    streak: 0,
    totalSessions: 0,
    lastSessionDate: null,
    isPremium: false,
    email: null,
    settings: {
      focusDuration: 25,
      shortBreak: 5,
      longBreak: 15,
      sessionsBeforeLongBreak: 4,
      smartSuggestion: true,
      softBlocking: true,
      ambientSound: true,
      darkMode: false,
      focusSound: 'none',
      breakSound: 'none',
    },
  },
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaults);
    const parsed = JSON.parse(raw);
    return {
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : defaults.sessions,
      user: {
        ...defaults.user,
        ...parsed.user,
        settings: { ...defaults.user.settings, ...parsed.user?.settings },
      },
    };
  } catch {
    return structuredClone(defaults);
  }
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota exceeded or private mode — silently fail */
  }
}

function clear() {
  localStorage.removeItem(STORAGE_KEY);
}

export { load, save, clear, defaults };
