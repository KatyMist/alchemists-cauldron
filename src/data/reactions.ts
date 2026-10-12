import type { Difficulty, ICauldronValues, IIngredient, IReaction } from '../types/game';
import { calculateCauldron } from '../logic/calculate-cauldron';

function has(ingredients: readonly IIngredient[], ...ids: string[]): boolean {
  return ids.every((id) => ingredients.some((ingredient) => ingredient.id === id));
}

function percent(value: number, change: number): number {
  return Math.round(value * (1 + change / 100));
}

function total(ingredients: readonly IIngredient[]): ICauldronValues {
  return calculateCauldron(ingredients);
}

export const REACTIONS: readonly IReaction[] = [
  {
    id: 'bubbling',
    name: 'Bubbling',
    difficulty: 'medium',
    description: 'Magic Power +50%, −10 s',
    isActive: (items) => has(items, 'fairy-dust', 'caustic-acid'),
    apply: (values) => ({ ...values, magicPower: percent(values.magicPower, 50) }),
    onFire: { timePenalty: 10 },
  },
  {
    id: 'volatile-mix',
    name: 'Volatile Mix',
    difficulty: 'hard',
    description: '−1 life, the cauldron is cleared',
    isActive: (items) => has(items, 'phoenix-feather', 'essence-of-the-void'),
    apply: (values) => values,
    onFire: { lifePenalty: 1, clearCauldron: true },
  },
  {
    id: 'solar-frost',
    name: 'Solar Frost',
    difficulty: 'medium',
    description: 'Temperature = 0, Density +20%',
    isActive: (items) => has(items, 'dragon-tears', 'frost-lotus'),
    apply: (values) => ({ ...values, temperature: 0, density: percent(values.density, 20) }),
  },
  {
    id: 'rooted-steam',
    name: 'Rooted Steam',
    difficulty: 'hard',
    description: 'Density +25%, Magic Power −10%',
    isActive: (items) => has(items, 'mandrake-root', 'toad-slime'),
    apply: (values) => ({
      ...values,
      density: percent(values.density, 25),
      magicPower: percent(values.magicPower, -10),
    }),
  },
  {
    id: 'ashen-bloom',
    name: 'Ashen Bloom',
    difficulty: 'hard',
    description: 'Temperature +10, Magic Power +25%',
    isActive: (items) => has(items, 'phoenix-feather', 'fairy-dust'),
    apply: (values) => ({
      ...values,
      temperature: values.temperature + 10,
      magicPower: percent(values.magicPower, 25),
    }),
  },
  {
    id: 'annihilation',
    name: 'Annihilation',
    difficulty: 'hard',
    description: 'Temperature = 0, Density ×2',
    isActive: (items) =>
      items.some((item) => item.temperature > 15) && items.some((item) => item.temperature < -15),
    apply: (values) => ({ ...values, temperature: 0, density: values.density * 2 }),
  },
  {
    id: 'pressure-spike',
    name: 'Pressure Spike',
    difficulty: 'hard',
    description: 'Density = 70, Magic Power +10%',
    isActive: (items) => total(items).density >= 70,
    apply: (values) => ({ ...values, density: 70, magicPower: percent(values.magicPower, 10) }),
  },
  {
    id: 'magma-flux',
    name: 'Magma Flux',
    difficulty: 'hard',
    description: 'Magic Power +20%, Density −10%',
    isActive: (items) => total(items).temperature >= 60,
    apply: (values) => ({
      ...values,
      magicPower: percent(values.magicPower, 20),
      density: percent(values.density, -10),
    }),
  },
  {
    id: 'deep-freeze',
    name: 'Deep Freeze',
    difficulty: 'medium',
    description: 'Density +15%, Magic Power −15%',
    isActive: (items) => total(items).temperature <= -20,
    apply: (values) => ({
      ...values,
      density: percent(values.density, 15),
      magicPower: percent(values.magicPower, -15),
    }),
  },
  {
    id: 'arcane-saturation',
    name: 'Arcane Saturation',
    difficulty: 'medium',
    description: 'Magic Power = 80, Temperature +5',
    isActive: (items) => total(items).magicPower >= 80,
    apply: (values) => ({ ...values, magicPower: 80, temperature: values.temperature + 5 }),
  },
  {
    id: 'steam-burst',
    name: 'Steam Burst',
    difficulty: 'medium',
    description: 'Temperature +10, −5 s',
    isActive: (items) =>
      has(items, 'dragon-tears', 'caustic-acid') && total(items).temperature >= 35,
    apply: (values) => ({ ...values, temperature: values.temperature + 10 }),
    onFire: { timePenalty: 5 },
  },
  {
    id: 'black-ice',
    name: 'Black Ice',
    difficulty: 'medium',
    description: 'Temperature −10, Magic Power +20%',
    isActive: (items) =>
      has(items, 'frost-lotus', 'essence-of-the-void') && total(items).density <= 0,
    apply: (values) => ({
      ...values,
      temperature: values.temperature - 10,
      magicPower: percent(values.magicPower, 20),
    }),
  },
  {
    id: 'heavy-spark',
    name: 'Heavy Spark',
    difficulty: 'hard',
    description: 'Density +20%, Magic Power +10%',
    isActive: (items) => has(items, 'fairy-dust', 'toad-slime') && total(items).density >= 40,
    apply: (values) => ({
      ...values,
      density: percent(values.density, 20),
      magicPower: percent(values.magicPower, 10),
    }),
  },
  {
    id: 'burning-root',
    name: 'Burning Root',
    difficulty: 'hard',
    description: 'Temperature +15, Density −10%',
    isActive: (items) =>
      has(items, 'mandrake-root', 'phoenix-feather') && total(items).temperature >= 40,
    apply: (values) => ({
      ...values,
      temperature: values.temperature + 15,
      density: percent(values.density, -10),
    }),
  },
  {
    id: 'void-resonance',
    name: 'Void Resonance',
    difficulty: 'medium',
    description: 'Magic Power +30%, Temperature −5',
    isActive: (items) =>
      has(items, 'essence-of-the-void', 'dragon-tears') && total(items).magicPower >= 50,
    apply: (values) => ({
      ...values,
      magicPower: percent(values.magicPower, 30),
      temperature: values.temperature - 5,
    }),
  },
];

export const REACTION_SETS: Readonly<Record<Difficulty, readonly string[]>> = {
  easy: [],
  medium: ['bubbling', 'solar-frost'],
  hard: ['volatile-mix', 'rooted-steam', 'annihilation'],
};
