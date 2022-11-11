import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { ThemeOptions, TimeAverages, ToggleOptions } from '../constants';
import atomWithCustomStorage from './atomWithCustomStorage';

export const timeAverageAtom = atomWithCustomStorage<TimeAverages>({
  key: 'average',
  initialValue: TimeAverages.HOURLY.toString(),
  options: {
    syncWithUrl: true,
    syncWithLocalStorage: true,
  },
});

export const selectedDatetimeIndexAtom = atom('2022-11-10T08:00:00Z');

/** Some example atoms that are not currently used */
export const spatialAggregateAtom = atomWithCustomStorage<ToggleOptions>({
  key: 'country-mode',
  initialValue: ToggleOptions.OFF,
  options: {
    syncWithUrl: true,
    syncWithLocalStorage: true,
  },
});

export const solarLayerAtom = atomWithCustomStorage<ToggleOptions>({
  key: 'solar',
  initialValue: ToggleOptions.OFF,
  options: {
    syncWithUrl: true,
    syncWithLocalStorage: true,
  },
});

export const windLayerAtom = atomWithCustomStorage<ToggleOptions>({
  key: 'wind',
  initialValue: ToggleOptions.OFF,
  options: {
    syncWithUrl: true,
    syncWithLocalStorage: true,
  },
});

export const themeAtom = atomWithStorage<ThemeOptions>('theme', ThemeOptions.LIGHT);

export const isLeftPanelOpenAtom = atomWithStorage(
  'is-left-panel-open',
  false,
  createJSONStorage(() => sessionStorage)
);

export const selectedDateAtom = atom(new Date());
