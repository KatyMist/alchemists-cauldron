import type { ICauldronValues, IParameter, IRecipe, ParameterKey } from '../types/game';
import { PARAMETER_KEYS, PARAMETERS } from '../data/parameters';
import { expandRange, getParameterStatus } from '../logic/brew-check';
import { createElement } from './dom';
import { formatRange, formatSigned } from './format';

interface IBarElements {
  root: HTMLElement;
  value: HTMLElement;
  target: HTMLElement;
  zone: HTMLElement;
  toleranceZone: HTMLElement;
  fill: HTMLElement;
  marker: HTMLElement;
}

export type BarsView = Record<ParameterKey, IBarElements>;

function toPercent(value: number, parameter: IParameter): number {
  const clamped = Math.min(Math.max(value, parameter.min), parameter.max);
  return ((clamped - parameter.min) / (parameter.max - parameter.min)) * 100;
}

function setSpan(element: HTMLElement, from: number, to: number): void {
  element.style.left = `${String(Math.min(from, to))}%`;
  element.style.width = `${String(Math.abs(to - from))}%`;
}

function createBar(parameter: IParameter): IBarElements {
  const root = createElement('div', `bar bar--${parameter.key}`);
  const header = createElement('div', 'bar__header');
  const value = createElement('span', 'bar__value', '0');
  const target = createElement('span', 'bar__target', '');
  const track = createElement('div', 'bar__track');
  const toleranceZone = createElement('span', 'bar__zone bar__zone--tolerance');
  const zone = createElement('span', 'bar__zone');
  const fill = createElement('span', 'bar__fill');
  const marker = createElement('span', 'bar__marker');

  header.append(createElement('span', 'bar__label', parameter.label), value);
  track.append(toleranceZone, zone, fill, marker);

  if (parameter.min < 0) {
    const zero = createElement('span', 'bar__zero');
    zero.style.left = `${String(toPercent(0, parameter))}%`;
    track.append(zero);
  }

  root.append(header, track, target);

  return { root, value, target, zone, toleranceZone, fill, marker };
}

export function createBars(container: HTMLElement): BarsView {
  const bars: BarsView = {
    temperature: createBar(PARAMETERS.temperature),
    density: createBar(PARAMETERS.density),
    magicPower: createBar(PARAMETERS.magicPower),
  };

  container.replaceChildren(...PARAMETER_KEYS.map((key) => bars[key].root));
  return bars;
}

export function updateBars(
  view: BarsView,
  values: ICauldronValues,
  recipe: IRecipe | null,
  tolerance: number,
): void {
  PARAMETER_KEYS.forEach((key) => {
    const parameter = PARAMETERS[key];
    const bar = view[key];
    const value = values[key];
    const zeroPercent = toPercent(0, parameter);
    const valuePercent = toPercent(value, parameter);

    bar.value.textContent = formatSigned(value);
    setSpan(bar.fill, zeroPercent, valuePercent);
    bar.marker.style.left = `${String(valuePercent)}%`;

    bar.root.classList.remove('bar--match', 'bar--tolerance');

    if (recipe === null) {
      bar.zone.hidden = true;
      bar.toleranceZone.hidden = true;
      bar.target.textContent = '';
      return;
    }

    const range = recipe[key];
    const checkedRange = expandRange(range, tolerance);

    bar.zone.hidden = false;
    bar.toleranceZone.hidden = false;
    setSpan(bar.zone, toPercent(range.min, parameter), toPercent(range.max, parameter));
    setSpan(
      bar.toleranceZone,
      toPercent(checkedRange.min, parameter),
      toPercent(checkedRange.max, parameter),
    );
    bar.target.textContent = `Target ${formatRange(range)} (±${String(tolerance)})`;

    const status = getParameterStatus(value, range, tolerance);

    if (status !== 'off') {
      bar.root.classList.add(`bar--${status}`);
    }
  });
}
