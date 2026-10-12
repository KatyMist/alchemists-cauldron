const NAME_PATTERN = /^[\p{L}\d _-]{2,15}$/u;

export function normalizePlayerName(name: string): string {
  return name.trim();
}

export function isValidPlayerName(name: string): boolean {
  return NAME_PATTERN.test(normalizePlayerName(name));
}
