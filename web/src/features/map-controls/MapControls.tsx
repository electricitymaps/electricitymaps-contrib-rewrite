import MapButton from 'components/MapButton';
import type { ReactElement } from 'react';
import ConsumptionProductionToggle from './ConsumptionProductionToggle';
import SpatialAggregatesToggle from './SpatialAggregatesToggle';
import { useTranslation } from 'translation/translation';
interface MapControlsProperties {}

export default function MapControls(properties: MapControlsProperties): ReactElement {
  const { __ } = useTranslation();

  return (
    <div className="z-1000 absolute  right-3 top-3 flex flex-col items-end">
      <div className="mb-16 flex flex-col items-end">
        <ConsumptionProductionToggle />
        <div className="mb-1"></div>
        <SpatialAggregatesToggle />
      </div>
      <MapButton
        icon="EN"
        tooltipText={__('tooltips.selectLanguage')}
        className="mt-5"
        onClick={() => {
          console.log('change the language');
        }}
      />
      <MapButton
        icon="W"
        tooltipText={__('tooltips.weather')}
        className="mt-2"
        onClick={() => {
          console.log('change the toggle weather');
        }}
      />

      <MapButton
        icon="S"
        className="mt-2"
        tooltipText={__('tooltips.solar')}
        onClick={() => {
          console.log('change the toggle solar');
        }}
      />
    </div>
  );
}
