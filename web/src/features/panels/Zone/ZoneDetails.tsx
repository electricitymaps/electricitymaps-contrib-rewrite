import useGetZone from 'api/getZone';
import LoadingOrError from 'components/LoadingOrError';
import { Navigate, useParams } from 'react-router-dom';
import { TimeAverages } from 'types';
import { ZoneHeader } from './ZoneHeader';

export default function ZoneDetails(): JSX.Element {
  const { zoneId } = useParams();

  const { isLoading, isError, error, data } = useGetZone(TimeAverages.HOURLY, zoneId, {
    enabled: Boolean(zoneId),
  });

  if (!zoneId) {
    return <Navigate to="/" replace />;
  }

  if (isLoading || isError) {
    return <LoadingOrError error={error as Error} />;
  }

  console.log('I should do something with all this data', data);

  return (
    <div>
      <ZoneHeader zoneId={zoneId} />
    </div>
  );
}
