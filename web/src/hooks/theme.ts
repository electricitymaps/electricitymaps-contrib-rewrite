import { scaleLinear } from 'd3-scale';
import { useMemo } from 'react';
import { MapTheme } from 'types';
import { colors } from './colors';
// TODO: Convert this to a Jotai atom and consider if we want to do things differently now with new setup
export function useTheme() {
  const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  const brightModeEnabled = darkThemeMediaQuery.matches; //useSelector((state) => state.application.brightModeEnabled);
  const colorBlindModeEnabled = false; //useSelector((state) => state.application.colorBlindModeEnabled);

  return useMemo(() => {
    if (brightModeEnabled) {
      return colorBlindModeEnabled ? colors.colorblindBright : colors.bright;
    } else {
      return colorBlindModeEnabled ? colors.colorblindDark : colors.dark;
    }
  }, [brightModeEnabled, colorBlindModeEnabled]);
}

export function useCo2ColorScale() {
  const theme = useTheme();
  return useMemo(() => getCo2ColorScale(theme), [theme]);
}

export function getCo2ColorScale(theme: MapTheme) {
  return scaleLinear<string>()
    .domain(theme.co2Scale.steps)
    .range(theme.co2Scale.colors)
    .unknown(theme.clickableFill)
    .clamp(true);
}
