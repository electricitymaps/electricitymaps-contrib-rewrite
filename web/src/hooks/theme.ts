import { scaleLinear } from 'd3-scale';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { MapTheme } from 'types';
import { colorblindModeAtom } from 'utils/state/atoms';
import { themes } from './oldThemes';
// TODO: Convert this to a Jotai atom and consider if we want to do things differently now with new setup
export function useTheme(): MapTheme {
  const [colorBlindModeEnabled] = useAtom(colorblindModeAtom);
  const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  const brightModeEnabled = darkThemeMediaQuery.matches; //useSelector((state) => state.application.brightModeEnabled);

  return useMemo(() => {
    if (brightModeEnabled) {
      return colorBlindModeEnabled ? themes.colorblindBright : themes.bright;
    } else {
      return colorBlindModeEnabled ? themes.colorblindDark : themes.dark;
    }
  }, [brightModeEnabled, colorBlindModeEnabled]) as MapTheme;
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
