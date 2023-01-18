import { ScaleLinear, scaleLinear } from 'd3-scale';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { MapTheme, Maybe } from 'types';
import { colorblindModeAtom } from 'utils/state/atoms';
import { colors } from './colors';

// TODO: Convert this to a Jotai atom and consider if we want to do things differently now with new setup
export function useTheme(): MapTheme {
  const [isColorBlindModeEnabled] = useAtom(colorblindModeAtom);
  const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
  const isBrightModeEnabled = darkThemeMediaQuery.matches;

  return useMemo(() => {
    if (isBrightModeEnabled) {
      return isColorBlindModeEnabled ? colors.colorblindBright : colors.bright;
    } else {
      return isColorBlindModeEnabled ? colors.colorblindDark : colors.dark;
    }
  }, [isBrightModeEnabled, isColorBlindModeEnabled]) as MapTheme;
}

export function useCo2ColorScale() {
  const theme = useTheme();
  return useMemo(() => getCo2ColorScale(theme), [theme]);
}

// We overwrite the type here as we want to accept Maybe<number> as input instead of always a number
// since .unknown handles undefined and null values
export interface Co2Scale<Range, Output, Unknown>
  extends ScaleLinear<Range, Output, Unknown> {
  (value: Maybe<number>): string;
}

export function getCo2ColorScale(theme: MapTheme) {
  return scaleLinear<string>()
    .domain(theme.co2Scale.steps)
    .range(theme.co2Scale.colors)
    .unknown(theme.clickableFill)
    .clamp(true) as Co2Scale<string, string, string>;
}
