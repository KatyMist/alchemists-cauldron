import type { Difficulty, ILeaderboardEntry } from '../types/game';
import { isDifficulty } from '../data/difficulty';
import { readJson, removeKey, writeJson } from './storage';

const STORAGE_PREFIX = 'alchemists-cauldron:leaderboard:';
const MAX_ENTRIES = 10;

function getKey(difficulty: Difficulty): string {
  return `${STORAGE_PREFIX}${difficulty}`;
}

function isLeaderboardEntry(value: unknown): value is ILeaderboardEntry {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const entry = value as Record<string, unknown>;

  return (
    typeof entry.name === 'string' &&
    typeof entry.score === 'number' &&
    Number.isFinite(entry.score) &&
    typeof entry.date === 'number' &&
    Number.isFinite(entry.date) &&
    isDifficulty(entry.difficulty)
  );
}

export function sortLeaderboard(entries: readonly ILeaderboardEntry[]): ILeaderboardEntry[] {
  return [...entries].sort(
    (first, second) => second.score - first.score || first.date - second.date,
  );
}

export function loadLeaderboard(difficulty: Difficulty): ILeaderboardEntry[] {
  const parsed = readJson(getKey(difficulty));

  if (!Array.isArray(parsed)) {
    return [];
  }

  const entries = parsed
    .filter(isLeaderboardEntry)
    .filter((entry) => entry.difficulty === difficulty);

  return sortLeaderboard(entries).slice(0, MAX_ENTRIES);
}

export function isTopScore(score: number, difficulty: Difficulty): boolean {
  if (score <= 0) {
    return false;
  }

  const lastEntry = loadLeaderboard(difficulty)[MAX_ENTRIES - 1];

  return lastEntry === undefined || score > lastEntry.score;
}

export function addLeaderboardEntry(entry: ILeaderboardEntry): number {
  const entries = sortLeaderboard([...loadLeaderboard(entry.difficulty), entry]).slice(
    0,
    MAX_ENTRIES,
  );
  writeJson(getKey(entry.difficulty), entries);

  return entries.indexOf(entry) + 1;
}

export function clearLeaderboard(difficulty: Difficulty): void {
  removeKey(getKey(difficulty));
}
