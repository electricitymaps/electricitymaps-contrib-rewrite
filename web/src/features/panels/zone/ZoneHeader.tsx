import CarbonIntensitySquare from 'components/CarbonIntensitySquare';
import { CircularGauge } from 'components/CircularGauge';
import ZoneHeaderTitle from './ZoneHeaderTitle';

interface ZoneHeaderProps {
  zoneId: string;
  date: string;
  isEstimated?: boolean;
  isAggregated?: boolean;
}

export function ZoneHeader({ date, zoneId, isEstimated, isAggregated }: ZoneHeaderProps) {
  return (
    <div className="mt-1 grid w-full gap-y-5 sm:pr-4">
      <ZoneHeaderTitle
        zoneId={zoneId}
        formattedDate={date}
        isEstimated={isEstimated}
        isAggregated={isAggregated}
      />
      <div className="flex flex-row justify-evenly">
        <CarbonIntensitySquare co2intensity={60} withSubtext />
        <CircularGauge name="Low-carbon" ratio={0.78} />
        <CircularGauge name="Renewable" ratio={0.65} />
      </div>
    </div>
  );
}
