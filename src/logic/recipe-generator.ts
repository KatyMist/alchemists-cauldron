import type { Difficulty, IRecipe } from '../types/game';
import { RECIPES } from '../data/recipes';
import { pickRandom } from './random';

export function getRecipesByDifficulty(difficulty: Difficulty): readonly IRecipe[] {
  return RECIPES.filter((recipe) => recipe.difficulty === difficulty);
}

export function pickRecipe(difficulty: Difficulty): IRecipe | null {
  return pickRandom(getRecipesByDifficulty(difficulty)) ?? null;
}
