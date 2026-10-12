import type {
  Difficulty,
  GameOverReason,
  IBrewResult,
  IDifficultySettings,
  IGameState,
  IIngredient,
} from '../types/game';
import { INGREDIENTS } from '../data/ingredients';
import { checkBrew } from '../logic/brew-check';
import { calculateCauldron } from '../logic/calculate-cauldron';
import { pickRecipe } from '../logic/recipe-generator';
import { createStock, isShelfEmpty } from '../logic/stock';
import { addTimeBonus, getTimeLeft, MS_IN_SECOND } from '../logic/timer';

export function getShelfIngredients(settings: IDifficultySettings): readonly IIngredient[] {
  return INGREDIENTS.slice(0, settings.shelfSize);
}

export function createMenuState(difficulty: Difficulty): IGameState {
  return {
    status: 'menu',
    difficulty,
    score: 0,
    timeLeft: 0,
    endTime: null,
    lives: 0,
    activeRecipe: null,
    cauldronIngredients: [],
    shelfStock: {},
    gameOverReason: null,
  };
}

export function createNewGameState(
  difficulty: Difficulty,
  settings: IDifficultySettings,
  now: number,
): IGameState {
  const timeLeft = settings.startTime * MS_IN_SECOND;

  return {
    status: 'playing',
    difficulty,
    score: 0,
    timeLeft,
    endTime: now + timeLeft,
    lives: settings.lives,
    activeRecipe: pickRecipe(difficulty),
    cauldronIngredients: [],
    shelfStock: createStock(getShelfIngredients(settings)),
    gameOverReason: null,
  };
}

export function endGame(state: IGameState, reason: GameOverReason): IGameState {
  return { ...state, status: 'game-over', endTime: null, gameOverReason: reason };
}

export function updateTime(state: IGameState, now: number): IGameState {
  if (state.status !== 'playing' || state.endTime === null) {
    return state;
  }

  const timeLeft = getTimeLeft(state.endTime, now);
  const nextState = { ...state, timeLeft };

  return timeLeft <= 0 ? endGame(nextState, 'time') : nextState;
}

export function pauseGame(state: IGameState, now: number): IGameState {
  if (state.status !== 'playing') {
    return state;
  }

  const timedState = updateTime(state, now);

  if (timedState.status !== 'playing') {
    return timedState;
  }

  return { ...timedState, status: 'paused', endTime: null };
}

export function resumeGame(state: IGameState, now: number): IGameState {
  if (state.status !== 'paused') {
    return state;
  }

  return { ...state, status: 'playing', endTime: now + state.timeLeft };
}

export function brewPotion(
  state: IGameState,
  settings: IDifficultySettings,
  now: number,
): IBrewResult {
  const timedState = updateTime(state, now);

  if (
    timedState.status !== 'playing' ||
    timedState.activeRecipe === null ||
    timedState.cauldronIngredients.length === 0
  ) {
    return { state: timedState, isSuccess: false };
  }

  const values = calculateCauldron(timedState.cauldronIngredients);
  const isSuccess = checkBrew(values, timedState.activeRecipe, settings.tolerance);
  const clearedState: IGameState = { ...timedState, cauldronIngredients: [] };
  let nextState: IGameState;

  if (isSuccess) {
    const timeLeft = addTimeBonus(
      timedState.timeLeft,
      settings.timeBonus * MS_IN_SECOND,
      settings.startTime * MS_IN_SECOND,
    );

    nextState = {
      ...clearedState,
      score: timedState.score + settings.scorePerBrew,
      timeLeft,
      endTime: now + timeLeft,
      activeRecipe: pickRecipe(timedState.difficulty),
    };
  } else {
    nextState = { ...clearedState, lives: timedState.lives - 1 };
  }

  if (nextState.lives <= 0) {
    return { state: endGame(nextState, 'lives'), isSuccess };
  }

  if (isShelfEmpty(nextState.shelfStock)) {
    return { state: endGame(nextState, 'ingredients'), isSuccess };
  }

  return { state: nextState, isSuccess };
}
