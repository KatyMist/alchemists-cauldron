import type { ILeaderboardEntry } from '../types/game';
import { DIFFICULTY_LABELS } from '../data/difficulty';
import { createElement } from './dom';
import { formatDate } from './format';

export function renderLeaderboard(
  body: HTMLElement,
  emptyMessage: HTMLElement,
  entries: readonly ILeaderboardEntry[],
): void {
  const rows = entries.map((entry, index) => {
    const row = createElement('tr', 'leaderboard__row');
    row.append(
      createElement('td', 'leaderboard__rank', String(index + 1)),
      createElement('td', 'leaderboard__name', entry.name),
      createElement('td', 'leaderboard__score', String(entry.score)),
      createElement('td', 'leaderboard__difficulty', DIFFICULTY_LABELS[entry.difficulty]),
      createElement('td', 'leaderboard__date', formatDate(entry.date)),
    );
    return row;
  });

  body.replaceChildren(...rows);
  emptyMessage.hidden = entries.length > 0;
}
