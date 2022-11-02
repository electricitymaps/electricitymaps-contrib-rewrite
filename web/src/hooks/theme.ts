import { useMemo } from 'react';
import { scaleLinear } from 'd3-scale';

import { themes } from '../features/map/map-utils/themes';

export function useTheme() {
  const brightModeEnabled = true; //useSelector((state) => state.application.brightModeEnabled);
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
      scaleLinear().domain(theme.co2Scale.steps).range(theme.co2Scale.colors).unknown(theme.clickableFill).clamp(true),
    [theme]
  );
}
