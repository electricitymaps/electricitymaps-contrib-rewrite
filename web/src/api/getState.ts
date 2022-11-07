import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import generateTopos from 'features/map/map-utils/generateTopos';
import { useCo2ColorScale } from 'hooks/theme';
import type { GridState, MapGrid, MapZone, TimeAverages, ZoneOverview, ZoneOverviewForTimePeriod } from 'types';
import { getBasePath, getHeaders, QUERY_KEYS, REFETCH_INTERVAL_MS } from './helpers';
import * as turf from '@turf/turf';
const mapZonesToGrid = (data: GridState) => {
  const keys = Object.keys(data.countries) as Array<keyof GridState>;
  const geographies = generateTopos();
  if (!keys) {
    return [] as MapZone[];
  }
  const zones = keys
    .map((key) => {
      const length = (coordinate?: [number, number]) => (coordinate ? coordinate.length : 0);
      if (!geographies[key]) {
        return;
      }
      return {
        type: 'Feature',
        geometry: {
          ...geographies[key].geometry,
          coordinates: geographies[key].geometry.coordinates.filter(length), // Remove empty geometries
        },
        Id: key,
        properties: {
          color: undefined,
          zoneData: data.countries[key],
          zoneId: key,
        },
      };
    })
    .filter(Boolean);

  return zones;
};

const getState = async (timeAverage: string): Promise<MapGrid> => {
  const path = `/v5/state/${timeAverage}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: await getHeaders(path),
  };

  const response = await fetch(`${getBasePath()}/${path}`, requestOptions);
  // const co2ColorScale = useCo2ColorScale();
  if (response.ok) {
    const { data } = (await response.json()) as { data: GridState };

    const zones: MapZone[] = mapZonesToGrid(data) as MapZone[];
    console.log('SAD', zones);

    const mapGrid = turf.featureCollection(zones);

    // = {
    //   features: zones,
    // };
    return mapGrid;
  }

  throw new Error(await response.text());
};

const useGetState = (timeAverage: TimeAverages, options?: UseQueryOptions<MapGrid>): UseQueryResult<MapGrid> =>
  useQuery<MapGrid>([QUERY_KEYS.STATE, timeAverage], async () => getState(timeAverage), {
    staleTime: REFETCH_INTERVAL_MS,
    ...options,
  });

export default useGetState;
