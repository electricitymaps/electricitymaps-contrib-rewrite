import ToggleButton from 'components/ToggleButton';
import { useAtom } from 'jotai';
import type { ReactElement } from 'react';
import { ToggleOptions } from 'utils/constants';
import { spatialAggregateAtom } from 'utils/state';

export default function SpatialAggregatesToggle(): ReactElement {
  const options = [
    { value: 'country', translationKey: 'aggregateButtons.country' },
    { value: 'zone', translationKey: 'aggregateButtons.zone' },
  ];
  const [currentMode, setCurrentMode] = useAtom(spatialAggregateAtom);
  const onSetCurrentMode = (option: string) => {
    if (
      (option === 'zone' && currentMode === ToggleOptions.OFF) ||
      (option === 'country' && currentMode === ToggleOptions.ON)
    )
      return;
    setCurrentMode(
      currentMode === ToggleOptions.OFF ? ToggleOptions.ON : ToggleOptions.OFF
    );
  };

  return (
    <ToggleButton
      options={options}
      tooltipText="tooltips.aggregateinfo"
      selectedOption={
        currentMode === ToggleOptions.OFF ? options[1].value : options[0].value
      }
      onToggle={onSetCurrentMode}
    />
  );
}
