import { GenerationType } from 'types';
import { InnerAreaGraphTooltipProps } from '../types';

export default function BreakdownChartTooltip(props: InnerAreaGraphTooltipProps) {
  const { zoneDetail, selectedLayerKey } = props;
  const generationType = selectedLayerKey as GenerationType;

  return (
    <div>
      <p>{selectedLayerKey}</p>
      <p>{zoneDetail.production[generationType]}</p>
    </div>
  );
}
