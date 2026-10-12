import type { Difficulty, ICauldronValues, IIngredient, IReaction } from '../types/game';
import { REACTION_SETS, REACTIONS } from '../data/reactions';
import { calculateCauldron } from './calculate-cauldron';

export function getReactions(difficulty: Difficulty): readonly IReaction[] {
  const ids = REACTION_SETS[difficulty];
  return REACTIONS.filter((reaction) => ids.includes(reaction.id));
}

export function calculateWithReactions(
  ingredients: readonly IIngredient[],
  difficulty: Difficulty,
): ICauldronValues {
  return getReactions(difficulty)
    .filter((reaction) => reaction.isActive(ingredients))
    .reduce((values, reaction) => reaction.apply(values), calculateCauldron(ingredients));
}

export function findFiredReactions(
  before: readonly IIngredient[],
  after: readonly IIngredient[],
  difficulty: Difficulty,
): IReaction[] {
  return getReactions(difficulty).filter(
    (reaction) => !reaction.isActive(before) && reaction.isActive(after),
  );
}
