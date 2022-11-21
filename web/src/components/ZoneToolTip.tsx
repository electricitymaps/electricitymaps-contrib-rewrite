import type { ReactElement } from 'react';

import * as Portal from '@radix-ui/react-portal';

import * as Tooltip from '@radix-ui/react-tooltip';

interface ZoneToolTipProperties {
  mousePositionX: number;
  mousePositionY: number;
}

export default function ZoneToolTip(properties: ZoneToolTipProperties): ReactElement {
  console.log('properties', properties);
  const { mousePositionX, mousePositionY } = properties;
  return (
    <Portal.Root className="fixed left-5 top-10">
      <Tooltip.Provider>
        <Tooltip.Root open={true} delayDuration={0}>
          <Tooltip.Trigger>
            <div></div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="TooltipContent relative  h-7 max-w-[164px] rounded border bg-white p-1 px-3 text-center text-sm drop-shadow-sm dark:border-0 dark:bg-gray-900"
              sideOffset={3}
              side="top"
              style={{ left: mousePositionX, top: mousePositionY }}
            >
              <div>dsss</div>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </Portal.Root>
  );
}
