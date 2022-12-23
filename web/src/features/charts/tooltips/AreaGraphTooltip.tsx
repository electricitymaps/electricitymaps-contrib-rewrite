import * as Portal from '@radix-ui/react-portal';
import type { ReactElement } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { ZoneDetail } from 'types';
import { getOffsetTooltipPosition } from '../../../components/tooltips/utilities';
import { AreaGraphElement, InnerAreaGraphTooltipProps } from '../types';

interface AreaGraphTooltipProperties {
  children: (props: InnerAreaGraphTooltipProps) => ReactElement;
  selectedLayerKey?: string;
  zoneDetail?: ZoneDetail;
  dataPoint?: AreaGraphElement;
  position?: { x: number; y: number } | undefined;
  tooltipSize?: 'small' | 'large';
  isBiggerThanMobile: boolean;
}

export default function AreaGraphTooltip(
  properties: AreaGraphTooltipProperties
): ReactElement | null {
  const {
    children,
    zoneDetail,
    selectedLayerKey,
    position,
    tooltipSize,
    isBiggerThanMobile,
  } = properties;

  if (
    children === undefined ||
    selectedLayerKey === undefined ||
    zoneDetail === undefined
  ) {
    return null;
  }

  const tooltipWithDataPositon = getOffsetTooltipPosition({
    mousePositionX: position?.x || 0,
    mousePositionY: position?.y || 0,
    tooltipHeight: tooltipSize === 'large' ? 360 : 160,
    isBiggerThanMobile,
  });

  return (
    <Portal.Root className="pointer-events-auto absolute left-0 top-0 z-50 h-full w-full bg-black/20 sm:h-0 sm:w-0">
      <div
        style={{
          left: tooltipWithDataPositon.x,
          top: tooltipWithDataPositon.y,
        }}
        className="relative flex flex-col items-center gap-y-1 p-2 pt-14 sm:block sm:p-0"
      >
        {children({ zoneDetail, selectedLayerKey })}
        <button className="p-auto pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white shadow dark:bg-gray-900 sm:hidden">
          <HiXMark size="24" />
        </button>
      </div>
    </Portal.Root>
  );
}
