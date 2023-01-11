import ToggleButton from 'components/ToggleButton';
import { useAtom } from 'jotai';
import type { ReactElement } from 'react';
import trackEvent from 'utils/analytics';
import { Mode } from 'utils/constants';
import { displayByEmissionsAtom, productionConsumptionAtom } from 'utils/state/atoms';

export default function EmissionToggle(): ReactElement {
  const [mixMode] = useAtom(productionConsumptionAtom);
  const [displayByEmissions, setDisplayByEmissions] = useAtom(displayByEmissionsAtom);

  // TODO: perhaps togglebutton should accept boolean values
  const options = [
    {
      value: false.toString(),
      translationKey:
        mixMode === Mode.PRODUCTION
          ? 'country-panel.electricityproduction'
          : 'country-panel.electricityconsumption',
    },
    { value: true.toString(), translationKey: 'country-panel.emissions' },
  ];

  const onSetCurrentMode = () => {
    if (displayByEmissions) {
      trackEvent('PanelProductionButton Clicked');
    } else {
      trackEvent('PanelEmissionButton Clicked');
    }

    setDisplayByEmissions(!displayByEmissions);
  };

  return (
    <div className="px-4 pt-3 xl:px-10">
      <ToggleButton
        options={options}
        selectedOption={displayByEmissions.toString()}
        onToggle={onSetCurrentMode}
        fontSize="text-sm"
      />
    </div>
  );
}
