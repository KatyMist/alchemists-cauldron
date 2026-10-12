import type { IngredientIcon } from '../types/game';

const STROKE =
  'fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"';

const ICON_SHAPES: Readonly<Record<IngredientIcon, string>> = {
  drop: '<path fill="currentColor" d="M16 3C16 3 7 14 7 20a9 9 0 0 0 18 0C25 14 16 3 16 3z"/>',
  sparkle:
    '<path fill="currentColor" d="M16 2l3 10 10 4-10 4-3 10-3-10-10-4 10-4z"/>' +
    '<circle fill="currentColor" cx="26" cy="6" r="2"/>',
  snowflake:
    `<path ${STROKE} d="M16 3v26M4.7 9.5l22.6 13M27.3 9.5L4.7 22.5"/>` +
    `<path ${STROKE} d="M12 5l4 3 4-3M12 27l4-3 4 3"/>`,
  root:
    `<path ${STROKE} d="M16 10v18M16 16c-4 2-7 6-8 11M16 16c4 2 7 6 8 11"/>` +
    '<path fill="currentColor" d="M16 10c-5 0-8-3-8-7 4 0 8 3 8 7zm0 0c5 0 8-3 8-7-4 0-8 3-8 7z"/>',
  flask:
    `<path ${STROKE} d="M12 3h8M13 3v9L6 26a2 2 0 0 0 1.8 3h16.4a2 2 0 0 0 1.8-3L19 12V3"/>` +
    '<path fill="currentColor" d="M9.5 21h13l2.5 5H7z"/>',
  void:
    `<circle ${STROKE} cx="16" cy="16" r="12"/>` +
    '<circle fill="currentColor" cx="16" cy="16" r="5"/>',
  feather: `<path ${STROKE} d="M27 4C15 5 8 13 6 28M27 4c-1 10-8 17-17 18M27 4L10 22"/>`,
  slime:
    '<path fill="currentColor" d="M5 24c0-8 5-15 11-15s11 7 11 15c0 3-3 4-5 2-2 3-5 3-6 0-2 3-5 3-6 0-2 2-5 1-5-2z"/>' +
    '<circle fill="var(--color-bg)" cx="12" cy="17" r="2"/><circle fill="var(--color-bg)" cx="20" cy="17" r="2"/>',
};

export function createIcon(icon: IngredientIcon, className: string): HTMLSpanElement {
  const wrapper = document.createElement('span');
  wrapper.className = className;
  wrapper.setAttribute('aria-hidden', 'true');
  wrapper.innerHTML = `<svg viewBox="0 0 32 32" focusable="false">${ICON_SHAPES[icon]}</svg>`;
  return wrapper;
}
