import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ReactElement, useState } from 'react';
import { useTranslation } from '../translation/translation';

interface ToggleButtonProperties {
  options: Array<{ value: string; translationKey: string }>;
  selectedOption: string;
  onToggle: (option: string) => void;
  tooltipKey?: string;
  fontSize?: string;
}

export default function ToggleButton({
  options,
  selectedOption,
  tooltipKey,
  onToggle,
  fontSize = 'text-sm',
}: ToggleButtonProperties): ReactElement {
  const { __ } = useTranslation();
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const onToolTipClick = () => {
    setIsToolTipOpen(!isToolTipOpen);
  };
  const onKeyPressed = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onToolTipClick();
    }
  };
  return (
    <div className="z-10 flex h-9 rounded-full bg-zinc-100  px-[5px] py-1  drop-shadow-lg dark:bg-gray-900">
      <ToggleGroupPrimitive.Root
        className={
          'flex-start flex h-[26px] flex-grow flex-row items-center justify-between self-center rounded-full bg-gray-100 shadow-inner dark:bg-gray-700'
        }
        type="single"
        aria-label="Toggle between modes"
        value={selectedOption}
      >
        {options.map((option, key) => (
          <ToggleGroupPrimitive.Item
            key={`group-item-${key}`}
            value={option.value}
            onClick={() => onToggle(option.value)}
            className={`
       inline-flex h-[26px] w-full  items-center whitespace-nowrap rounded-full px-4 ${fontSize} ${
              option.value === selectedOption
                ? ' bg-white  shadow transition duration-500 ease-in-out dark:bg-gray-500'
                : ''
            }`}
          >
            <p className="sans flex-grow select-none  dark:text-white">
              {__(option.translationKey)}
            </p>
          </ToggleGroupPrimitive.Item>
        ))}
      </ToggleGroupPrimitive.Root>
      {tooltipKey && (
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={0} open={isToolTipOpen}>
            <Tooltip.Trigger asChild>
              <div
                onClick={onToolTipClick}
                onKeyDown={onKeyPressed}
                role="button"
                tabIndex={0}
                className="b ml-2 h-6 w-6 select-none justify-center self-center rounded-full bg-white text-center drop-shadow dark:border dark:border-gray-500 dark:bg-gray-900"
              >
                <p>i</p>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="relative right-[48px] z-50 max-w-[164px] rounded border bg-gray-100 p-2  text-center text-sm drop-shadow-sm dark:border-0 dark:bg-gray-900"
                sideOffset={10}
                side="bottom"
                onPointerDownOutside={onToolTipClick}
              >
                <div dangerouslySetInnerHTML={{ __html: __(tooltipKey) }} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
}
