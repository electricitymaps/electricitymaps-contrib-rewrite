import useGetZone from 'api/getZone';
import BreakdownChart from 'features/charts/BreakdownChart';
import { useAtom } from 'jotai';
import { Navigate, useParams } from 'react-router-dom';
import { selectedDatetimeIndexAtom, timeAverageAtom } from 'utils/state';
import { ZoneHeader } from './ZoneHeader';

export default function ZoneDetails(): JSX.Element {
  const { zoneId } = useParams();
  const [timeAverage] = useAtom(timeAverageAtom);
  const [datetime] = useAtom(selectedDatetimeIndexAtom);
  const { error, data, status, isLoading } = useGetZone(timeAverage, zoneId, {
    enabled: Boolean(zoneId),
  });

  if (!zoneId) {
    return <Navigate to="/" replace />;
  }

  // TODO: Handle error state
  // TODO: Handle loading state nicely (let's keep country name in the header)

  return (
    <div>
      <ZoneHeader
        zoneId={zoneId}
        date="November 9, 2022 at 8:00"
        isEstimated
        isAggregated
      />
      {status === 'loading' && 'Loading...'}
      <BreakdownChart />
    </div>
  );
}
