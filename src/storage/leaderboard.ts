import type { ILeaderboardEntry } from '../types/game';

const STORAGE_KEY = 'alchemists-cauldron:leaderboard';
const MAX_ENTRIES = 10;

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
    Number.isFinite(entry.date)
  );
}

export function sortLeaderboard(entries: readonly ILeaderboardEntry[]): ILeaderboardEntry[] {
  return [...entries].sort(
    (first, second) => second.score - first.score || first.date - second.date,
  );
}

export function loadLeaderboard(): ILeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw === null) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return sortLeaderboard(parsed.filter(isLeaderboardEntry)).slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: readonly ILeaderboardEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage can be full or disabled: the game keeps working without saving.
  }
}

export function isTopScore(score: number): boolean {
  if (score <= 0) {
    return false;
  }

  const entries = loadLeaderboard();
  const lastEntry = entries[MAX_ENTRIES - 1];

  return lastEntry === undefined || score > lastEntry.score;
}

export function addLeaderboardEntry(entry: ILeaderboardEntry): number {
  const entries = sortLeaderboard([...loadLeaderboard(), entry]).slice(0, MAX_ENTRIES);
  saveLeaderboard(entries);

  return entries.indexOf(entry) + 1;
}

export function clearLeaderboard(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors: there is nothing to clear.
  }
}
