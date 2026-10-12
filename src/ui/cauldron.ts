import type { IIngredient } from '../types/game';
import { createElement } from './dom';
import { createIcon } from './icons';

export function renderCauldron(
  cauldron: HTMLElement,
  list: HTMLElement,
  ingredients: readonly IIngredient[],
  capacity: number,
): void {
  const items: HTMLLIElement[] = [];

  for (let index = 0; index < capacity; index += 1) {
    const ingredient = ingredients[index];
    const item = createElement('li', 'cauldron__slot');

    if (ingredient) {
      item.classList.add('cauldron__slot--filled', `ingredient--${ingredient.id}`);
      item.title = ingredient.name;
      item.append(
        createIcon(ingredient.icon, 'cauldron__icon'),
        createElement('span', 'cauldron__name', ingredient.name),
      );
    } else {
      item.setAttribute('aria-hidden', 'true');
    }

    items.push(item);
  }

  list.replaceChildren(...items);
  cauldron.classList.toggle('cauldron--empty', ingredients.length === 0);
}
