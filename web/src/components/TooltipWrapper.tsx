import { ReactElement } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface TooltipWrapperProperties {
  tooltipText?: string | ReactElement;
  children: ReactElement;
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  tooltipClassName?: string;
}

export default function TooltipWrapper(
  properties: TooltipWrapperProperties
): ReactElement {
  const { tooltipText, children, side, sideOffset, tooltipClassName } = properties;
  if (!tooltipText) {
    return children;
  }
  return (
    <Tooltip.Provider disableHoverableContent>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={
              tooltipClassName ??
              'relative  h-7 max-w-[164px] rounded border bg-white p-1 px-3 text-center text-sm drop-shadow-sm dark:border-0 dark:bg-gray-900'
            }
            sideOffset={sideOffset ?? 3}
            side={side ?? 'left'}
          >
            <div>{tooltipText}</div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
