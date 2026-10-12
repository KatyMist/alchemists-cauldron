import './styles/style.css';
import type { Difficulty, GameOverReason, IDifficultySettings } from './types/game';
import { DIFFICULTY_LABELS, DIFFICULTY_SETTINGS } from './data/difficulty';
import { addIngredient, isCauldronFull } from './logic/cauldron';
import { calculateCauldron } from './logic/calculate-cauldron';
import { isValidPlayerName, normalizePlayerName } from './logic/player-name';
import {
  brewPotion,
  createMenuState,
  createNewGameState,
  getShelfIngredients,
  pauseGame,
  restoreGameState,
  resumeGame,
  updateTime,
} from './state/game-state';
import {
  addLeaderboardEntry,
  clearLeaderboard,
  isTopScore,
  loadLeaderboard,
} from './storage/leaderboard';
import { clearSave, loadGame, saveGame } from './storage/save';
import { loadDifficulty, saveDifficulty } from './storage/settings';
import { createBars, updateBars } from './ui/bars';
import { renderCauldron } from './ui/cauldron';
import { renderBoardTabs, renderDifficultyOptions } from './ui/difficulty';
import { requireElement } from './ui/dom';
import { renderHud, renderTimer } from './ui/hud';
import { createLayout } from './ui/layout';
import { renderLeaderboard } from './ui/leaderboard';
import { renderRecipe } from './ui/recipe';
import { renderShelf } from './ui/shelf';

const TICK_MS = 250;
const SAVE_INTERVAL_MS = 1000;

const GAME_OVER_TEXT: Readonly<Record<GameOverReason, string>> = {
  time: 'Time is up!',
  lives: 'No lives left!',
  ingredients: 'Out of ingredients',
};

const layout = createLayout(requireElement(document, '#app', HTMLDivElement));
const bars = createBars(layout.bars);
let state = createMenuState(loadDifficulty());
let hasContinue = loadGame() !== null;
let boardDifficulty: Difficulty = state.difficulty;
let lastSaveTime = 0;

function getSettings(): IDifficultySettings {
  return DIFFICULTY_SETTINGS[state.difficulty];
}

function isRunning(): boolean {
  return state.status === 'playing' || state.status === 'paused';
}

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

function persist(): void {
  if (isRunning()) {
    saveGame(state);
    lastSaveTime = Date.now();
  } else if (state.status === 'game-over') {
    clearSave();
    hasContinue = false;
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

function renderHelp(settings: IDifficultySettings): void {
  layout.helpCapacity.textContent = String(settings.maxCauldronIngredients);
  layout.helpTolerance.textContent = String(settings.tolerance);
  layout.helpScore.textContent = String(settings.scorePerBrew);
  layout.helpBonus.textContent = String(settings.timeBonus);
}

function renderMenu(): void {
  const running = isRunning();

  renderDifficultyOptions(layout.difficultyOptions, state.difficulty, selectDifficulty);
  layout.difficultyPanel.disabled = running;
  layout.difficultyPanel.hidden = running;
  layout.difficultyLocked.hidden = !running;
  layout.resumeFromMenuButton.hidden = state.status !== 'paused';
  layout.continueButtons.forEach((button) => {
    button.hidden = running || !hasContinue;
  });
}

function render(): void {
  const settings = getSettings();
  const isPlaying = state.status === 'playing';
  const running = isRunning();

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
  renderHelp(settings);
  renderMenu();

  layout.startButton.hidden = running;
  requireElement(layout.startButton, '.brew-button__text', HTMLElement).textContent =
    state.status === 'game-over' ? 'Play again' : 'Start Game';
  layout.brewButton.hidden = !running;
  layout.pauseButton.hidden = !running;
  layout.brewButton.disabled = !isPlaying || state.cauldronIngredients.length === 0;
  layout.pauseButton.disabled = !isPlaying;
  layout.difficultyBadge.textContent = DIFFICULTY_LABELS[state.difficulty];
  layout.game.classList.toggle('game--paused', state.status === 'paused');

  persist();
}

function selectDifficulty(difficulty: Difficulty): void {
  if (isRunning()) {
    return;
  }

  saveDifficulty(difficulty);
  state = createMenuState(difficulty);
  clearMessage();
  render();
}

function showGameOver(): void {
  if (state.gameOverReason === null) {
    return;
  }

  const canSave = isTopScore(state.score, state.difficulty);

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
  state = createNewGameState(state.difficulty, getSettings(), Date.now());
  hasContinue = false;
  clearMessage();
  render();
}

function continueGame(): void {
  const save = loadGame();
  closeDialog(layout.menuDialog);
  hasContinue = false;

  if (save === null) {
    render();
    return;
  }

  state = restoreGameState(save);
  clearMessage();
  render();
  openDialog(layout.pauseDialog);
}

function exitToMenu(): void {
  closeDialog(layout.pauseDialog);
  closeDialog(layout.gameOverDialog);
  clearSave();
  hasContinue = false;
  state = createMenuState(state.difficulty);
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

  renderTimer(layout, state, getSettings());

  if (Date.now() - lastSaveTime >= SAVE_INTERVAL_MS) {
    persist();
  }
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

  state = addIngredient(state, ingredientId, getSettings());
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

  const settings = getSettings();
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

function renderBoard(): void {
  const entries = loadLeaderboard(boardDifficulty);

  renderBoardTabs(layout.boardTabs, boardDifficulty, (difficulty) => {
    boardDifficulty = difficulty;
    renderBoard();
  });
  renderLeaderboard(layout.leaderboardBody, layout.leaderboardEmpty, entries);
  layout.clearLeaderboardButton.disabled = entries.length === 0;
  layout.confirmDifficulty.textContent = DIFFICULTY_LABELS[boardDifficulty];
}

function openLeaderboard(): void {
  boardDifficulty = state.difficulty;
  renderBoard();
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
    difficulty: state.difficulty,
  });

  layout.nameForm.hidden = true;
  layout.savedMessage.textContent = `Saved! Your rank: ${String(rank)}`;
}

function bindEvents(): void {
  layout.startButton.addEventListener('click', startGame);
  layout.brewButton.addEventListener('click', handleBrew);
  layout.pauseButton.addEventListener('click', pause);
  layout.continueButtons.forEach((button) => {
    button.addEventListener('click', continueGame);
  });
  layout.menuButton.addEventListener('click', () => {
    if (state.status === 'playing') {
      state = pauseGame(state, Date.now());
      render();
    }

    renderMenu();
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
      clearLeaderboard(boardDifficulty);
      closeDialog(layout.confirmDialog);
      renderBoard();
    },
  );

  layout.nameForm.addEventListener('submit', handleNameSubmit);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.status === 'playing') {
      pause();
    }
  });
  window.addEventListener('pagehide', () => {
    state = updateTime(state, Date.now());
    persist();
  });
}

bindEvents();
render();
window.setInterval(tick, TICK_MS);
