import type { Difficulty, IRecipe } from '../types/game';

type RecipeRow = [Difficulty, string, [number, number], [number, number], [number, number]];

const RECIPE_ROWS: readonly RecipeRow[] = [
  ['easy', 'Moon Mist', [32, 42], [12, 22], [17, 27]],
  ['easy', 'Root Bloom', [2, 12], [24, 34], [15, 25]],
  ['easy', 'Frost Steam', [2, 12], [7, 17], [19, 29]],
  ['easy', 'Quiet Swirl', [-28, -18], [19, 29], [17, 27]],
  ['easy', 'Bright Dew', [27, 37], [32, 42], [25, 35]],
  ['easy', 'Snow Dust', [-16, -6], [28, 38], [29, 39]],
  ['medium', 'Acid Spark', [17, 27], [18, 28], [29, 39]],
  ['medium', 'Void Ember', [0, 10], [0, 10], [45, 55]],
  ['medium', 'Heavy Acid', [0, 10], [29, 39], [25, 35]],
  ['medium', 'Frost Acid', [-13, -3], [13, 23], [31, 41]],
  ['medium', 'Dusty Void', [-13, -3], [0, 10], [47, 57]],
  ['medium', 'Dragon Void', [25, 35], [1, 11], [55, 65]],
  ['medium', 'Rooted Night', [-18, -8], [14, 24], [55, 65]],
  ['hard', 'Phoenix Pulse', [57, 67], [0, 10], [37, 47]],
  ['hard', 'Slime Crown', [-5, 5], [45, 55], [3, 13]],
  ['hard', 'Void Flame', [25, 35], [0, 10], [60, 70]],
  ['hard', 'Acid Bog', [10, 20], [39, 49], [17, 27]],
  ['hard', 'Frozen Ash', [27, 37], [0, 10], [39, 49]],
  ['hard', 'Triple Eclipse', [-20, -10], [19, 29], [60, 70]],
  ['hard', 'Ember Soup', [62, 72], [24, 34], [37, 47]],
];

export const RECIPES: readonly IRecipe[] = RECIPE_ROWS.map(
  ([difficulty, name, temperature, density, magicPower]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    difficulty,
    temperature: { min: temperature[0], max: temperature[1] },
    density: { min: density[0], max: density[1] },
    magicPower: { min: magicPower[0], max: magicPower[1] },
  }),
);
