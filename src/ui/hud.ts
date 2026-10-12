import type { IDifficultySettings, IGameState } from '../types/game';
import { DANGER_TIME_MS, formatTime, MS_IN_SECOND } from '../logic/timer';
import { createElement } from './dom';
import { UI_ICONS } from './layout';
import type { ILayout } from './layout';

export function renderTimer(
  layout: ILayout,
  state: IGameState,
  settings: IDifficultySettings,
): void {
  const isActive = state.status !== 'menu';
  const startTimeMs = settings.startTime * MS_IN_SECOND;
  const ratio = isActive ? state.timeLeft / startTimeMs : 0;

  layout.time.textContent = formatTime(isActive ? state.timeLeft : 0);
  layout.timeBar.style.width = `${String(Math.min(ratio, 1) * 100)}%`;
  layout.timer.classList.toggle(
    'topbar__panel--danger',
    state.status === 'playing' && state.timeLeft < DANGER_TIME_MS,
  );
}

export function renderLives(container: HTMLElement, lives: number): void {
  const hearts: HTMLElement[] = [];

  for (let index = 0; index < lives; index += 1) {
    const heart = createElement('span', 'lives__heart');
    heart.innerHTML = UI_ICONS.heart;
    hearts.push(heart);
  }

  container.replaceChildren(...hearts);
  container.setAttribute('aria-label', `${String(lives)} lives`);
}

export function renderHud(layout: ILayout, state: IGameState, settings: IDifficultySettings): void {
  layout.score.textContent = String(state.score);
  renderTimer(layout, state, settings);
  renderLives(layout.lives, state.lives);
}
