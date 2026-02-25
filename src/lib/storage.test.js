import { describe, it, expect, beforeEach } from 'vitest';
import { load, save, clear, defaults } from './storage';

beforeEach(() => {
  localStorage.clear();
});

describe('storage', () => {
  it('returns defaults when localStorage is empty', () => {
    const data = load();
    expect(data.sessions).toEqual([]);
    expect(data.user.streak).toBe(0);
    expect(data.user.settings.focusDuration).toBe(25);
  });

  it('round-trips data through save/load', () => {
    const data = load();
    data.user.settings.focusDuration = 30;
    data.user.streak = 5;
    data.sessions.push({ id: 1, duration: 25, completed: true });
    save(data);

    const loaded = load();
    expect(loaded.user.settings.focusDuration).toBe(30);
    expect(loaded.user.streak).toBe(5);
    expect(loaded.sessions).toHaveLength(1);
    expect(loaded.sessions[0].id).toBe(1);
  });

  it('returns defaults for corrupted JSON', () => {
    localStorage.setItem('unwrk', '{invalid json!!!');
    const data = load();
    expect(data).toEqual(structuredClone(defaults));
  });

  it('merges missing settings keys with defaults', () => {
    localStorage.setItem('unwrk', JSON.stringify({ sessions: [], user: { settings: {} } }));
    const data = load();
    expect(data.user.settings.focusDuration).toBe(25);
    expect(data.user.settings.shortBreak).toBe(5);
  });

  it('clear removes the storage key', () => {
    save(load());
    expect(localStorage.getItem('unwrk')).not.toBeNull();
    clear();
    expect(localStorage.getItem('unwrk')).toBeNull();
  });
});
