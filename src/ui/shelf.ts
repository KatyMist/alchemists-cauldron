import type { IIngredient, ShelfStock } from '../types/game';
import { getStock } from '../logic/stock';
import { createElement } from './dom';
import { createBottle } from './icons';

export interface IShelfHandlers {
  onAdd: (ingredientId: string) => void;
  onShowTooltip: (card: HTMLElement, ingredient: IIngredient) => void;
  onHideTooltip: () => void;
}

interface IShelfOptions extends IShelfHandlers {
  ingredients: readonly IIngredient[];
  stock: ShelfStock;
  isBlocked: boolean;
}

export const DRAG_DATA_TYPE = 'text/plain';

function createEmptyCard(ingredient: IIngredient): HTMLButtonElement {
  const card = createElement('button', `shelf-card shelf-card--empty ingredient--${ingredient.id}`);
  card.type = 'button';
  card.dataset.id = ingredient.id;
  card.disabled = true;
  card.tabIndex = -1;
  card.draggable = false;
  card.setAttribute('aria-label', `${ingredient.name}: out of stock`);
  card.append(
    createElement('span', 'shelf-card__bottle'),
    createElement('span', 'shelf-card__info'),
    createElement('span', 'shelf-card__stock', '0'),
  );
  return card;
}

function createShelfCard(
  ingredient: IIngredient,
  portions: number,
  isBlocked: boolean,
  handlers: IShelfHandlers,
): HTMLButtonElement {
  if (portions <= 0) {
    return createEmptyCard(ingredient);
  }

  const card = createElement('button', `shelf-card ingredient--${ingredient.id}`);
  const info = createElement('span', 'shelf-card__info');
  info.append(createElement('span', 'shelf-card__name', ingredient.name));

  card.type = 'button';
  card.dataset.id = ingredient.id;
  card.disabled = isBlocked;
  card.draggable = !isBlocked;
  card.setAttribute('aria-label', `Add ${ingredient.name}, ${String(portions)} left`);
  card.append(
    createBottle(ingredient.icon, 'shelf-card__bottle'),
    info,
    createElement('span', 'shelf-card__stock', String(portions)),
  );

  card.addEventListener('click', () => {
    handlers.onAdd(ingredient.id);
  });
  card.addEventListener('dragstart', (event) => {
    event.dataTransfer?.setData(DRAG_DATA_TYPE, ingredient.id);
    handlers.onHideTooltip();
  });
  card.addEventListener('mouseenter', () => {
    handlers.onShowTooltip(card, ingredient);
  });
  card.addEventListener('focus', () => {
    handlers.onShowTooltip(card, ingredient);
  });
  card.addEventListener('mouseleave', handlers.onHideTooltip);
  card.addEventListener('blur', handlers.onHideTooltip);

  return card;
}

export function renderShelf(container: HTMLElement, options: IShelfOptions): void {
  const { ingredients, stock, isBlocked } = options;

  container.classList.toggle('shelf--blocked', isBlocked);
  container.replaceChildren(
    ...ingredients.map((ingredient) =>
      createShelfCard(ingredient, getStock(stock, ingredient.id), isBlocked, options),
    ),
  );
}
