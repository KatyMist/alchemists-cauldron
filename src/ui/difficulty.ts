import type { Difficulty, IDifficultySettings } from '../types/game';
import { DIFFICULTIES, DIFFICULTY_LABELS, DIFFICULTY_SETTINGS } from '../data/difficulty';
import { createElement } from './dom';

export function describeDifficulty(settings: IDifficultySettings): string {
  return [
    `${String(settings.shelfSize)} ingredients`,
    `${String(settings.startTime)} s`,
    `±${String(settings.tolerance)}`,
    `${String(settings.lives)} lives`,
    `+${String(settings.scorePerBrew)}`,
  ].join(' · ');
}

export function renderDifficultyOptions(
  container: HTMLElement,
  selected: Difficulty,
  onSelect: (difficulty: Difficulty) => void,
): void {
  container.replaceChildren(
    ...DIFFICULTIES.map((difficulty) => {
      const button = createElement('button', 'difficulty__option');
      button.type = 'button';
      button.setAttribute('aria-pressed', String(difficulty === selected));
      button.append(
        createElement('span', 'difficulty__name', DIFFICULTY_LABELS[difficulty]),
        createElement(
          'span',
          'difficulty__details',
          describeDifficulty(DIFFICULTY_SETTINGS[difficulty]),
        ),
      );
      button.addEventListener('click', () => {
        onSelect(difficulty);
      });
      return button;
    }),
  );
}

export function renderBoardTabs(
  container: HTMLElement,
  selected: Difficulty,
  onSelect: (difficulty: Difficulty) => void,
): void {
  container.replaceChildren(
    ...DIFFICULTIES.map((difficulty) => {
      const tab = createElement('button', 'tabs__tab', DIFFICULTY_LABELS[difficulty]);
      tab.type = 'button';
      tab.setAttribute('aria-pressed', String(difficulty === selected));
      tab.addEventListener('click', () => {
        onSelect(difficulty);
      });
      return tab;
    }),
  );
}
