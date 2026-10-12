import type { ICauldronValues, IParameter, IRecipe, ParameterKey } from '../types/game';
import { BAR_TICK_COUNT, PARAMETER_KEYS, PARAMETERS } from '../data/parameters';
import { expandRange, getParameterStatus } from '../logic/brew-check';
import { createElement } from './dom';
import { formatSigned, formatValue } from './format';
import { UI_ICONS } from './layout';

interface IBarElements {
  root: HTMLElement;
  value: HTMLElement;
  zone: HTMLElement;
  toleranceZone: HTMLElement;
  fill: HTMLElement;
  marker: HTMLElement;
}

export type BarsView = Record<ParameterKey, IBarElements>;

const BAR_ICONS: Readonly<Record<ParameterKey, string>> = {
  temperature: UI_ICONS.thermometer,
  density: UI_ICONS.drop,
  magicPower: UI_ICONS.star,
};

function toPercent(value: number, parameter: IParameter): number {
  const clamped = Math.min(Math.max(value, parameter.min), parameter.max);
  return ((clamped - parameter.min) / (parameter.max - parameter.min)) * 100;
}

function setSpan(element: HTMLElement, from: number, to: number): void {
  element.style.left = `${String(Math.min(from, to))}%`;
  element.style.width = `${String(Math.abs(to - from))}%`;
}

function createTicks(parameter: IParameter): HTMLElement {
  const ticks = createElement('div', 'bar__ticks');
  const step = (parameter.max - parameter.min) / (BAR_TICK_COUNT - 1);

  for (let index = 0; index < BAR_TICK_COUNT; index += 1) {
    const value = parameter.min + step * index;
    const tick = createElement('span', 'bar__tick', formatValue(value));
    tick.style.left = `${String(toPercent(value, parameter))}%`;
    ticks.append(tick);
  }

  return ticks;
}

function createBar(parameter: IParameter): IBarElements {
  const root = createElement('div', `bar bar--${parameter.key}`);
  const icon = createElement('span', 'bar__icon');
  icon.innerHTML = BAR_ICONS[parameter.key];

  const body = createElement('div', 'bar__body');
  const header = createElement('div', 'bar__header');
  const value = createElement('span', 'bar__value', '0');
  const track = createElement('div', 'bar__track');
  const toleranceZone = createElement('span', 'bar__zone bar__zone--tolerance');
  const zone = createElement('span', 'bar__zone');
  const fill = createElement('span', 'bar__fill');
  const marker = createElement('span', 'bar__marker');

  header.append(createElement('span', 'bar__label', parameter.label), value);
  track.append(fill, toleranceZone, zone);

  if (parameter.min < 0) {
    const zero = createElement('span', 'bar__zero');
    zero.style.left = `${String(toPercent(0, parameter))}%`;
    track.append(zero);
  }

  track.append(marker);
  body.append(header, track, createTicks(parameter));
  root.append(icon, body);

  return { root, value, zone, toleranceZone, fill, marker };
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

    const status = getParameterStatus(value, range, tolerance);

    if (status !== 'off') {
      bar.root.classList.add(`bar--${status}`);
    }
  });
}
