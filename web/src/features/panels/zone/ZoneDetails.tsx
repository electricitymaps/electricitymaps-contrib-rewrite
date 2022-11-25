import useGetZone from 'api/getZone';
import BreakdownChart from 'features/charts/BreakdownChart';
import CarbonChart from 'features/charts/CarbonChart';
import EmissionChart from 'features/charts/EmissionChart';
import PriceChart from 'features/charts/PriceChart';
import { useAtom } from 'jotai';
import { Navigate, useParams } from 'react-router-dom';
import { displayByEmissionsAtom, timeAverageAtom } from 'utils/state';
import DisplayByEmissionToggle from './DisplayByEmissionToggle';
import { ZoneHeader } from './ZoneHeader';

export default function ZoneDetails(): JSX.Element {
  const { zoneId } = useParams();
  const [timeAverage] = useAtom(timeAverageAtom);
  const [displayByEmissions] = useAtom(displayByEmissionsAtom);
  const { data } = useGetZone({
    enabled: Boolean(zoneId),
  });

  if (!zoneId) {
    return <Navigate to="/" replace />;
  }

  // TODO: Handle error state
  // TODO: Handle loading state nicely (let's keep country name in the header)

  if (!data) {
    return <div>none</div>;
  }

  const datetimes = Object.keys(data.zoneStates).map((key) => new Date(key));

  return (
    <div
      className="mb-60" // Adding room to scroll past the time controller
    >
      <ZoneHeader
        zoneId={zoneId}
        date="November 9, 2022 at 8:00"
        isEstimated
        isAggregated
      />
      {/* <DisplayByEmissionToggle />
      {displayByEmissions ? (
        <EmissionChart datetimes={datetimes} timeAverage={timeAverage} />
      ) : (
        <CarbonChart datetimes={datetimes} timeAverage={timeAverage} />
      )}
      <BreakdownChart datetimes={datetimes} timeAverage={timeAverage} /> */}
      <PriceChart datetimes={datetimes} timeAverage={timeAverage} />
    </div>
  );
}
