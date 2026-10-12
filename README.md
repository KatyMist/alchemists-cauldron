# 🧪 Alchemist's Cauldron

![Skills](https://skillicons.dev/icons?i=ts,vite,html,css)

**EN** | [RU](#ru)

A browser puzzle game: mix ingredients from the shelf, move three cauldron values (Temperature, Density, Magic Power) into the recipe target ranges and brew potions before time or lives run out.

The task is part of the [RS School qualifying stage](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/game-alchemists-cauldron/README.md).

## Task structure

| Stage          | Content                                                       | Status |
| -------------- | ------------------------------------------------------------- | ------ |
| Precondition 1 | Repository, tooling, folder structure, quality checks         | ✅     |
| Level 1        | Shelf & cauldron, bars, recipes & brew, timer, pause, Top-10  | ⏳     |
| Level 2        | Difficulty selection, auto-save & Continue Game               | ⏳     |
| Level 3        | Drag & drop, tooltip, reactions, Pour Out, effects, shortcuts | ⏳     |

## How to play

1. Press **Start Game** — a random recipe with three target ranges appears.
2. Click ingredients on the shelf to add them to the cauldron (limited stock, limited slots).
3. Watch the three bars and press **Brew** when all values are in the target zones.
4. A successful brew gives points and bonus time; a failed one costs a life.

## Tech stack

- TypeScript (strict), no frameworks or libraries
- Vite
- ESLint + Prettier
- Husky + commitlint

## Run locally

```bash
npm install
npm run dev        # dev server
npm run build      # production build
npm run preview    # preview the build
npm run lint       # ESLint
npm run format     # Prettier
```

## Project structure

```
src/
  data/      ingredients, recipes, difficulty settings
  logic/     game rules (pure functions, no DOM)
  state/     game state
  storage/   localStorage: save, leaderboard
  ui/        DOM rendering
  styles/    CSS
  types/     TypeScript interfaces
  assets/    static assets
```

---

<a id="ru"></a>

**RU**

Браузерная игра-головоломка: смешивай ингредиенты с полки, чтобы три показателя котла (температура, плотность, магическая сила) попали в диапазоны рецепта, и вари зелья, пока не закончились время или жизни.

Задание этапа отбора [RS School](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/game-alchemists-cauldron/README.md). Запуск: `npm install`, затем `npm run dev`.
