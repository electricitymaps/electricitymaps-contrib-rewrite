import MapButton from 'components/MapButton';
import { useAtom } from 'jotai';
import { ReactElement, useState } from 'react';
import { FiWind } from 'react-icons/fi';
import { HiOutlineEyeOff, HiOutlineSun } from 'react-icons/hi';
import { HiLanguage } from 'react-icons/hi2';
import { MoonLoader } from 'react-spinners';
import { useTranslation } from 'translation/translation';
import { ToggleOptions } from 'utils/constants';
import {
  selectedDatetimeIndexAtom,
  solarLayerEnabledAtom,
  solarLayerLoadingAtom,
  windLayerAtom,
  windLayerLoadingAtom,
} from 'utils/state/atoms';
import ConsumptionProductionToggle from './ConsumptionProductionToggle';
import LanguageSelector from './LanguageSelector';
import SpatialAggregatesToggle from './SpatialAggregatesToggle';

const weatherButtonMap = {
  wind: {
    icon: FiWind,
    iconSize: 18,
    enabledAtom: windLayerAtom,
    loadingAtom: windLayerLoadingAtom,
  },
  solar: {
    icon: HiOutlineSun,
    iconSize: 21,
    enabledAtom: solarLayerEnabledAtom,
    loadingAtom: solarLayerLoadingAtom,
  },
};

function WeatherButton({ type }: { type: 'wind' | 'solar' }) {
  const { __ } = useTranslation();
  const [enabled, setEnabled] = useAtom(weatherButtonMap[type].enabledAtom);
  const [isLoadingLayer, setIsLoadingLayer] = useAtom(weatherButtonMap[type].loadingAtom);
  const isEnabled = enabled === ToggleOptions.ON;
  const Icon = weatherButtonMap[type].icon;

  const onToggle = () => {
    if (!isEnabled) {
      setIsLoadingLayer(true);
    }
    setEnabled(isEnabled ? ToggleOptions.OFF : ToggleOptions.ON);
  };

  return (
    <MapButton
      icon={
        isLoadingLayer ? (
          <MoonLoader size={14} color="#135836" />
        ) : (
          <Icon size={weatherButtonMap[type].iconSize} color={isEnabled ? '' : 'gray'} />
        )
      }
      tooltipText={__(`tooltips.${type}}`)}
      dataTestId={`${type}-layer-button`}
      className={`mt-2 ${isLoadingLayer ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={!isLoadingLayer ? onToggle : () => {}}
    />
  );
}

export default function MapControls(): ReactElement {
  const { __ } = useTranslation();
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [selectedDatetime] = useAtom(selectedDatetimeIndexAtom);

  // We currently only support showing weather layers for the latest timestamp
  const areWeatherLayersAllowed = selectedDatetime.index === 24;

  return (
    <div className="z-1000 pointer-events-none absolute right-3 top-3 hidden flex-col items-end md:flex">
      <div className="pointer-events-auto mb-16 flex flex-col items-end">
        <ConsumptionProductionToggle />
        <div className="mb-1"></div>
        <SpatialAggregatesToggle />
      </div>
      <MapButton
        icon={<HiLanguage size={21} />}
        tooltipText={__('tooltips.selectLanguage')}
        dataTestId="language-selector-open-button"
        className="mt-5"
        onClick={() => setIsLanguageSelectorOpen(!isLanguageSelectorOpen)}
      />
      {isLanguageSelectorOpen && (
        <LanguageSelector setLanguageSelectorOpen={setIsLanguageSelectorOpen} />
      )}

      <MapButton
        icon={<HiOutlineEyeOff size={21} className="opacity-50" />}
        className="mt-2"
        dataTestId="colorblind-layer-button"
        tooltipText={__('legends.colorblindmode')}
        onClick={() => {
          console.log('toggle colorblind mode');
        }}
      />
      {areWeatherLayersAllowed && (
        <>
          <WeatherButton type="wind" />
          <WeatherButton type="solar" />
        </>
      )}
    </div>
  );
}
