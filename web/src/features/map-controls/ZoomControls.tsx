import { ReactElement, useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { useTranslation } from 'translation/translation';
import StandardTooltip from 'components/TooltipWrapper';
import TooltipWrapper from 'components/TooltipWrapper';

interface ZoomControlsProperties {}

export default function ZoomControls(properties: ZoomControlsProperties): ReactElement {
  const [value, setValue] = useState('');
  const { __ } = useTranslation();

  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      orientation="vertical"
      onValueChange={(value) => {
        if (value) {
          setValue(value);
        }
      }}
      className="flex flex-col"
    >
      <TooltipWrapper tooltipText={__('tooltips.zoomIn')}>
        <ToggleGroup.Item
          className="h-8 w-8 rounded rounded-b-none bg-white drop-shadow"
          value="zoomIn"
        >
          <text>+</text>
        </ToggleGroup.Item>
      </TooltipWrapper>
      <TooltipWrapper tooltipText={__('tooltips.zoomOut')}>
        <ToggleGroup.Item
          className="h-8 w-8 rounded  rounded-t-none bg-white drop-shadow"
          value="zoomOut"
        >
          <text>-</text>
        </ToggleGroup.Item>
      </TooltipWrapper>
    </ToggleGroup.Root>
  );
}
