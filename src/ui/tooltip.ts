import type { IIngredient } from '../types/game';
import { createElement } from './dom';
import { formatSigned } from './format';
import { createIcon } from './icons';
import { UI_ICONS } from './layout';

const GAP = 12;

const ROWS = [
  { key: 'temperature', label: 'Temperature', icon: UI_ICONS.thermometer },
  { key: 'density', label: 'Density', icon: UI_ICONS.drop },
  { key: 'magicPower', label: 'Magic Power', icon: UI_ICONS.star },
] as const;

export function showTooltip(
  tooltip: HTMLElement,
  card: HTMLElement,
  ingredient: IIngredient,
): void {
  const header = createElement('div', 'tooltip__header');
  header.append(
    createIcon(ingredient.icon, 'tooltip__icon'),
    createElement('span', 'tooltip__name', ingredient.name),
  );

  const list = createElement('dl', 'tooltip__list');
  ROWS.forEach(({ key, label, icon }) => {
    const row = createElement('div', `tooltip__row tooltip__row--${key}`);
    const term = createElement('dt', 'tooltip__term');
    const iconElement = createElement('span', 'tooltip__row-icon');
    iconElement.innerHTML = icon;
    term.append(iconElement, label);
    row.append(term, createElement('dd', 'tooltip__value', formatSigned(ingredient[key])));
    list.append(row);
  });

  tooltip.className = `tooltip ingredient--${ingredient.id}`;
  tooltip.replaceChildren(header, list);
  tooltip.hidden = false;

  const cardRect = card.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const opensLeft = cardRect.right + GAP + tooltipRect.width > window.innerWidth;
  const opensUp = cardRect.top + tooltipRect.height > window.innerHeight;

  tooltip.classList.toggle('tooltip--left', opensLeft);
  tooltip.classList.toggle('tooltip--up', opensUp);
  tooltip.style.left = `${String(
    opensLeft ? cardRect.left - GAP - tooltipRect.width : cardRect.right + GAP,
  )}px`;
  tooltip.style.top = `${String(opensUp ? cardRect.bottom - tooltipRect.height : cardRect.top)}px`;
}

export function hideTooltip(tooltip: HTMLElement): void {
  tooltip.hidden = true;
}
