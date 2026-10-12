export const MS_IN_SECOND = 1000;
export const DANGER_TIME_MS = 15 * MS_IN_SECOND;

export function getTimeLeft(endTime: number, now: number): number {
  return Math.max(0, endTime - now);
}

export function addTimeBonus(timeLeft: number, bonusMs: number, maxMs: number): number {
  return Math.min(timeLeft + bonusMs, maxMs);
}

export function formatTime(timeLeftMs: number): string {
  const totalSeconds = Math.ceil(timeLeftMs / MS_IN_SECOND);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
