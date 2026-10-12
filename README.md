# 🧪 Alchemist's Cauldron

![Skills](https://skillicons.dev/icons?i=ts,vite,html,css)

**EN** | [RU](#ru)

A browser puzzle game: mix ingredients from the shelf, move three cauldron values (Temperature, Density, Magic Power) into the recipe target ranges and brew potions before time or lives run out.

- **Play:** https://katymist.github.io/alchemists-cauldron/
- **Task:** [RS School qualifying stage — Alchemist's Cauldron](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/game-alchemists-cauldron/README.md)

## Implemented

| Stage          | Stories                                                                                       | Status |
| -------------- | --------------------------------------------------------------------------------------------- | ------ |
| Precondition 1 | Repository, Vite, strict TypeScript, ESLint, Prettier, Husky, folder structure, PR template   | ✅     |
| Level 1        | Shelf & cauldron, parameter bars, recipe & Brew, timer & game over, pause, Top-10 leaderboard | ✅     |
| Level 2        | Difficulty selection (Easy / Medium / Hard), auto-save & Continue Game                        | ✅     |
| Level 3        | Drag & drop, ingredient tooltip, chemical reactions, Pour Out, visual feedback, keyboard keys | ✅     |

## How to play

1. Choose a difficulty in **Settings** (optional, Medium by default) and press **Start Game**.
2. A random recipe appears in the book: three target ranges for Temperature, Density and Magic Power.
3. Hover an ingredient to see its values. Click it or drag it into the cauldron.
4. Watch the three bars: move every marker into the green zone (the check also allows the tolerance of the difficulty).
5. Press **Brew**. Success gives score, bonus time and a new recipe. Failure costs a life.
6. **Pour Out** empties the cauldron for −10 s without losing a life.
7. Stock is limited (2–15 portions per ingredient) and is never refilled.
8. The game ends when time runs out, lives reach 0 or the ingredients run out. Enter your name if you made the Top-10.

### Keyboard (during play)

| Key         | Action                       |
| ----------- | ---------------------------- |
| `1`–`8`     | Add the ingredient by number |
| `B`         | Brew                         |
| `O`         | Pour Out                     |
| `P` / `Esc` | Pause                        |

### Difficulty

| Setting           | Easy  | Medium | Hard  |
| ----------------- | ----- | ------ | ----- |
| Ingredients       | 4     | 6      | 8     |
| Cauldron capacity | 4     | 4      | 5     |
| Start time        | 180 s | 150 s  | 150 s |
| Tolerance         | ±12   | ±8     | ±5    |
| Lives             | 5     | 3      | 3     |
| Score per brew    | 100   | 200    | 300   |
| Time bonus        | +15 s | +10 s  | +5 s  |

### Reactions

- **Easy:** no reactions.
- **Medium:** Bubbling (Fairy Dust + Caustic Acid: Magic Power +50%, −10 s), Solar Frost (Dragon Tears + Frost Lotus: Temperature = 0, Density +20%).
- **Hard:** Volatile Mix (Phoenix Feather + Essence of the Void: −1 life, cauldron cleared), Rooted Steam (Mandrake Root + Toad Slime: Density +25%, Magic Power −10%), Annihilation (one ingredient hotter than +15 and another colder than −15: Temperature = 0, Density ×2).

All 15 reactions from the task are stored in one typed array; each difficulty uses its own subset.

### Saving

The game saves itself after every action and when it is paused. After a reload, **Continue Game** opens the unfinished game paused. Broken save data is ignored and never crashes the game. Each difficulty has its own Top-10 leaderboard.

## Run locally

```bash
npm install
npm run dev        # dev server
npm run build      # production build
npm run preview    # preview the build
npm run lint       # ESLint
npm run format     # Prettier
npm run deploy     # publish to GitHub Pages
```

## Tech stack

- TypeScript (strict, no `any`), no frameworks or libraries
- Vite
- All graphics are drawn with SVG and CSS, no images
- ESLint + Prettier, Husky + commitlint

## Project structure

```
src/
  data/      ingredients, recipes, difficulty settings, reactions
  logic/     game rules: stock, brew check, reactions, timer (pure functions, no DOM)
  state/     game state transitions
  storage/   localStorage: save, leaderboard, settings
  ui/        DOM rendering: shelf, cauldron, bars, tooltip, dialogs
  styles/    CSS
  types/     TypeScript interfaces
```

---

<a id="ru"></a>

**RU**

Браузерная игра-головоломка: смешивай ингредиенты с полки, чтобы три показателя котла (температура, плотность, магическая сила) попали в диапазоны рецепта, и вари зелья, пока не закончились время или жизни.

**Играть:** https://katymist.github.io/alchemists-cauldron/

**Реализовано:** все уровни задания: Precondition, Level 1, Level 2 и Level 3.

**Как играть:**

1. Выбери сложность в **Settings** и нажми **Start Game**.
2. Наведи курсор на ингредиент, чтобы увидеть его значения, затем кликни или перетащи его в котёл.
3. Подведи все три маркера к зелёным зонам на шкалах и нажми **Brew**.
4. **Pour Out** очищает котёл за −10 секунд без потери жизни.
5. Клавиши во время игры: `1`–`8` ингредиент, `B` сварить, `O` вылить, `P` / `Esc` пауза.

**Запуск:** `npm install`, затем `npm run dev`.
