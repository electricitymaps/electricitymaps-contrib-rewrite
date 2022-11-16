import { ReactElement } from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useTranslation } from '../translation/translation';

interface ToggleButtonProperties {
  options: string[];
  selectedOption: string;
  onToggle: (option: string) => void;
  tooltipText?: string;
}

export default function ToggleButton({
  options,
  selectedOption,
  tooltipText,
  onToggle,
}: ToggleButtonProperties): ReactElement {
  const { __ } = useTranslation();
  console.log('Options', options, selectedOption);
  return (
    <div className="flex h-9 rounded-full border bg-gray-100 p-1 drop-shadow">
      <ToggleGroupPrimitive.Root
        className={
          'flex-start  flex h-7 flex-row items-center gap-x-2 self-center rounded-full border bg-gray-100  drop-shadow'
        }
        type="multiple"
        aria-label="Font settings"
      >
        {options.map((option, key) => (
          <ToggleGroupPrimitive.Item
            key={`group-item-${key}`}
            value={option}
            onClick={() => onToggle(option)}
            className={`
       inline-flex h-6 rounded-full px-4 pt-1 text-sm  ${
         option === selectedOption ? 'bg-white drop-shadow ' : 'bg-gray-100'
       }`}
          >
            <p className="sans w-15">{option}</p>
          </ToggleGroupPrimitive.Item>
        ))}
      </ToggleGroupPrimitive.Root>
      {tooltipText && (
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger asChild>
              <div className="ml-2 h-6 w-6 justify-center self-center rounded-full bg-white text-center drop-shadow">
                <text>i</text>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="TooltipContent relative right-[76px] max-w-[164px] rounded border bg-gray-100 p-2 text-center text-sm drop-shadow-sm"
                sideOffset={10}
                side="bottom"
              >
                <div dangerouslySetInnerHTML={{ __html: __(tooltipText) }} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
}
