import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import moment from 'moment';
import { selectedDatetimeIndexAtom } from 'utils/state/atoms';

import {
  getBasePath,
  getHeaders,
  QUERY_KEYS,
  REFETCH_INTERVAL_FIVE_MINUTES,
} from './helpers';

const GFS_STEP_ORIGIN = 6; // hours
const GFS_STEP_HORIZON = 1; // hours

export function getGfsTargetTimeBefore(datetime) {
  let horizon = moment(datetime).utc().startOf('hour');
  while (horizon.hour() % GFS_STEP_HORIZON !== 0) {
    horizon = horizon.subtract(1, 'hour');
  }
  return horizon;
}

export function getGfsTargetTimeAfter(datetime) {
  return moment(getGfsTargetTimeBefore(datetime)).add(GFS_STEP_HORIZON, 'hour');
}

function getGfsReferenceTimeForTarget(datetime) {
  // Warning: solar will not be available at horizon 0 so always do at least horizon 1
  let origin = moment(datetime).subtract(7, 'hour');
  while (origin.hour() % GFS_STEP_ORIGIN !== 0) {
    origin = origin.subtract(1, 'hour');
  }
  return origin;
}

export async function fetchGfsForecast(resource, targetTime) {
  const path = `/v3/gfs/${resource}?refTime=${getGfsReferenceTimeForTarget(
    targetTime
  ).toISOString()}&targetTime=${targetTime.toISOString()}`;
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

async function getWeatherData(selectedDatetime) {
  console.log('DSADS');

  console.log('SADS', selectedDatetime);
  const before = fetchGfsForecast(
    'wind',
    getGfsTargetTimeBefore(selectedDatetime.datetimeString)
  );
  const after = fetchGfsForecast(
    'wind',
    getGfsTargetTimeAfter(selectedDatetime.datetimeString)
  );

  const forecasts = await Promise.all([before, after]).then((values) => {
    return values;
  });
  console.log('SADAD', forecasts);
  return forecasts;
}

export const useGetWind = (
  selectedDatetime: string,
  options?: UseQueryOptions<any>
): UseQueryResult<any> => {
  return useQuery<any>(['wind'], async () => await getWeatherData(selectedDatetime), {
    staleTime: 10,
    refetchOnWindowFocus: false,
    enabled: Boolean(selectedDatetime),
    ...options,
  });
};
