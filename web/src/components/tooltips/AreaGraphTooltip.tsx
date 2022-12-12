/* eslint-disable unicorn/no-null */
import * as Portal from '@radix-ui/react-portal';
import type { ReactElement } from 'react';
import { ZoneDetail } from 'types';
import {
  AreaGraphElement,
  InnerAreaGraphTooltipProps,
} from '../../features/charts/types';
import { getTooltipPosition } from './utilities';

const TOOLTIP_WIDTH = 250;
const TOOLTIP_HEIGHT = 140;

interface AreaGraphTooltipProperties {
  children: (props: InnerAreaGraphTooltipProps) => ReactElement;
  selectedLayerKey?: string;
  zoneDetail?: ZoneDetail;
  dataPoint?: AreaGraphElement;
  position?: { x: number; y: number } | undefined;
}

export default function AreaGraphTooltip(
  properties: AreaGraphTooltipProperties
): ReactElement | null {
  const { children, zoneDetail, selectedLayerKey, position } = properties;

  if (
    children === undefined ||
    selectedLayerKey === undefined ||
    zoneDetail === undefined
  ) {
    return null;
  }

  const screenWidth = window.innerWidth;
  const tooltipWithDataPositon = getTooltipPosition(
    position?.x || 0,
    position?.y || 0,
    screenWidth,
    TOOLTIP_WIDTH,
    TOOLTIP_HEIGHT
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
