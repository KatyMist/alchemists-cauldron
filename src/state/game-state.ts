import type {
  Difficulty,
  GameOverReason,
  IActionResult,
  IBrewResult,
  IDifficultySettings,
  IGameState,
  IIngredient,
  ISaveData,
} from '../types/game';
import { INGREDIENTS } from '../data/ingredients';
import { checkBrew } from '../logic/brew-check';
import { addIngredient } from '../logic/cauldron';
import { calculateWithReactions, findFiredReactions } from '../logic/reactions';
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
    lastReactionId: null,
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
    lastReactionId: null,
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

  const values = calculateWithReactions(timedState.cauldronIngredients, timedState.difficulty);
  const isSuccess = checkBrew(values, timedState.activeRecipe, settings.tolerance);
  const clearedState: IGameState = {
    ...timedState,
    cauldronIngredients: [],
    lastReactionId: null,
  };
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

export function restoreGameState(save: ISaveData): IGameState {
  return {
    status: 'paused',
    difficulty: save.difficulty,
    score: save.score,
    timeLeft: save.timeLeft,
    endTime: null,
    lives: save.lives,
    activeRecipe: save.activeRecipe,
    cauldronIngredients: save.cauldronIngredients,
    shelfStock: save.shelfStock,
    gameOverReason: null,
    lastReactionId: null,
  };
}

export const POUR_OUT_PENALTY_S = 10;

function removeTime(state: IGameState, seconds: number, now: number): IGameState {
  const timeLeft = Math.max(0, state.timeLeft - seconds * MS_IN_SECOND);
  return { ...state, timeLeft, endTime: now + timeLeft };
}

function checkGameOver(state: IGameState): IGameState {
  if (state.lives <= 0) {
    return endGame(state, 'lives');
  }

  if (state.timeLeft <= 0) {
    return endGame(state, 'time');
  }

  if (state.cauldronIngredients.length === 0 && isShelfEmpty(state.shelfStock)) {
    return endGame(state, 'ingredients');
  }

  return state;
}

export function addToCauldron(
  state: IGameState,
  ingredientId: string,
  settings: IDifficultySettings,
  now: number,
): IActionResult {
  const timedState = updateTime(state, now);
  const added = addIngredient(timedState, ingredientId, settings);

  if (added === timedState) {
    return { state: timedState, fired: [] };
  }

  const fired = findFiredReactions(
    timedState.cauldronIngredients,
    added.cauldronIngredients,
    added.difficulty,
  );

  const nextState = fired.reduce<IGameState>((current, reaction) => {
    const effects = reaction.onFire ?? {};
    let updated: IGameState = { ...current, lastReactionId: reaction.id };

    if (effects.timePenalty !== undefined) {
      updated = removeTime(updated, effects.timePenalty, now);
    }

    if (effects.lifePenalty !== undefined) {
      updated = { ...updated, lives: updated.lives - effects.lifePenalty };
    }

    if (effects.clearCauldron === true) {
      updated = { ...updated, cauldronIngredients: [] };
    }

    return updated;
  }, added);

  return { state: checkGameOver(nextState), fired };
}

export function pourOut(state: IGameState, now: number): IGameState {
  const timedState = updateTime(state, now);

  if (timedState.status !== 'playing' || timedState.cauldronIngredients.length === 0) {
    return timedState;
  }

  const poured = removeTime(
    { ...timedState, cauldronIngredients: [], lastReactionId: null },
    POUR_OUT_PENALTY_S,
    now,
  );

  return checkGameOver(poured);
}
