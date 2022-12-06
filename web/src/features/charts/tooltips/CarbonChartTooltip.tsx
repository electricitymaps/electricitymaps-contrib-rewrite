import { InnerAreaGraphTooltipProps } from '../types';

export default function CarbonChartTooltip(props: InnerAreaGraphTooltipProps) {
  const { zoneDetail } = props;

  return <p>{zoneDetail?.co2intensity}</p>;
}
