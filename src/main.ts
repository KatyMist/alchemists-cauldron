import './styles/style.css';
import type { GameOverReason } from './types/game';
import { DEFAULT_DIFFICULTY, DIFFICULTY_SETTINGS } from './data/difficulty';
import { addIngredient, isCauldronFull } from './logic/cauldron';
import { calculateCauldron } from './logic/calculate-cauldron';
import { isValidPlayerName, normalizePlayerName } from './logic/player-name';
import {
  brewPotion,
  createMenuState,
  createNewGameState,
  getShelfIngredients,
  pauseGame,
  resumeGame,
  updateTime,
} from './state/game-state';
import {
  addLeaderboardEntry,
  clearLeaderboard,
  isTopScore,
  loadLeaderboard,
} from './storage/leaderboard';
import { createBars, updateBars } from './ui/bars';
import { renderCauldron } from './ui/cauldron';
import { requireElement } from './ui/dom';
import { renderHud, renderTimer } from './ui/hud';
import { createLayout } from './ui/layout';
import { renderLeaderboard } from './ui/leaderboard';
import { renderRecipe } from './ui/recipe';
import { renderShelf } from './ui/shelf';

const TICK_MS = 250;

const GAME_OVER_TEXT: Readonly<Record<GameOverReason, string>> = {
  time: 'Time is up!',
  lives: 'No lives left!',
  ingredients: 'Out of ingredients',
};

const difficulty = DEFAULT_DIFFICULTY;
const settings = DIFFICULTY_SETTINGS[difficulty];
const layout = createLayout(requireElement(document, '#app', HTMLDivElement));
const bars = createBars(layout.bars);
let state = createMenuState(difficulty);

function openDialog(dialog: HTMLDialogElement): void {
  if (!dialog.open) {
    dialog.showModal();
  }
}

function closeDialog(dialog: HTMLDialogElement): void {
  if (dialog.open) {
    dialog.close();
  }
}

function showMessage(text: string, type: 'success' | 'fail'): void {
  layout.message.textContent = text;
  layout.message.className = 'message';
  layout.message.getBoundingClientRect();
  layout.message.classList.add(`message--${type}`);
}

function clearMessage(): void {
  layout.message.textContent = '';
  layout.message.className = 'message';
}

function render(): void {
  const isPlaying = state.status === 'playing';
  const isRunning = isPlaying || state.status === 'paused';

  renderHud(layout, state, settings);
  renderShelf(layout.shelf, {
    ingredients: getShelfIngredients(settings),
    stock: state.shelfStock,
    isBlocked: !isPlaying || isCauldronFull(state, settings),
    onAdd: handleAdd,
  });
  renderCauldron(
    layout.cauldron,
    layout.cauldronList,
    state.cauldronIngredients,
    settings.maxCauldronIngredients,
  );
  renderRecipe(layout, state, settings);
  updateBars(
    bars,
    calculateCauldron(state.cauldronIngredients),
    state.activeRecipe,
    settings.tolerance,
  );

  layout.startButton.hidden = isRunning;
  requireElement(layout.startButton, '.brew-button__text', HTMLElement).textContent =
    state.status === 'game-over' ? 'Play again' : 'Start Game';
  layout.brewButton.hidden = !isRunning;
  layout.pauseButton.hidden = !isRunning;
  layout.brewButton.disabled = !isPlaying || state.cauldronIngredients.length === 0;
  layout.pauseButton.disabled = !isPlaying;
  layout.game.classList.toggle('game--paused', state.status === 'paused');
}

function showGameOver(): void {
  if (state.gameOverReason === null) {
    return;
  }

  const canSave = isTopScore(state.score);

  layout.gameOverReason.textContent = GAME_OVER_TEXT[state.gameOverReason];
  layout.gameOverScore.textContent = String(state.score);
  layout.nameForm.hidden = !canSave;
  layout.nameInput.value = '';
  layout.nameError.textContent = '';
  layout.savedMessage.textContent = '';
  openDialog(layout.gameOverDialog);

  if (canSave) {
    layout.nameInput.focus();
  }
}

function startGame(): void {
  closeDialog(layout.gameOverDialog);
  closeDialog(layout.menuDialog);
  state = createNewGameState(difficulty, settings, Date.now());
  clearMessage();
  render();
}

function exitToMenu(): void {
  closeDialog(layout.pauseDialog);
  closeDialog(layout.gameOverDialog);
  state = createMenuState(difficulty);
  clearMessage();
  render();
}

function tick(): void {
  if (state.status !== 'playing') {
    return;
  }

  state = updateTime(state, Date.now());

  if (state.status === 'game-over') {
    render();
    showGameOver();
    return;
  }

  renderTimer(layout, state, settings);
}

function pause(): void {
  state = pauseGame(state, Date.now());
  render();

  if (state.status === 'paused') {
    openDialog(layout.pauseDialog);
  } else if (state.status === 'game-over') {
    showGameOver();
  }
}

function resume(): void {
  closeDialog(layout.pauseDialog);
  state = resumeGame(state, Date.now());
  render();
}

function handleAdd(ingredientId: string): void {
  if (state.status !== 'playing') {
    return;
  }

  state = addIngredient(state, ingredientId, settings);
  render();

  const card = layout.shelf.querySelector<HTMLButtonElement>(`[data-id="${ingredientId}"]`);

  if (card && !card.disabled) {
    card.focus();
  }
}

function handleBrew(): void {
  tick();

  if (state.status !== 'playing') {
    return;
  }

  const result = brewPotion(state, settings, Date.now());
  state = result.state;

  if (result.isSuccess) {
    showMessage(`Potion brewed! +${String(settings.scorePerBrew)} score`, 'success');
  } else {
    showMessage('The potion failed. −1 life', 'fail');
  }

  render();

  if (state.status === 'game-over') {
    showGameOver();
  }
}

function openLeaderboard(): void {
  const entries = loadLeaderboard();

  renderLeaderboard(layout.leaderboardBody, layout.leaderboardEmpty, entries);
  layout.clearLeaderboardButton.disabled = entries.length === 0;
  openDialog(layout.leaderboardDialog);
}

function handleNameSubmit(event: SubmitEvent): void {
  event.preventDefault();

  if (!isValidPlayerName(layout.nameInput.value)) {
    layout.nameError.textContent = 'Use 2–15 characters: letters, digits, space, _ or -.';
    layout.nameInput.focus();
    return;
  }

  const rank = addLeaderboardEntry({
    name: normalizePlayerName(layout.nameInput.value),
    score: state.score,
    date: Date.now(),
  });

  layout.nameForm.hidden = true;
  layout.savedMessage.textContent = `Saved! Your rank: ${String(rank)}`;
}

function bindEvents(): void {
  layout.startButton.addEventListener('click', startGame);
  layout.brewButton.addEventListener('click', handleBrew);
  layout.pauseButton.addEventListener('click', pause);
  layout.menuButton.addEventListener('click', () => {
    if (state.status === 'playing') {
      state = pauseGame(state, Date.now());
      render();
    }

    layout.resumeFromMenuButton.hidden = state.status !== 'paused';
    openDialog(layout.menuDialog);
  });
  layout.resumeFromMenuButton.addEventListener('click', () => {
    closeDialog(layout.menuDialog);
    resume();
  });
  layout.menuDialog.addEventListener('close', () => {
    if (state.status === 'paused') {
      openDialog(layout.pauseDialog);
    }
  });
  layout.helpButton.addEventListener('click', () => {
    if (state.status === 'playing') {
      state = pauseGame(state, Date.now());
      render();
    }

    openDialog(layout.helpDialog);
  });
  layout.helpDialog.addEventListener('close', () => {
    if (state.status === 'paused') {
      openDialog(layout.pauseDialog);
    }
  });

  requireElement(layout.menuDialog, '[data-new-game]', HTMLButtonElement).addEventListener(
    'click',
    startGame,
  );
  requireElement(layout.pauseDialog, '[data-resume]', HTMLButtonElement).addEventListener(
    'click',
    resume,
  );
  layout.pauseDialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    resume();
  });
  requireElement(layout.gameOverDialog, '[data-play-again]', HTMLButtonElement).addEventListener(
    'click',
    startGame,
  );

  document.querySelectorAll<HTMLButtonElement>('[data-exit]').forEach((button) => {
    button.addEventListener('click', exitToMenu);
  });
  document.querySelectorAll<HTMLButtonElement>('[data-open-leaderboard]').forEach((button) => {
    button.addEventListener('click', openLeaderboard);
  });
  document.querySelectorAll<HTMLButtonElement>('[data-close]').forEach((button) => {
    button.addEventListener('click', () => {
      const dialog = button.closest('dialog');

      if (dialog) {
        closeDialog(dialog);
      }
    });
  });

  layout.clearLeaderboardButton.addEventListener('click', () => {
    openDialog(layout.confirmDialog);
  });
  requireElement(layout.confirmDialog, '[data-confirm-yes]', HTMLButtonElement).addEventListener(
    'click',
    () => {
      clearLeaderboard();
      closeDialog(layout.confirmDialog);
      openLeaderboard();
    },
  );

  layout.nameForm.addEventListener('submit', handleNameSubmit);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.status === 'playing') {
      pause();
    }
  });
}

bindEvents();
render();
window.setInterval(tick, TICK_MS);
