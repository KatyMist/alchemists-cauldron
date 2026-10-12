import type { IIngredient, ShelfStock } from '../types/game';
import { getStock } from '../logic/stock';
import { createElement } from './dom';
import { formatSigned } from './format';
import { createIcon } from './icons';

interface IShelfOptions {
  ingredients: readonly IIngredient[];
  stock: ShelfStock;
  isBlocked: boolean;
  onAdd: (ingredientId: string) => void;
}

function createValues(ingredient: IIngredient): HTMLDListElement {
  const list = createElement('dl', 'shelf-card__values');
  const values: readonly [string, string, number][] = [
    ['T', 'Temperature', ingredient.temperature],
    ['D', 'Density', ingredient.density],
    ['M', 'Magic Power', ingredient.magicPower],
  ];

  values.forEach(([short, full, value]) => {
    const item = createElement('div', 'shelf-card__value');
    const term = createElement('dt', 'shelf-card__value-name', short);
    term.title = full;
    item.append(term, createElement('dd', 'shelf-card__value-number', formatSigned(value)));
    list.append(item);
  });

  return list;
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
    card.append(badge);
    return card;
  }

  card.disabled = isBlocked;
  card.setAttribute('aria-label', `Add ${ingredient.name}, ${String(portions)} left`);
  card.append(
    badge,
    createIcon(ingredient.icon, 'shelf-card__icon'),
    createElement('span', 'shelf-card__name', ingredient.name),
    createValues(ingredient),
  );
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
