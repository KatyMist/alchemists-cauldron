import type { IRecipeRange } from '../types/game';

const MINUS = '−';

export function formatValue(value: number): string {
  return value < 0 ? `${MINUS}${String(Math.abs(value))}` : String(value);
}

export function formatSigned(value: number): string {
  return value > 0 ? `+${String(value)}` : formatValue(value);
}

export function formatRange(range: IRecipeRange): string {
  return `${formatValue(range.min)} – ${formatValue(range.max)}`;
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
