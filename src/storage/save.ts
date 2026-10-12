import type { IGameState, IIngredient, IRecipe, ISaveData, ShelfStock } from '../types/game';
import { DIFFICULTY_SETTINGS, isDifficulty } from '../data/difficulty';
import { INGREDIENTS } from '../data/ingredients';
import { RECIPES } from '../data/recipes';
import { MS_IN_SECOND } from '../logic/timer';
import { readJson, removeKey, writeJson } from './storage';

const STORAGE_KEY = 'alchemists-cauldron:save';
const MAX_STOCK = 15;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isWholeNumber(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max;
}

function getId(value: unknown): string | null {
  return isRecord(value) && typeof value.id === 'string' ? value.id : null;
}

function restoreStock(value: unknown, shelf: readonly IIngredient[]): ShelfStock | null {
  if (!isRecord(value) || Object.keys(value).length !== shelf.length) {
    return null;
  }

  const stock: ShelfStock = {};

  for (const ingredient of shelf) {
    const portions = value[ingredient.id];

    if (!isWholeNumber(portions, 0, MAX_STOCK)) {
      return null;
    }

    stock[ingredient.id] = portions;
  }

  return stock;
}

function restoreIngredients(
  value: unknown,
  shelf: readonly IIngredient[],
  capacity: number,
): IIngredient[] | null {
  if (!Array.isArray(value) || value.length > capacity) {
    return null;
  }

  const ingredients: IIngredient[] = [];

  for (const item of value) {
    const ingredient = shelf.find((candidate) => candidate.id === getId(item));

    if (!ingredient) {
      return null;
    }

    ingredients.push(ingredient);
  }

  return ingredients;
}

export function isValidSave(data: unknown): data is ISaveData {
  return restoreSave(data) !== null;
}

function restoreSave(data: unknown): ISaveData | null {
  if (!isRecord(data) || !isDifficulty(data.difficulty)) {
    return null;
  }

  const difficulty = data.difficulty;
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const shelf = INGREDIENTS.slice(0, settings.shelfSize);
  const recipeId = getId(data.activeRecipe);
  const activeRecipe: IRecipe | undefined = RECIPES.find(
    (recipe) => recipe.id === recipeId && recipe.difficulty === difficulty,
  );
  const shelfStock = restoreStock(data.shelfStock, shelf);
  const cauldronIngredients = restoreIngredients(
    data.cauldronIngredients,
    shelf,
    settings.maxCauldronIngredients,
  );

  const { score, timeLeft, lives, status } = data;

  if (
    (status !== 'playing' && status !== 'paused') ||
    !isWholeNumber(score, 0, Number.MAX_SAFE_INTEGER) ||
    !isWholeNumber(timeLeft, 1, settings.startTime * MS_IN_SECOND) ||
    !isWholeNumber(lives, 1, settings.lives) ||
    activeRecipe === undefined ||
    shelfStock === null ||
    cauldronIngredients === null
  ) {
    return null;
  }

  return {
    difficulty,
    score,
    timeLeft,
    lives,
    activeRecipe,
    cauldronIngredients,
    shelfStock,
    status,
  };
}

export function saveGame(state: IGameState): void {
  if (state.status !== 'playing' && state.status !== 'paused') {
    return;
  }

  const data: ISaveData = {
    difficulty: state.difficulty,
    score: state.score,
    timeLeft: Math.round(state.timeLeft),
    lives: state.lives,
    activeRecipe: state.activeRecipe,
    cauldronIngredients: state.cauldronIngredients,
    shelfStock: state.shelfStock,
    status: state.status,
  };

  writeJson(STORAGE_KEY, data);
}

export function loadGame(): ISaveData | null {
  const save = restoreSave(readJson(STORAGE_KEY));

  if (save === null) {
    removeKey(STORAGE_KEY);
  }

  return save;
}

export function clearSave(): void {
  removeKey(STORAGE_KEY);
}
