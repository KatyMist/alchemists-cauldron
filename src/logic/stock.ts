import type { IIngredient, ShelfStock } from '../types/game';
import { randomInt } from './random';

const MIN_STOCK = 2;
const MAX_STOCK = 15;

export function createStock(ingredients: readonly IIngredient[]): ShelfStock {
  const stock: ShelfStock = {};

  ingredients.forEach((ingredient) => {
    stock[ingredient.id] = randomInt(MIN_STOCK, MAX_STOCK);
  });

  return stock;
}

export function getStock(stock: ShelfStock, ingredientId: string): number {
  return stock[ingredientId] ?? 0;
}

export function isShelfEmpty(stock: ShelfStock): boolean {
  return Object.values(stock).every((portions) => portions <= 0);
}
