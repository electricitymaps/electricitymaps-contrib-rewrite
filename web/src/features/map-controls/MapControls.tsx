import MapButton from 'components/MapButton';
import type { ReactElement } from 'react';
import ConsumptionProductionToggle from './ConsumptionProductionToggle';
import SpatialAggregatesToggle from './SpatialAggregatesToggle';
import ZoomControls from './ZoomControls';
import { useTranslation } from 'translation/translation';

interface MapControlsProperties {}

export default function MapControls(properties: MapControlsProperties): ReactElement {
  const { __ } = useTranslation();
  return (
    <div className="z-1000 absolute  right-3 top-3 flex flex-col items-end">
      <div className="mb-2">
        <ConsumptionProductionToggle />
        <div className="mb-1"></div>
        <SpatialAggregatesToggle />
      </div>
      <ZoomControls />
      <MapButton
        icon="EN"
        tooltipText={__('tooltips.selectLanguage')}
        className="mt-2"
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

      <MapButton
        icon="GN"
        className="mt-2"
        tooltipText={__('tooltips.toggleDarkMode')}
        onClick={() => {
          console.log('change the dark mode');
        }}
      />
    </div>
  );
}
