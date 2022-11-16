import ToggleButton from 'components/ToggleButton';
import { useAtom } from 'jotai';
import type { ReactElement } from 'react';
import { Mode } from 'utils/constants';
import { productionConsumptionAtom } from 'utils/state';

export default function ConsumptionProductionToggle(): ReactElement {
  const options = [
    { value: 'production', translationKey: 'tooltips.production' },
    { value: 'consumption', translationKey: 'tooltips.consumption' },
  ];
  const [currentMode, setCurrentMode] = useAtom(productionConsumptionAtom);
  const onSetCurrentMode = (option: string) => {
    if (option === currentMode) return;
    setCurrentMode(currentMode === Mode.PRODUCTION ? Mode.CONSUMPTION : Mode.PRODUCTION);
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
