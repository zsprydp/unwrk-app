import { describe, it, expect } from 'vitest';
import soundOptions from './soundOptions';

describe('soundOptions', () => {
  it('has 9 options', () => {
    expect(soundOptions).toHaveLength(9);
  });

  it('each option has required fields', () => {
    for (const opt of soundOptions) {
      expect(opt).toHaveProperty('id');
      expect(opt).toHaveProperty('name');
      expect(opt).toHaveProperty('desc');
      expect(typeof opt.free).toBe('boolean');
    }
  });

  it('has at least one free and one premium option', () => {
    expect(soundOptions.some((o) => o.free)).toBe(true);
    expect(soundOptions.some((o) => !o.free)).toBe(true);
  });

  it('includes "none" as first option', () => {
    expect(soundOptions[0].id).toBe('none');
    expect(soundOptions[0].free).toBe(true);
  });

  it('all ids are unique', () => {
    const ids = soundOptions.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
