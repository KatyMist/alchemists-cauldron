import type { Difficulty } from '../types/game';
import { DEFAULT_DIFFICULTY, isDifficulty } from '../data/difficulty';
import { readJson, writeJson } from './storage';

const STORAGE_KEY = 'alchemists-cauldron:difficulty';

export function loadDifficulty(): Difficulty {
  const value = readJson(STORAGE_KEY);
  return isDifficulty(value) ? value : DEFAULT_DIFFICULTY;
}

export function saveDifficulty(difficulty: Difficulty): void {
  writeJson(STORAGE_KEY, difficulty);
}
