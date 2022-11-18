import { scaleLinear } from 'd3-scale';
import { useMemo } from 'react';

import { Theme } from 'types';
import { themes } from './oldThemes';
// TODO: Convert this to a Jotai atom and consider if we want to do things differently now with new setup
export function useTheme(): Theme {
  const darkThemeMediaQuery = localStorage.theme === 'dark';
  const brightModeEnabled = !darkThemeMediaQuery; //useSelector((state) => state.application.brightModeEnabled);
  const colorBlindModeEnabled = false; //useSelector((state) => state.application.colorBlindModeEnabled);

  return useMemo(() => {
    if (brightModeEnabled) {
      return colorBlindModeEnabled ? themes.colorblindBright : themes.bright;
    } else {
      return colorBlindModeEnabled ? themes.colorblindDark : themes.dark;
    }
  }, [brightModeEnabled, colorBlindModeEnabled]);
}

export function useCo2ColorScale() {
  const theme = useTheme();

  return useMemo(
    () =>
      scaleLinear<number, string>()
        .domain(theme.co2Scale.steps)
        .range(theme.co2Scale.colors)
        .unknown(theme.clickableFill)
        .clamp(true), //TODO
    [theme]
  );
}
