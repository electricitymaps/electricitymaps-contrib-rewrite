import * as Portal from '@radix-ui/react-portal';
import type { ReactElement } from 'react';
import { ZoneDetail } from 'types';
import {
  AreaGraphElement,
  InnerAreaGraphTooltipProps,
} from '../../features/charts/types';
import { getOffsetTooltipPosition } from './utilities';

interface AreaGraphTooltipProperties {
  children: (props: InnerAreaGraphTooltipProps) => ReactElement;
  selectedLayerKey?: string;
  zoneDetail?: ZoneDetail;
  dataPoint?: AreaGraphElement;
  position?: { x: number; y: number } | undefined;
  tooltipSize?: 'small' | 'large';
}

export default function AreaGraphTooltip(
  properties: AreaGraphTooltipProperties
): ReactElement | null {
  const { children, zoneDetail, selectedLayerKey, position, tooltipSize } = properties;

  if (
    children === undefined ||
    selectedLayerKey === undefined ||
    zoneDetail === undefined
  ) {
    return null;
  }

  const tooltipWithDataPositon = getOffsetTooltipPosition(
    position?.x || 0,
    position?.y || 0,
    tooltipSize === 'large' ? 360 : 160
  );

  return (
    <Portal.Root className="absolute left-0 top-0 h-0 w-0">
      <div
        style={{
          left: tooltipWithDataPositon.x,
          top: tooltipWithDataPositon.y,
          position: 'relative',
        }}
      >
        {children({ zoneDetail, selectedLayerKey })}
      </div>
    </Portal.Root>
  );
}
