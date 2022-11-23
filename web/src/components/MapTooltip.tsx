import type { ReactElement } from 'react';

import * as Portal from '@radix-ui/react-portal';

import * as Tooltip from '@radix-ui/react-tooltip';

interface MapTooltipProperties {
  mousePositionX: number;
  mousePositionY: number;
  hoveredFeature?: { featureId: string | number | undefined; zoneId: string };
  isMoving: boolean;
}

const ToolTipFlipBoundary = 100;
const RightOffset = 10;
const TopOffset = 10;

const getTooltipPosition = (
  mousePositionX: number,
  mousePositionY: number,
  screenHeight: number,
  screenWidth: number
) => {
  const mousePosition = { x: mousePositionX, y: mousePositionY };
  if (screenWidth - mousePositionX < ToolTipFlipBoundary) {
    mousePosition.x = mousePositionX - ToolTipFlipBoundary;
  }
  if (screenHeight - mousePositionY < ToolTipFlipBoundary) {
    mousePosition.y = mousePositionY - ToolTipFlipBoundary;
  }
  if (mousePositionX < ToolTipFlipBoundary) {
    mousePosition.x = mousePositionX + ToolTipFlipBoundary;
  }
  if (mousePositionY < ToolTipFlipBoundary) {
    mousePosition.y = mousePositionY + ToolTipFlipBoundary;
  }

  if (mousePosition.x === mousePositionX && mousePosition.y === mousePositionY) {
    return { x: mousePositionX + RightOffset, y: mousePositionY - TopOffset };
  }

  return mousePosition;
};
export default function MapTooltip(properties: MapTooltipProperties): ReactElement {
  const { mousePositionX, mousePositionY, hoveredFeature, isMoving } = properties;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const mousePosition = getTooltipPosition(
    mousePositionX,
    mousePositionY,
    screenHeight,
    screenWidth
  );

  console.log('render', mousePositionX);
  return (
    <Portal.Root className="absolute left-0 top-0">
      <Tooltip.Provider>
        <Tooltip.Root open={Boolean(hoveredFeature && !isMoving)} delayDuration={0}>
          <Tooltip.Trigger>
            <div></div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="relative  h-7 max-w-[164px] rounded border bg-white p-1 px-3 text-center text-sm drop-shadow-sm dark:border-0 dark:bg-gray-900"
              sideOffset={5}
              side="top"
              style={{ left: mousePosition.x, top: mousePosition.y }}
            >
              <div>{hoveredFeature?.zoneId}</div>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </Portal.Root>
  );
}
