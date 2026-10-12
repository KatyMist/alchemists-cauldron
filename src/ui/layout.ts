import { requireElement } from './dom';

export interface ILayout {
  game: HTMLElement;
  helpButton: HTMLButtonElement;
  menuButton: HTMLButtonElement;
  score: HTMLElement;
  time: HTMLElement;
  timeBar: HTMLElement;
  timer: HTMLElement;
  lives: HTMLElement;
  shelf: HTMLElement;
  cauldronList: HTMLOListElement;
  message: HTMLElement;
  startButton: HTMLButtonElement;
  brewButton: HTMLButtonElement;
  pauseButton: HTMLButtonElement;
  recipeName: HTMLElement;
  recipeCounter: HTMLElement;
  bars: HTMLElement;
  helpDialog: HTMLDialogElement;
  menuDialog: HTMLDialogElement;
  pauseDialog: HTMLDialogElement;
  gameOverDialog: HTMLDialogElement;
  gameOverReason: HTMLElement;
  gameOverScore: HTMLElement;
  nameForm: HTMLFormElement;
  nameInput: HTMLInputElement;
  nameError: HTMLElement;
  savedMessage: HTMLElement;
  leaderboardDialog: HTMLDialogElement;
  leaderboardBody: HTMLElement;
  leaderboardEmpty: HTMLElement;
  clearLeaderboardButton: HTMLButtonElement;
  confirmDialog: HTMLDialogElement;
}

const LAYOUT_TEMPLATE = `
  <header class="header">
    <h1 class="header__title">Alchemist's Cauldron</h1>
    <div class="header__actions">
      <button class="button button--small" type="button" data-help>Help</button>
      <button class="button button--small" type="button" data-menu>Menu</button>
    </div>
  </header>

  <section class="hud" aria-label="Game status">
    <div class="hud__item">
      <span class="hud__label">Score</span>
      <span class="hud__value" data-score>0</span>
    </div>
    <div class="hud__item hud__item--timer" data-timer>
      <span class="hud__label">Time</span>
      <span class="hud__value" data-time>00:00</span>
      <span class="timer-bar"><span class="timer-bar__fill" data-time-bar></span></span>
    </div>
    <div class="hud__item">
      <span class="hud__label">Lives</span>
      <span class="lives" data-lives></span>
    </div>
  </section>

  <main class="game" data-game>
    <section class="panel shelf-panel" aria-labelledby="shelf-title">
      <h2 class="panel__title" id="shelf-title">Ingredient Shelf</h2>
      <div class="shelf" data-shelf></div>
    </section>

    <section class="panel cauldron-panel" aria-labelledby="cauldron-title">
      <h2 class="panel__title" id="cauldron-title">Cauldron</h2>
      <div class="cauldron">
        <div class="cauldron__pot">
          <ol class="cauldron__list" data-cauldron-list aria-label="Ingredients in the cauldron"></ol>
        </div>
      </div>
      <p class="message" data-message role="status" aria-live="polite"></p>
      <div class="actions">
        <button class="button button--primary" type="button" data-start>Start Game</button>
        <button class="button button--primary" type="button" data-brew>Brew</button>
        <button class="button" type="button" data-pause>Pause</button>
      </div>
    </section>

    <section class="panel recipe-panel" aria-labelledby="recipe-title">
      <h2 class="panel__title" id="recipe-title">Recipe</h2>
      <p class="recipe__name" data-recipe-name>Press Start Game</p>
      <p class="recipe__counter" data-recipe-counter>Ingredients: 0 / 0</p>
      <div class="bars" data-bars></div>
    </section>
  </main>

  <dialog class="dialog" data-help-dialog aria-labelledby="help-title">
    <h2 class="dialog__title" id="help-title">How to play</h2>
    <ol class="dialog__list">
      <li>Press <b>Start Game</b>. You get a random recipe with 3 target ranges.</li>
      <li>Click ingredients on the shelf to add them to the cauldron (up to 4).</li>
      <li>Every ingredient changes <b>Temperature</b>, <b>Density</b> and <b>Magic Power</b>.</li>
      <li>Move all 3 values into the target zones and press <b>Brew</b>. The check allows ±8.</li>
      <li>Success: +200 score, +10 s and a new recipe. Failure: −1 life.</li>
      <li>Ingredient stock is limited and never refilled.</li>
      <li>The game ends when time runs out, lives reach 0 or ingredients run out.</li>
    </ol>
    <div class="dialog__actions">
      <button class="button button--primary" type="button" data-close>Got it</button>
    </div>
  </dialog>

  <dialog class="dialog" data-menu-dialog aria-labelledby="menu-title">
    <h2 class="dialog__title" id="menu-title">Menu</h2>
    <div class="dialog__actions dialog__actions--column">
      <button class="button button--primary" type="button" data-new-game>New Game</button>
      <button class="button" type="button" data-open-leaderboard>Leaderboard</button>
      <button class="button" type="button" data-close>Close</button>
    </div>
  </dialog>

  <dialog class="dialog" data-pause-dialog aria-labelledby="pause-title">
    <h2 class="dialog__title" id="pause-title">Paused</h2>
    <p class="dialog__text">The timer is stopped.</p>
    <div class="dialog__actions dialog__actions--column">
      <button class="button button--primary" type="button" data-resume>Resume</button>
      <button class="button" type="button" data-exit>Exit to Menu</button>
    </div>
  </dialog>

  <dialog class="dialog" data-game-over-dialog aria-labelledby="game-over-title">
    <h2 class="dialog__title" id="game-over-title">Game Over</h2>
    <p class="dialog__text" data-game-over-reason></p>
    <p class="dialog__score">Score: <span data-game-over-score>0</span></p>
    <form class="name-form" data-name-form novalidate>
      <label class="name-form__label" for="player-name">New Top-10 result! Enter your name:</label>
      <div class="name-form__row">
        <input class="name-form__input" id="player-name" name="playerName" type="text"
          maxlength="15" autocomplete="nickname" placeholder="2–15 characters" data-name-input />
        <button class="button button--primary" type="submit">Save</button>
      </div>
      <p class="name-form__error" data-name-error></p>
    </form>
    <p class="dialog__text dialog__text--success" data-saved-message></p>
    <div class="dialog__actions">
      <button class="button button--primary" type="button" data-play-again>Play again</button>
      <button class="button" type="button" data-open-leaderboard>Leaderboard</button>
      <button class="button" type="button" data-exit>Menu</button>
    </div>
  </dialog>

  <dialog class="dialog dialog--wide" data-leaderboard-dialog aria-labelledby="leaderboard-title">
    <h2 class="dialog__title" id="leaderboard-title">Top-10 Alchemists</h2>
    <div class="leaderboard">
      <table class="leaderboard__table">
        <thead>
          <tr><th scope="col">#</th><th scope="col">Name</th><th scope="col">Score</th><th scope="col">Date</th></tr>
        </thead>
        <tbody data-leaderboard-body></tbody>
      </table>
      <p class="leaderboard__empty" data-leaderboard-empty>No results yet.</p>
    </div>
    <div class="dialog__actions">
      <button class="button button--danger" type="button" data-clear-leaderboard>Clear Leaderboard</button>
      <button class="button button--primary" type="button" data-close>Close</button>
    </div>
  </dialog>

  <dialog class="dialog" data-confirm-dialog aria-labelledby="confirm-title">
    <h2 class="dialog__title" id="confirm-title">Clear the leaderboard?</h2>
    <p class="dialog__text">All saved results will be deleted.</p>
    <div class="dialog__actions">
      <button class="button button--danger" type="button" data-confirm-yes>Clear</button>
      <button class="button" type="button" data-close>Cancel</button>
    </div>
  </dialog>
`;

export function createLayout(root: HTMLElement): ILayout {
  root.innerHTML = LAYOUT_TEMPLATE;

  const gameOverDialog = requireElement(root, '[data-game-over-dialog]', HTMLDialogElement);

  return {
    game: requireElement(root, '[data-game]', HTMLElement),
    helpButton: requireElement(root, '[data-help]', HTMLButtonElement),
    menuButton: requireElement(root, '[data-menu]', HTMLButtonElement),
    score: requireElement(root, '[data-score]', HTMLElement),
    time: requireElement(root, '[data-time]', HTMLElement),
    timeBar: requireElement(root, '[data-time-bar]', HTMLElement),
    timer: requireElement(root, '[data-timer]', HTMLElement),
    lives: requireElement(root, '[data-lives]', HTMLElement),
    shelf: requireElement(root, '[data-shelf]', HTMLElement),
    cauldronList: requireElement(root, '[data-cauldron-list]', HTMLOListElement),
    message: requireElement(root, '[data-message]', HTMLElement),
    startButton: requireElement(root, '[data-start]', HTMLButtonElement),
    brewButton: requireElement(root, '[data-brew]', HTMLButtonElement),
    pauseButton: requireElement(root, '[data-pause]', HTMLButtonElement),
    recipeName: requireElement(root, '[data-recipe-name]', HTMLElement),
    recipeCounter: requireElement(root, '[data-recipe-counter]', HTMLElement),
    bars: requireElement(root, '[data-bars]', HTMLElement),
    helpDialog: requireElement(root, '[data-help-dialog]', HTMLDialogElement),
    menuDialog: requireElement(root, '[data-menu-dialog]', HTMLDialogElement),
    pauseDialog: requireElement(root, '[data-pause-dialog]', HTMLDialogElement),
    gameOverDialog,
    gameOverReason: requireElement(gameOverDialog, '[data-game-over-reason]', HTMLElement),
    gameOverScore: requireElement(gameOverDialog, '[data-game-over-score]', HTMLElement),
    nameForm: requireElement(gameOverDialog, '[data-name-form]', HTMLFormElement),
    nameInput: requireElement(gameOverDialog, '[data-name-input]', HTMLInputElement),
    nameError: requireElement(gameOverDialog, '[data-name-error]', HTMLElement),
    savedMessage: requireElement(gameOverDialog, '[data-saved-message]', HTMLElement),
    leaderboardDialog: requireElement(root, '[data-leaderboard-dialog]', HTMLDialogElement),
    leaderboardBody: requireElement(root, '[data-leaderboard-body]', HTMLElement),
    leaderboardEmpty: requireElement(root, '[data-leaderboard-empty]', HTMLElement),
    clearLeaderboardButton: requireElement(root, '[data-clear-leaderboard]', HTMLButtonElement),
    confirmDialog: requireElement(root, '[data-confirm-dialog]', HTMLDialogElement),
  };
}
