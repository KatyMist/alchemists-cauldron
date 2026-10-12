import type { ICauldronValues, IRecipe, IRecipeRange } from '../types/game';
import { PARAMETER_KEYS } from '../data/parameters';

export type ParameterStatus = 'match' | 'tolerance' | 'off';

export function expandRange(range: IRecipeRange, tolerance: number): IRecipeRange {
  return { min: range.min - tolerance, max: range.max + tolerance };
}

export function isInRange(value: number, range: IRecipeRange): boolean {
  return value >= range.min && value <= range.max;
}

export function getParameterStatus(
  value: number,
  range: IRecipeRange,
  tolerance: number,
): ParameterStatus {
  if (isInRange(value, range)) {
    return 'match';
  }

  return isInRange(value, expandRange(range, tolerance)) ? 'tolerance' : 'off';
}

export function checkBrew(values: ICauldronValues, recipe: IRecipe, tolerance: number): boolean {
  return PARAMETER_KEYS.every((key) => isInRange(values[key], expandRange(recipe[key], tolerance)));
}
