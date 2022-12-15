import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useInterpolatedWindData } from 'features/weather-layers/hooks';
import { add, sub, startOfHour } from 'date-fns';

import { getBasePath, getHeaders, REFETCH_INTERVAL_FIVE_MINUTES } from './helpers';

function getBothForecastStartTime(now: Date) {
  return sub(startOfHour(now), { hours: 7 }).toISOString();
}
function getBeforeForcastEndTime(now: Date) {
  return add(startOfHour(now), { hours: 0 }).toISOString();
}

function getAfterForecastEndTime(now: Date) {
  return add(startOfHour(now), { hours: 1 }).toISOString();
}

export async function fetchGfsForecastBefore(resource: string, targetTime: Date) {
  const path = `/v3/gfs/${resource}?refTime=${getBothForecastStartTime(
    targetTime
  )}&targetTime=${getBeforeForcastEndTime(targetTime)}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: await getHeaders(path),
  };
  const response = await fetch(`${getBasePath()}${path}`, requestOptions);

  if (response.ok) {
    const { data } = (await response.json()) as { data: any };

    return data;
  }

  throw new Error(await response.text());
}
export async function fetchGfsForecastAfter(resource: string, targetTime: Date) {
  const path = `/v3/gfs/${resource}?refTime=${getBothForecastStartTime(
    targetTime
  )}&targetTime=${getAfterForecastEndTime(targetTime)}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: await getHeaders(path),
  };
  const response = await fetch(`${getBasePath()}${path}`, requestOptions);

  if (response.ok) {
    const { data } = (await response.json()) as { data: any };

    return data;
  }

  throw new Error(await response.text());
}

async function getWeatherData() {
  const now = new Date();

  const before = fetchGfsForecastBefore('wind', now);
  const after = fetchGfsForecastAfter('wind', now);

  const forecasts = await Promise.all([before, after]).then((values) => {
    return values;
  });
  const interdata = useInterpolatedWindData(forecasts);

  return interdata;
}

export const useGetWind = (options?: UseQueryOptions<any>): UseQueryResult<any> => {
  return useQuery<any>(['wind'], async () => await getWeatherData(), {
    staleTime: REFETCH_INTERVAL_FIVE_MINUTES,
    refetchOnWindowFocus: false,

    ...options,
  });
};
