import type { IDifficultySettings, IGameState } from '../types/game';
import type { ILayout } from './layout';

export function renderRecipe(
  layout: ILayout,
  state: IGameState,
  settings: IDifficultySettings,
): void {
  const added = state.cauldronIngredients.length;
  const maximum = settings.maxCauldronIngredients;

  layout.recipeName.textContent = state.activeRecipe?.name ?? 'Press Start Game';
  layout.recipeCounter.textContent = `Ingredients: ${String(added)} / ${String(maximum)}`;
  layout.recipeCounter.classList.toggle('recipe__counter--full', added >= maximum);
}
