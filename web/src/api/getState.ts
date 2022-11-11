import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import generateTopos from 'features/map/map-utils/generateTopos';
import type { GridState, MapGrid, MapZone, TimeAverages } from 'types';
import { getBasePath, getHeaders, QUERY_KEYS, REFETCH_INTERVAL_MS } from './helpers';

export function getCO2IntensityByMode(
  zoneData: { co2intensity: number; co2intensityProduction: number },
  electricityMixMode: string
) {
  return electricityMixMode === 'consumption'
    ? zoneData.co2intensity
    : zoneData.co2intensityProduction;
}

const getSelectedDatetime = (dateTimes: Array<string>) => {
  return dateTimes[dateTimes.length - 1];
};
const getLength = (coordinate?: [number, number]) => (coordinate ? coordinate.length : 0);

const mapZonesToGrid = (
  { data, callerLocation }: GridState,
  getCo2colorScale: (co2intensity: number) => string
) => {
  const keys = Object.keys(data.zones) as Array<keyof GridState>;
  const geographies = generateTopos();
  const selectedDateTime = getSelectedDatetime(data.datetimes);
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
          zoneData: data.zones[key],
          zoneId: key,
        },
      };
    })
    .filter(Boolean);

  return zones;
};

const getState = async (timeAverage: string): Promise<MapGrid> => {
  const path = `v6/state/${timeAverage}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: await getHeaders(path),
  };

  const response = await fetch(`${getBasePath()}/${path}`, requestOptions);

  if (response.ok) {
    const result = (await response.json()) as GridState;
    return result;
  }

  throw new Error(await response.text());
};

const useGetState = (
  timeAverage: TimeAverages,
  options?: UseQueryOptions<MapGrid>
): UseQueryResult<MapGrid> =>
  useQuery<MapGrid>([QUERY_KEYS.STATE, timeAverage], async () => getState(timeAverage), {
    staleTime: REFETCH_INTERVAL_MS,
    ...options,
  });

export default useGetState;
