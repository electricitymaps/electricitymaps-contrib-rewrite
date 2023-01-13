import ToggleButton from 'components/ToggleButton';
import { useAtom } from 'jotai';
import type { ReactElement } from 'react';
import { MixMode } from 'utils/constants';
import { productionConsumptionAtom } from 'utils/state/atoms';

export default function ConsumptionProductionToggle(): ReactElement {
  const options = [
    { value: MixMode.PRODUCTION, translationKey: 'tooltips.production' },
    { value: MixMode.CONSUMPTION, translationKey: 'tooltips.consumption' },
  ];
  const [currentMode, setCurrentMode] = useAtom(productionConsumptionAtom);
  const onSetCurrentMode = (option: string) => {
    if (option === currentMode) {
      return;
    }
    setCurrentMode(
      currentMode === MixMode.PRODUCTION ? MixMode.CONSUMPTION : MixMode.PRODUCTION
    );
  };

  return (
    <ToggleButton
      options={options}
      tooltipKey="tooltips.cpinfo"
      selectedOption={currentMode}
      onToggle={onSetCurrentMode}
    />
  );
}
