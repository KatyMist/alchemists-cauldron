import type { Difficulty, IDifficultySettings } from '../types/game';

export const DIFFICULTY_SETTINGS: Readonly<Record<Difficulty, IDifficultySettings>> = {
  easy: {
    shelfSize: 4,
    maxCauldronIngredients: 4,
    startTime: 180,
    tolerance: 12,
    lives: 5,
    scorePerBrew: 100,
    timeBonus: 15,
    reactionCount: 0,
  },
  medium: {
    shelfSize: 6,
    maxCauldronIngredients: 4,
    startTime: 150,
    tolerance: 8,
    lives: 3,
    scorePerBrew: 200,
    timeBonus: 10,
    reactionCount: 2,
  },
  hard: {
    shelfSize: 8,
    maxCauldronIngredients: 5,
    startTime: 150,
    tolerance: 5,
    lives: 3,
    scorePerBrew: 300,
    timeBonus: 5,
    reactionCount: 3,
  },
};

export const DEFAULT_DIFFICULTY: Difficulty = 'medium';

export const DIFFICULTIES: readonly Difficulty[] = ['easy', 'medium', 'hard'];

export const DIFFICULTY_LABELS: Readonly<Record<Difficulty, string>> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export function isDifficulty(value: unknown): value is Difficulty {
  return value === 'easy' || value === 'medium' || value === 'hard';
}
