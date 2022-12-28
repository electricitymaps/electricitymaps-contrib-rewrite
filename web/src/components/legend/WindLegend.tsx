import type { ReactElement } from 'react';
import { useTranslation } from 'translation/translation';
import HorizontalColorbar from './ColorBar';
import { windColor } from 'features/weather-layers/wind-layer/scales';

function LegendItem({
  isEnabled,
  label,
  unit,
  children,
}: {
  isEnabled: boolean;
  label: string;
  unit: string | ReactElement;
  children: ReactElement;
}) {
  return !isEnabled ? null : (
    <div className="text-center">
      <p className="py-1  text-base">
        {label} <small>({unit})</small>
      </p>
      {children}
    </div>
  );
}

export default function WindLegend(): ReactElement {
  const { __ } = useTranslation();
  return (
    <div>
      <LegendItem label={__('legends.windpotential')} unit="m/s" isEnabled>
        <HorizontalColorbar colorScale={windColor} id="wind" ticksCount={6} />
      </LegendItem>
    </div>
  );
}
