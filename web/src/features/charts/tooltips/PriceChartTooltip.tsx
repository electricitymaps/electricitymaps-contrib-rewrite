import { InnerAreaGraphTooltipProps } from '../types';

export default function PriceChartTooltip(props: InnerAreaGraphTooltipProps) {
  const { zoneDetail } = props;
  return <p>{zoneDetail.price?.value}</p>;
}
