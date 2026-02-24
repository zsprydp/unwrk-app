import { load, save, defaults } from './storage';

const Backend = {
  storage: load(),

  persist() {
    save(this.storage);
  },

  reset() {
    this.storage = structuredClone(defaults);
    this.persist();
  },

  async saveSession(session) {
    this.storage.sessions.push(session);
    this.storage.user.totalSessions++;
    this.updateStreak();
    this.persist();
    return session;
  },

  updateStreak() {
    const today = new Date().toDateString();
    const lastDate = this.storage.user.lastSessionDate;

    if (lastDate === today) return;

    if (lastDate === new Date(Date.now() - 86400000).toDateString()) {
      this.storage.user.streak++;
    } else if (lastDate !== today) {
      this.storage.user.streak = 1;
    }

    this.storage.user.lastSessionDate = today;
    this.persist();
  },

  updateSettings(newSettings) {
    this.storage.user.settings = { ...this.storage.user.settings, ...newSettings };
    this.persist();
  },

  updateUser(fields) {
    this.storage.user = { ...this.storage.user, ...fields };
    this.persist();
  },

  getSmartSuggestion() {
    const recentSessions = this.storage.sessions.slice(-10);
    if (recentSessions.length < 3) return 25;

    const avgCompleted =
      recentSessions.filter((s) => s.completed).reduce((acc, s) => acc + s.duration, 0) /
      recentSessions.length;

    return Math.round(avgCompleted) || 25;
  },

  getAnalytics() {
    const sessions = this.storage.sessions;
    const completed = sessions.filter((s) => s.completed);
    const efficiency = sessions.length > 0 ? (completed.length / sessions.length) * 100 : 0;
    const totalMinutes = completed.reduce((acc, s) => acc + s.duration, 0);

    return {
      efficiency: efficiency.toFixed(0),
      totalMinutes,
      weeklyForecast: Math.round(totalMinutes * 1.15),
      bestTime: 'Morning',
    };
  },
};

export default Backend;
