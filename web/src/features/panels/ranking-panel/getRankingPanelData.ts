import type { GridState, MapZone } from 'types';
import { getCO2IntensityByMode } from 'utils/helperFunctions';

const defaultDatetimeIndex = 22;

const getSelectedDatetime = (dateTimes: Array<string>, datetimeIndex: number) => {
  return dateTimes[datetimeIndex];
};

export const getRankedState = (
  data: GridState | undefined,
  getCo2colorScale: (co2intensity: number) => string,
  sortOrder: 'asc' | 'desc',
  datetimeIndex: number = defaultDatetimeIndex
) => {
  if (!data) {
    return [];
  }
  const zonesData = data.data;
  const keys = Object.keys(zonesData.zones) as Array<keyof GridState>;

  const selectedDateTime = getSelectedDatetime(zonesData.datetimes, datetimeIndex);
  if (!keys) {
    return [] as MapZone[];
  }
  const zones = keys
    .map((key) => {
      const zoneData = zonesData.zones[key][selectedDateTime];
      const co2intensity = zoneData
        ? getCO2IntensityByMode(zoneData, 'consumption')
        : undefined; //TODO get mode
      const fillColor = co2intensity ? getCo2colorScale(co2intensity) : undefined;
      return {
        zoneKey: key,
        color: fillColor,
        co2intensity: co2intensity,
      };
    })
    .filter((zone) => zone.co2intensity !== undefined);

  const orderedZones =
    sortOrder === 'asc'
      ? zones.sort((a, b) => a.co2intensity! - b.co2intensity!)
      : zones.sort((a, b) => b.co2intensity! - a.co2intensity!);

  return orderedZones;
};
