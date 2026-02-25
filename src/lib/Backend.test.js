import { describe, it, expect, beforeEach } from 'vitest';
import Backend from './Backend';
import { clear } from './storage';

beforeEach(() => {
  clear();
  Backend.reset();
});

describe('Backend', () => {
  describe('saveSession', () => {
    it('records a session and increments total', async () => {
      expect(Backend.storage.user.totalSessions).toBe(0);

      await Backend.saveSession({
        id: 1,
        duration: 25,
        completed: true,
        mode: 'focus',
      });

      expect(Backend.storage.user.totalSessions).toBe(1);
      expect(Backend.storage.sessions).toHaveLength(1);
    });

    it('persists sessions across reloads', async () => {
      await Backend.saveSession({ id: 1, duration: 25, completed: true, mode: 'focus' });
      const raw = JSON.parse(localStorage.getItem('unwrk'));
      expect(raw.sessions).toHaveLength(1);
      expect(raw.user.totalSessions).toBe(1);
    });
  });

  describe('updateStreak', () => {
    it('starts streak at 1 on first session', () => {
      Backend.updateStreak();
      expect(Backend.storage.user.streak).toBe(1);
      expect(Backend.storage.user.lastSessionDate).toBe(new Date().toDateString());
    });

    it('does not double-count same day', () => {
      Backend.updateStreak();
      Backend.updateStreak();
      expect(Backend.storage.user.streak).toBe(1);
    });
  });

  describe('updateSettings', () => {
    it('merges partial settings', () => {
      Backend.updateSettings({ focusDuration: 30 });
      expect(Backend.storage.user.settings.focusDuration).toBe(30);
      expect(Backend.storage.user.settings.shortBreak).toBe(5);
    });

    it('persists settings to localStorage', () => {
      Backend.updateSettings({ shortBreak: 10 });
      const raw = JSON.parse(localStorage.getItem('unwrk'));
      expect(raw.user.settings.shortBreak).toBe(10);
    });
  });

  describe('getSmartSuggestion', () => {
    it('returns 25 with fewer than 3 sessions', () => {
      expect(Backend.getSmartSuggestion()).toBe(25);
    });

    it('returns average of recent completed sessions', async () => {
      for (let i = 0; i < 5; i++) {
        await Backend.saveSession({ id: i, duration: 20, completed: true, mode: 'focus' });
      }
      expect(Backend.getSmartSuggestion()).toBe(20);
    });
  });

  describe('getAnalytics', () => {
    it('returns zeros with no sessions', () => {
      const a = Backend.getAnalytics();
      expect(a.efficiency).toBe('0');
      expect(a.totalMinutes).toBe(0);
    });

    it('computes efficiency correctly', async () => {
      await Backend.saveSession({ id: 1, duration: 25, completed: true, mode: 'focus' });
      await Backend.saveSession({ id: 2, duration: 25, completed: false, mode: 'focus' });
      const a = Backend.getAnalytics();
      expect(a.efficiency).toBe('50');
      expect(a.totalMinutes).toBe(25);
    });
  });

  describe('reset', () => {
    it('restores defaults and clears persisted data', async () => {
      await Backend.saveSession({ id: 1, duration: 25, completed: true, mode: 'focus' });
      Backend.updateSettings({ focusDuration: 10 });

      Backend.reset();
      expect(Backend.storage.sessions).toEqual([]);
      expect(Backend.storage.user.totalSessions).toBe(0);
      expect(Backend.storage.user.settings.focusDuration).toBe(25);
    });
  });
});
