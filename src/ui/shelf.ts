import type { IIngredient, ShelfStock } from '../types/game';
import { getStock } from '../logic/stock';
import { createElement } from './dom';
import { formatValue } from './format';
import { createBottle } from './icons';

interface IShelfOptions {
  ingredients: readonly IIngredient[];
  stock: ShelfStock;
  isBlocked: boolean;
  onAdd: (ingredientId: string) => void;
}

function createValues(ingredient: IIngredient): HTMLSpanElement {
  const values = createElement('span', 'shelf-card__values');
  const chips: readonly [string, string, string, number][] = [
    ['T', 'temperature', 'Temperature', ingredient.temperature],
    ['D', 'density', 'Density', ingredient.density],
    ['MP', 'magic', 'Magic Power', ingredient.magicPower],
  ];

  chips.forEach(([short, modifier, full, value]) => {
    const chip = createElement('span', `chip chip--${modifier}`, `${short}${formatValue(value)}`);
    chip.title = `${full}: ${formatValue(value)}`;
    values.append(chip);
  });

  return values;
}

function createShelfCard(
  ingredient: IIngredient,
  portions: number,
  isBlocked: boolean,
  onAdd: (ingredientId: string) => void,
): HTMLButtonElement {
  const card = createElement('button', `shelf-card ingredient--${ingredient.id}`);
  card.type = 'button';
  card.dataset.id = ingredient.id;

  const badge = createElement('span', 'shelf-card__stock', String(portions));

  if (portions <= 0) {
    card.classList.add('shelf-card--empty');
    card.disabled = true;
    card.tabIndex = -1;
    card.setAttribute('aria-label', `${ingredient.name}: out of stock`);
    card.append(
      createElement('span', 'shelf-card__bottle'),
      createElement('span', 'shelf-card__info'),
      badge,
    );
    return card;
  }

  const bottle = createBottle(ingredient.icon, 'shelf-card__bottle');

  const info = createElement('span', 'shelf-card__info');
  info.append(createElement('span', 'shelf-card__name', ingredient.name), createValues(ingredient));

  card.disabled = isBlocked;
  card.setAttribute('aria-label', `Add ${ingredient.name}, ${String(portions)} left`);
  card.append(bottle, info, badge);
  card.addEventListener('click', () => {
    onAdd(ingredient.id);
  });

  return card;
}

export function renderShelf(container: HTMLElement, options: IShelfOptions): void {
  const { ingredients, stock, isBlocked, onAdd } = options;

  container.classList.toggle('shelf--blocked', isBlocked);
  container.replaceChildren(
    ...ingredients.map((ingredient) =>
      createShelfCard(ingredient, getStock(stock, ingredient.id), isBlocked, onAdd),
    ),
  );
}
