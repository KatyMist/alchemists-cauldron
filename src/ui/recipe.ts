import type { IDifficultySettings, IGameState } from '../types/game';
import { PARAMETER_KEYS } from '../data/parameters';
import { formatRange } from './format';
import type { ILayout } from './layout';

export function renderRecipe(
  layout: ILayout,
  state: IGameState,
  settings: IDifficultySettings,
): void {
  const recipe = state.activeRecipe;
  const added = state.cauldronIngredients.length;
  const maximum = settings.maxCauldronIngredients;

  layout.recipeName.textContent = recipe?.name ?? 'Press Start Game';
  layout.recipeCounter.textContent = `Ingredients: ${String(added)} / ${String(maximum)}`;
  layout.recipeCounter.classList.toggle('book__counter--full', added >= maximum);

  PARAMETER_KEYS.forEach((key) => {
    layout.recipeRanges[key].textContent = recipe ? formatRange(recipe[key]) : '—';
  });
}
