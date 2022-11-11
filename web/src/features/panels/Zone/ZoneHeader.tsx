import CarbonIntensitySquare from 'components/CarbonIntensitySquare';
import { CircularGauge } from 'components/CircularGauge';
import { CountryTag } from './CountryTag';
import ZoneHeaderTitle from './ZoneHeaderTitle';

interface ZoneHeaderProps {
  zoneId: string;
}

export function ZoneHeader(props: ZoneHeaderProps) {
  const { zoneId } = props;
  // TODO: use correct zoneId

  return (
    <div className="mt-1 grid w-full gap-y-5 sm:pr-4">
      <ZoneHeaderTitle
        title="Western Area Power Administration Rocky Mountain Region "
        formattedDate="November 9, 2022 at 8:00"
        labels={[
          <div
            key="estimated-label"
            className="w-18 rounded-full bg-yellow-400 px-2 text-center text-xs"
          >
            Estimated
          </div>,
          <div
            key="aggregated-label"
            className="w-20 rounded-full bg-gray-400 px-2 text-center text-xs text-white"
          >
            Aggregated
          </div>,
        ]}
        countryTag={<CountryTag zoneId={'US-NW-WACM'} />}
      />
      <div className="flex flex-row justify-evenly">
        <CarbonIntensitySquare co2intensity={60} withSubtext />
        <CircularGauge name="Low-carbon" percentage={78} />
        <CircularGauge name="Renewable" percentage={65} />
      </div>
    </div>
  );
}
