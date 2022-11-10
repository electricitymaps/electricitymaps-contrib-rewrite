import generateTopos from 'features/map/map-utils/generateTopos';
import type { GridState, MapGrid, MapZone } from 'types';

import { featureCollection } from '@turf/turf';
import { getCO2IntensityByMode } from 'utils/helperFunctions';

const defaultDatetimeIndex = 22;

const getSelectedDatetime = (dateTimes: Array<string>, datetimeIndex: number) => {
  return dateTimes[datetimeIndex];
};
const getLength = (coordinate?: [number, number]) => (coordinate ? coordinate.length : 0);

const mapZonesToGrid = (
  { data, callerLocation }: GridState,
  getCo2colorScale: (co2intensity: number) => string,
  datetimeIndex: number
) => {
  const keys = Object.keys(data.zones) as Array<keyof GridState>;
  const geographies = generateTopos();
  const selectedDateTime = getSelectedDatetime(data.datetimes, datetimeIndex);
  if (!keys) {
    return [] as MapZone[];
  }
  const zones = keys
    .map((key) => {
      if (!geographies[key]) {
        return;
      }
      const zoneData = data.zones[key][selectedDateTime];
      const co2intensity = zoneData
        ? getCO2IntensityByMode(zoneData, 'consumption')
        : undefined; //TODO get mode
      const fillColor = co2intensity ? getCo2colorScale(co2intensity) : undefined;
      return {
        type: 'Feature',
        geometry: {
          ...geographies[key].geometry,
          // TODO: Figure out if we still need this check, as invalid/empty coordinates should be removed during buildtime generation
          coordinates: geographies[key].geometry.coordinates.filter(
            (element: [number, number] | undefined) => getLength(element)
          ),
        },
        Id: key,
        properties: {
          color: fillColor,
          // zoneData: data.zones[key], we could somehow get the tooltips from a single map state
          zoneId: key,
        },
      };
    })
    .filter(Boolean);

  return zones;
};

export const getMapState = (
  data: GridState | undefined,

  getCo2colorScale: (co2intensity: number) => string,
  datetimeIndex: number = defaultDatetimeIndex
): MapGrid => {
  if (!data) {
    return featureCollection([]);
  }
  const zones: MapZone[] = mapZonesToGrid(
    data,
    getCo2colorScale,
    datetimeIndex
  ) as MapZone[];
  const mapGrid = featureCollection(zones);

  return mapGrid;
};
