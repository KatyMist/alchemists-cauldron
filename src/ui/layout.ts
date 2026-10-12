import type { ParameterKey } from '../types/game';
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
  cauldron: HTMLElement;
  cauldronList: HTMLOListElement;
  message: HTMLElement;
  startButton: HTMLButtonElement;
  brewButton: HTMLButtonElement;
  pauseButton: HTMLButtonElement;
  recipeName: HTMLElement;
  recipeCounter: HTMLElement;
  recipeRanges: Record<ParameterKey, HTMLElement>;
  bars: HTMLElement;
  helpDialog: HTMLDialogElement;
  menuDialog: HTMLDialogElement;
  resumeFromMenuButton: HTMLButtonElement;
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

const SVG = 'viewBox="0 0 32 32" aria-hidden="true" focusable="false"';

export const UI_ICONS = {
  compass: `<svg ${SVG}><circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M16 3l3 10 10 3-10 3-3 10-3-10-10-3 10-3z"/></svg>`,
  clock: `<svg ${SVG}><circle cx="16" cy="17" r="12" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M16 10v7l5 3M12 3h8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  thermometer: `<svg ${SVG}><path d="M13 5a3 3 0 0 1 6 0v13a6 6 0 1 1-6 0z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="23" r="3.5" fill="currentColor"/><path d="M16 23V9" stroke="currentColor" stroke-width="2.5"/></svg>`,
  drop: `<svg ${SVG}><path fill="currentColor" d="M16 3C16 3 7 14 7 20a9 9 0 0 0 18 0C25 14 16 3 16 3z"/></svg>`,
  star: `<svg ${SVG}><path fill="currentColor" d="M16 2l3.5 8.5L28 8l-4 8 4 8-8.5-2.5L16 30l-3.5-8.5L4 24l4-8-4-8 8.5 2.5z"/><circle cx="16" cy="16" r="4" fill="#0d0b08"/></svg>`,
  book: `<svg ${SVG}><path d="M4 7c4-2 8-2 12 1 4-3 8-3 12-1v18c-4-2-8-2-12 1-4-3-8-3-12-1z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 8v18" stroke="currentColor" stroke-width="2"/></svg>`,
  gear: `<svg ${SVG}><path fill="currentColor" d="M14 2h4l1 4 3 1.3 3.6-2.1 2.8 2.8-2.1 3.6L27.6 15l4 1v0l-4 1-1.3 3 2.1 3.6-2.8 2.8-3.6-2.1L19 26l-1 4h-4l-1-4-3-1.3-3.6 2.1-2.8-2.8 2.1-3.6L4.4 17l-4-1 4-1 1.3-3-2.1-3.6 2.8-2.8 3.6 2.1L13 6z"/><circle cx="16" cy="16" r="5" fill="#0d0b08"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.2 0 3.6 1.2 5.2 3 1.6-1.8 3-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/><path fill="#fff" opacity="0.45" d="M6.5 7.2c-1.6.3-2.4 2-1.9 3.4.3-1.3 1.2-2.4 2.6-2.7z"/></svg>`,
} as const;

const CAULDRON_SVG = `
  <svg class="cauldron__svg" viewBox="0 -40 520 470" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="cauldron-liquid" cx="50%" cy="45%" r="60%">
        <stop offset="0%" style="stop-color: var(--liquid-light)"/>
        <stop offset="55%" style="stop-color: var(--liquid-mid)"/>
        <stop offset="100%" style="stop-color: var(--liquid-dark)"/>
      </radialGradient>
      <radialGradient id="cauldron-body" cx="38%" cy="30%" r="75%">
        <stop offset="0%" stop-color="#585e52"/>
        <stop offset="35%" stop-color="#2b2f29"/>
        <stop offset="100%" stop-color="#070806"/>
      </radialGradient>
      <linearGradient id="cauldron-rim" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#7a8072"/>
        <stop offset="50%" stop-color="#2e322b"/>
        <stop offset="100%" stop-color="#121410"/>
      </linearGradient>
      <radialGradient id="cauldron-floor" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color: var(--floor-glow)"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
      <filter id="cauldron-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10"/>
      </filter>
      <filter id="cauldron-smoke" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="16"/>
      </filter>
      <radialGradient id="cauldron-bubble" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
        <stop offset="35%" stop-color="#e6ff8a" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#7fc21e" stop-opacity="0.35"/>
      </radialGradient>
    </defs>

    <ellipse cx="260" cy="392" rx="250" ry="38" fill="url(#cauldron-floor)"/>
    <ellipse cx="260" cy="388" rx="215" ry="30" fill="#1c1e1b" stroke="#34372f" stroke-width="3"/>
    <ellipse cx="260" cy="388" rx="215" ry="30" fill="none" stroke="#0c0d0b" stroke-width="3" stroke-dasharray="26 6"/>
    <ellipse class="cauldron__ring" cx="260" cy="384" rx="178" ry="22" fill="none" stroke-width="5"/>

    <path d="M140 330l-22 56h30l18-46zM380 330l22 56h-30l-18-46zM248 352l-8 40h40l-8-40z" fill="#0f100e" stroke="#2c2f29" stroke-width="2"/>

    <path d="M62 150c-14 70 4 140 60 182 70 50 206 50 276 0 56-42 74-112 60-182z"
      fill="url(#cauldron-body)" stroke="#3b3f37" stroke-width="3"/>
    <path d="M92 190c-6 50 8 100 50 128" fill="none" stroke="rgb(255 255 255 / 10%)" stroke-width="10" stroke-linecap="round"/>

    <g class="cauldron__ornament" fill="none" stroke-width="3" stroke-linecap="round">
      <path d="M200 262c-30-4-50-26-44-50 4-14 20-16 26-6"/>
      <path d="M320 262c30-4 50-26 44-50-4-14-20-16-26-6"/>
      <path d="M190 300c-34 8-64-6-74-30"/>
      <path d="M330 300c34 8 64-6 74-30"/>
      <path d="M260 188v-16M260 336v14"/>
    </g>

    <g class="cauldron__emblem" fill="none">
      <circle cx="260" cy="262" r="56" stroke-width="7" class="cauldron__emblem-ring"/>
      <circle cx="260" cy="262" r="56" stroke-width="2"/>
      <path d="M260 222l38 64h-76z" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="260" cy="264" r="15" stroke-width="5"/>
    </g>

    <path d="M44 148c-34 0-38 54-2 58" fill="none" stroke="#2a2d27" stroke-width="13" stroke-linecap="round"/>
    <path d="M476 148c34 0 38 54 2 58" fill="none" stroke="#2a2d27" stroke-width="13" stroke-linecap="round"/>
    <path d="M44 148c-34 0-38 54-2 58" fill="none" stroke="rgb(255 255 255 / 12%)" stroke-width="3"/>
    <path d="M476 148c34 0 38 54 2 58" fill="none" stroke="rgb(255 255 255 / 12%)" stroke-width="3"/>

    <ellipse class="cauldron__liquid-glow" cx="260" cy="140" rx="200" ry="50" filter="url(#cauldron-blur)"/>
    <ellipse cx="260" cy="148" rx="205" ry="48" fill="#0b0c0a"/>
    <ellipse class="cauldron__liquid" cx="260" cy="150" rx="190" ry="40" fill="url(#cauldron-liquid)"/>
    <g class="cauldron__surface">
      <ellipse cx="260" cy="150" rx="120" ry="22" fill="none" stroke-width="2"/>
      <ellipse cx="260" cy="150" rx="70" ry="12" fill="none" stroke-width="2"/>
      <circle cx="195" cy="142" r="11"/>
      <circle cx="315" cy="156" r="9"/>
      <circle cx="245" cy="166" r="7"/>
      <circle cx="340" cy="138" r="6"/>
      <circle cx="160" cy="160" r="6"/>
      <circle cx="285" cy="132" r="5"/>
    </g>
    <ellipse cx="260" cy="148" rx="205" ry="48" fill="none" stroke="url(#cauldron-rim)" stroke-width="16"/>
    <ellipse cx="260" cy="142" rx="205" ry="46" fill="none" stroke="rgb(255 255 255 / 14%)" stroke-width="2"/>

    <g class="cauldron__fx">
      <g class="cauldron__smoke" filter="url(#cauldron-smoke)">
        <ellipse cx="150" cy="60" rx="55" ry="95" style="animation-delay: 0s"/>
        <ellipse cx="215" cy="40" rx="60" ry="110" style="animation-delay: 1.2s"/>
        <ellipse cx="285" cy="50" rx="60" ry="105" style="animation-delay: 2.4s"/>
        <ellipse cx="355" cy="65" rx="55" ry="95" style="animation-delay: 3.6s"/>
        <ellipse cx="250" cy="20" rx="70" ry="120" style="animation-delay: 0.6s"/>
      </g>
      <g class="cauldron__bubbles-svg">
        <circle cx="190" cy="140" r="14" style="animation-delay: 0s"/>
        <circle cx="240" cy="150" r="20" style="animation-delay: 0.7s"/>
        <circle cx="290" cy="138" r="12" style="animation-delay: 1.4s"/>
        <circle cx="330" cy="152" r="16" style="animation-delay: 2.1s"/>
        <circle cx="215" cy="160" r="9" style="animation-delay: 1s"/>
        <circle cx="270" cy="162" r="10" style="animation-delay: 2.6s"/>
        <circle cx="160" cy="150" r="8" style="animation-delay: 1.8s"/>
      </g>
      <g class="cauldron__sparks-svg">
        <circle cx="120" cy="130" r="2.5" style="animation-delay: 0s"/>
        <circle cx="160" cy="120" r="2" style="animation-delay: 1.5s"/>
        <circle cx="200" cy="130" r="3" style="animation-delay: 0.7s"/>
        <circle cx="235" cy="115" r="2" style="animation-delay: 2.3s"/>
        <circle cx="265" cy="125" r="2.5" style="animation-delay: 0.3s"/>
        <circle cx="300" cy="118" r="2" style="animation-delay: 1.9s"/>
        <circle cx="335" cy="128" r="3" style="animation-delay: 1.1s"/>
        <circle cx="370" cy="122" r="2" style="animation-delay: 2.7s"/>
        <circle cx="400" cy="132" r="2.5" style="animation-delay: 0.9s"/>
        <circle cx="180" cy="110" r="2" style="animation-delay: 3s"/>
        <circle cx="250" cy="105" r="2.5" style="animation-delay: 1.3s"/>
        <circle cx="320" cy="108" r="2" style="animation-delay: 2s"/>
      </g>
    </g>
  </svg>
`;

const BOOK_SKETCH = `
  <svg class="book__sketch" viewBox="0 0 120 90" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M52 8h16M54 8v4h12V8M55 12v14c-12 4-20 14-20 27a25 25 0 0 0 50 0c0-13-8-23-20-27V12"/>
      <path d="M40 58c8 4 32 4 40 0"/>
      <path d="M48 40c3-4 6-7 10-8" opacity="0.7"/>
      <path d="M10 60c8-6 14 4 22-2M88 56c8-6 14 4 22-2M14 72c10-4 18 4 28 0M80 72c10-4 18 4 28 0" opacity="0.6"/>
    </g>
  </svg>
`;

const LAYOUT_TEMPLATE = `
  <div class="frame">
    <header class="topbar" aria-label="Game status">
      <div class="topbar__panel topbar__panel--score">
        <span class="topbar__icon topbar__icon--compass">${UI_ICONS.compass}</span>
        <span class="topbar__label">Score:</span>
        <span class="topbar__value" data-score>0</span>
      </div>
      <div class="topbar__panel topbar__panel--time" data-timer>
        <span class="topbar__icon topbar__icon--clock">${UI_ICONS.clock}</span>
        <span class="topbar__label">Time:</span>
        <span class="topbar__value topbar__value--time" data-time>00:00</span>
        <span class="timer-bar"><span class="timer-bar__fill" data-time-bar></span></span>
      </div>
      <div class="topbar__panel topbar__panel--lives">
        <span class="lives" data-lives></span>
      </div>
    </header>

    <h1 class="title"><span class="title__text">Alchemist's Cauldron</span><span class="title__gem" aria-hidden="true"></span></h1>

    <main class="game" data-game>
      <section class="shelf-panel" aria-labelledby="shelf-title">
        <h2 class="plaque" id="shelf-title">Ingredients</h2>
        <div class="shelf" data-shelf></div>
      </section>

      <section class="cauldron-area" aria-label="Cauldron">
        <div class="cauldron cauldron--empty" data-cauldron>
          ${CAULDRON_SVG}
          <p class="message" data-message role="status" aria-live="polite"></p>
        </div>
        <ol class="cauldron__list" data-cauldron-list aria-label="Ingredients in the cauldron"></ol>
      </section>

      <section class="book" aria-labelledby="recipe-title">
        <span class="book__ribbon" aria-hidden="true"></span>
        <div class="book__page">
          <h2 class="book__caption" id="recipe-title">Current Recipe</h2>
          <p class="book__name" data-recipe-name>Press Start Game</p>
          ${BOOK_SKETCH}
          <p class="book__counter" data-recipe-counter>Ingredients: 0 / 0</p>
          <dl class="book__ranges">
            <div class="book__range book__range--temperature">
              <dt><span class="book__icon">${UI_ICONS.thermometer}</span>Temp:</dt>
              <dd data-range-temperature>—</dd>
            </div>
            <div class="book__range book__range--density">
              <dt><span class="book__icon">${UI_ICONS.drop}</span>Density:</dt>
              <dd data-range-density>—</dd>
            </div>
            <div class="book__range book__range--magic">
              <dt><span class="book__icon">${UI_ICONS.star}</span>Magic:</dt>
              <dd data-range-magic>—</dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="bars" data-bars aria-label="Cauldron parameters"></section>
    </main>

    <footer class="controls">
      <button class="round-button" type="button" data-help>
        <span class="round-button__icon">${UI_ICONS.book}</span>
        <span class="round-button__label">Help</span>
      </button>
      <div class="controls__center">
        <button class="brew-button" type="button" data-start><span class="brew-button__text">Start Game</span></button>
        <button class="brew-button" type="button" data-brew><span class="brew-button__text">Brew</span></button>
        <button class="small-button" type="button" data-pause>Pause</button>
      </div>
      <button class="round-button" type="button" data-menu>
        <span class="round-button__icon">${UI_ICONS.gear}</span>
        <span class="round-button__label">Settings</span>
      </button>
    </footer>
  </div>

  <dialog class="dialog" data-help-dialog aria-labelledby="help-title">
    <h2 class="dialog__title" id="help-title">How to play</h2>
    <ol class="dialog__list">
      <li>Press <b>Start Game</b>. You get a random recipe with 3 target ranges.</li>
      <li>Click ingredients on the shelf to add them to the cauldron (up to 4).</li>
      <li>Every ingredient changes <b>Temperature</b>, <b>Density</b> and <b>Magic Power</b>.</li>
      <li>Move all 3 markers into the green zones and press <b>Brew</b>. The check allows ±8.</li>
      <li>Success: +200 score, +10 s and a new recipe. Failure: −1 life.</li>
      <li>Ingredient stock is limited and never refilled.</li>
      <li>The game ends when time runs out, lives reach 0 or ingredients run out.</li>
    </ol>
    <div class="dialog__actions">
      <button class="dialog-button dialog-button--primary" type="button" data-close>Got it</button>
    </div>
  </dialog>

  <dialog class="dialog" data-menu-dialog aria-labelledby="menu-title">
    <h2 class="dialog__title" id="menu-title">Settings</h2>
    <div class="dialog__actions dialog__actions--column">
      <button class="dialog-button dialog-button--primary" type="button" data-resume-menu>Resume</button>
      <button class="dialog-button dialog-button--primary" type="button" data-new-game>New Game</button>
      <button class="dialog-button" type="button" data-open-leaderboard>Leaderboard</button>
      <button class="dialog-button" type="button" data-close>Close</button>
    </div>
  </dialog>

  <dialog class="dialog" data-pause-dialog aria-labelledby="pause-title">
    <h2 class="dialog__title" id="pause-title">Paused</h2>
    <p class="dialog__text">The timer is stopped.</p>
    <div class="dialog__actions dialog__actions--column">
      <button class="dialog-button dialog-button--primary" type="button" data-resume>Resume</button>
      <button class="dialog-button" type="button" data-exit>Exit to Menu</button>
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
        <button class="dialog-button dialog-button--primary" type="submit">Save</button>
      </div>
      <p class="name-form__error" data-name-error></p>
    </form>
    <p class="dialog__text dialog__text--success" data-saved-message></p>
    <div class="dialog__actions">
      <button class="dialog-button dialog-button--primary" type="button" data-play-again>Play again</button>
      <button class="dialog-button" type="button" data-open-leaderboard>Leaderboard</button>
      <button class="dialog-button" type="button" data-exit>Menu</button>
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
      <button class="dialog-button dialog-button--danger" type="button" data-clear-leaderboard>Clear Leaderboard</button>
      <button class="dialog-button dialog-button--primary" type="button" data-close>Close</button>
    </div>
  </dialog>

  <dialog class="dialog" data-confirm-dialog aria-labelledby="confirm-title">
    <h2 class="dialog__title" id="confirm-title">Clear the leaderboard?</h2>
    <p class="dialog__text">All saved results will be deleted.</p>
    <div class="dialog__actions">
      <button class="dialog-button dialog-button--danger" type="button" data-confirm-yes>Clear</button>
      <button class="dialog-button" type="button" data-close>Cancel</button>
    </div>
  </dialog>
`;

export function createLayout(root: HTMLElement): ILayout {
  root.innerHTML = LAYOUT_TEMPLATE;

  const gameOverDialog = requireElement(root, '[data-game-over-dialog]', HTMLDialogElement);
  const menuDialog = requireElement(root, '[data-menu-dialog]', HTMLDialogElement);

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
    cauldron: requireElement(root, '[data-cauldron]', HTMLElement),
    cauldronList: requireElement(root, '[data-cauldron-list]', HTMLOListElement),
    message: requireElement(root, '[data-message]', HTMLElement),
    startButton: requireElement(root, '[data-start]', HTMLButtonElement),
    brewButton: requireElement(root, '[data-brew]', HTMLButtonElement),
    pauseButton: requireElement(root, '[data-pause]', HTMLButtonElement),
    recipeName: requireElement(root, '[data-recipe-name]', HTMLElement),
    recipeCounter: requireElement(root, '[data-recipe-counter]', HTMLElement),
    recipeRanges: {
      temperature: requireElement(root, '[data-range-temperature]', HTMLElement),
      density: requireElement(root, '[data-range-density]', HTMLElement),
      magicPower: requireElement(root, '[data-range-magic]', HTMLElement),
    },
    bars: requireElement(root, '[data-bars]', HTMLElement),
    helpDialog: requireElement(root, '[data-help-dialog]', HTMLDialogElement),
    menuDialog,
    resumeFromMenuButton: requireElement(menuDialog, '[data-resume-menu]', HTMLButtonElement),
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
