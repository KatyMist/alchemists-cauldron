import type { IRecipeRange } from '../types/game';

export function formatSigned(value: number): string {
  if (value > 0) {
    return `+${String(value)}`;
  }

  if (value < 0) {
    return `−${String(Math.abs(value))}`;
  }

  return '0';
}

export function formatRange(range: IRecipeRange): string {
  return `${String(range.min)}..${String(range.max)}`;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return `${day}.${month}.${String(date.getFullYear())} ${time}`;
}
