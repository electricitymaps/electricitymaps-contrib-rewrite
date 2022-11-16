import ToggleButton from 'components/ToggleButton';
import { useAtom } from 'jotai';
import type { ReactElement } from 'react';
import { Mode, productionConsumptionAtom } from 'utils/state';

export default function ConsumptionProductionToggle(): ReactElement {
  const options = ['production', 'consumption'];
  const [currentMode, setCurrentMode] = useAtom(productionConsumptionAtom);
  const onSetCurrentMode = (option: string) => {
    if (option === currentMode) return;
    setCurrentMode(currentMode === 'production' ? Mode.CONSUMPTION : Mode.PRODUCTION);
  };

  return (
    <ToggleButton
      options={options}
      tooltipText="tooltips.cpinfo"
      selectedOption={currentMode}
      onToggle={onSetCurrentMode}
    />
  );
}
