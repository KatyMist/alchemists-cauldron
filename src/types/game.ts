export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameStatus = 'menu' | 'playing' | 'paused' | 'game-over';

export type GameOverReason = 'time' | 'lives' | 'ingredients';

export type IngredientIcon =
  'drop' | 'sparkle' | 'snowflake' | 'root' | 'flask' | 'void' | 'feather' | 'slime';

export interface ICauldronValues {
  temperature: number;
  density: number;
  magicPower: number;
}

export type ParameterKey = keyof ICauldronValues;

export interface IIngredient extends ICauldronValues {
  id: string;
  name: string;
  icon: IngredientIcon;
}

export interface IRecipeRange {
  min: number;
  max: number;
}

export interface IRecipe {
  id: string;
  name: string;
  difficulty: Difficulty;
  temperature: IRecipeRange;
  density: IRecipeRange;
  magicPower: IRecipeRange;
}

export interface IParameter {
  key: ParameterKey;
  label: string;
  min: number;
  max: number;
}

export interface IDifficultySettings {
  shelfSize: number;
  maxCauldronIngredients: number;
  startTime: number;
  tolerance: number;
  lives: number;
  scorePerBrew: number;
  timeBonus: number;
  reactionCount: number;
}

export type ShelfStock = Record<string, number>;

export interface IGameState {
  status: GameStatus;
  difficulty: Difficulty;
  score: number;
  timeLeft: number;
  endTime: number | null;
  lives: number;
  activeRecipe: IRecipe | null;
  cauldronIngredients: IIngredient[];
  shelfStock: ShelfStock;
  gameOverReason: GameOverReason | null;
}

export interface IBrewResult {
  state: IGameState;
  isSuccess: boolean;
}

export interface ILeaderboardEntry {
  name: string;
  score: number;
  date: number;
}
