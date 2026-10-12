import type { IDifficultySettings, IGameState } from '../types/game';
import { INGREDIENTS } from '../data/ingredients';
import { getStock } from './stock';

export function isCauldronFull(state: IGameState, settings: IDifficultySettings): boolean {
  return state.cauldronIngredients.length >= settings.maxCauldronIngredients;
}

export function canAddIngredient(
  state: IGameState,
  ingredientId: string,
  settings: IDifficultySettings,
): boolean {
  return (
    state.status === 'playing' &&
    !isCauldronFull(state, settings) &&
    getStock(state.shelfStock, ingredientId) > 0
  );
}

export function addIngredient(
  state: IGameState,
  ingredientId: string,
  settings: IDifficultySettings,
): IGameState {
  const ingredient = INGREDIENTS.find((item) => item.id === ingredientId);

  if (!ingredient || !canAddIngredient(state, ingredientId, settings)) {
    return state;
  }

  return {
    ...state,
    cauldronIngredients: [...state.cauldronIngredients, ingredient],
    shelfStock: {
      ...state.shelfStock,
      [ingredientId]: getStock(state.shelfStock, ingredientId) - 1,
    },
  };
}
