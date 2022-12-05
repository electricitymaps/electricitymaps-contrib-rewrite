import CarbonIntensitySquare from 'components/CarbonIntensitySquare';
import { CircularGauge } from 'components/CircularGauge';
import ZoneHeaderTitle from './ZoneHeaderTitle';

interface ZoneHeaderProps {
  zoneId: string;
  isEstimated?: boolean;
  isAggregated?: boolean;
  co2intensity: number;
  lowCarbonRatio: number;
  renewableRatio: number;
}

export function ZoneHeader({
  zoneId,
  isEstimated,
  isAggregated,
  co2intensity,
  lowCarbonRatio,
  renewableRatio,
}: ZoneHeaderProps) {
  return (
    <div className="mt-1 grid w-full gap-y-5">
      <ZoneHeaderTitle
        zoneId={zoneId}
        isEstimated={isEstimated}
        isAggregated={isAggregated}
      />
      <div className="flex flex-row justify-evenly">
        <CarbonIntensitySquare co2intensity={co2intensity} withSubtext />
        <CircularGauge name="Low-carbon" ratio={lowCarbonRatio} />
        <CircularGauge name="Renewable" ratio={renewableRatio} />
      </div>
    </div>
  );
}
