import useGetZone from 'api/getZone';
import { useAtom } from 'jotai';
import { Navigate, useParams } from 'react-router-dom';
import { timeAverageAtom } from 'utils/state';
import { ZoneHeader } from './ZoneHeader';

// export default styled.div`
//   background: transparent url(${resolvePath('images/electricitymap-loading-icon.svg')})
//     no-repeat center center;
//   background-size: 2rem;
//   display: inline-block;
//   height: ${(props) => props.height || '100%'};
//   width: 100%;
// `;

export default function ZoneDetails(): JSX.Element {
  const { zoneId } = useParams();
  const [timeAverage] = useAtom(timeAverageAtom);
  const { error, data, status } = useGetZone(timeAverage, zoneId, {
    enabled: Boolean(zoneId),
  });

  if (!zoneId) {
    return <Navigate to="/" replace />;
  }

  // TODO: Handle error state
  // TODO: Handle loading state nicely (let's keep country name in the header)
  console.error(error);
  console.log('I should do something with all this data', data);

  return (
    <div>
      <ZoneHeader
        zoneId={zoneId}
        date="November 9, 2022 at 8:00"
        isEstimated
        isAggregated
      />
      yo
      <div className="flex h-full flex-col items-center justify-center">
        <div className="h-2 w-4 bg-gray-100 bg-[url('/loading-icon.svg')] bg-[length:100px] bg-center bg-no-repeat dark:bg-gray-900 dark:bg-[url('/loading-icon-darkmode.svg')]" />
        <p>xxxfffsLoxcading...</p>
      </div>
      {/* {status === 'loading' && 'Loading...'} */}
    </div>
  );
}
