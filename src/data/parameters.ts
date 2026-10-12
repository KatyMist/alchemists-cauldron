import type { IParameter, ParameterKey } from '../types/game';

export const PARAMETER_KEYS: readonly ParameterKey[] = ['temperature', 'density', 'magicPower'];

export const PARAMETERS: Readonly<Record<ParameterKey, IParameter>> = {
  temperature: { key: 'temperature', label: 'Temperature', min: -100, max: 100 },
  density: { key: 'density', label: 'Density', min: -100, max: 100 },
  magicPower: { key: 'magicPower', label: 'Magic Power', min: 0, max: 160 },
};
