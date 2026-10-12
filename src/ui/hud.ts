import type { IDifficultySettings, IGameState } from '../types/game';
import { DANGER_TIME_MS, formatTime, MS_IN_SECOND } from '../logic/timer';
import { createElement } from './dom';
import type { ILayout } from './layout';

const HEART_SVG =
  '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.2 0 3.6 1.2 5.2 3 1.6-1.8 3-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/></svg>';

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
    'hud__item--danger',
    state.status === 'playing' && state.timeLeft < DANGER_TIME_MS,
  );
}

export function renderLives(container: HTMLElement, lives: number): void {
  const hearts: HTMLElement[] = [];

  for (let index = 0; index < lives; index += 1) {
    const heart = createElement('span', 'lives__heart');
    heart.innerHTML = HEART_SVG;
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
