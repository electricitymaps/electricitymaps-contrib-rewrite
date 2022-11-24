import { getShortenedZoneNameWithCountry } from '../translation/translation';
import { useCo2ColorScale } from '../hooks/theme';
import { getFlagUri } from '../components/Flag';

export function CarbonIntensity({ intensity }: { intensity?: number }) {
  const co2ColorScale = useCo2ColorScale();

  return (
    <div className="flex h-3 items-center">
      <div
        className="mr-1 h-3 w-3"
        style={{ backgroundColor: co2ColorScale(intensity ?? 0) }}
      />
      <b className="flex items-center">{Math.round(intensity ?? 0) || '?'}</b> gCO₂eq/kWh
    </div>
  );
}

export function MetricRatio({ value, total, format }: any) {
  return (
    <small>{`(${Number.isFinite(value) ? format(value) : '?'} / ${
      Number.isFinite(total) ? format(total) : '?'
    })`}</small>
  );
}

export function ZoneName({ zone, textStyle }: { zone: string; textStyle?: string }) {
  return (
    <div className="flex items-center">
      <img className="mr-1 h-4 w-4" alt={`flag-${zone}`} src={getFlagUri(zone)} />
      <p className={`truncate text-xs ${textStyle}`}>
        {getShortenedZoneNameWithCountry(zone)}
      </p>
    </div>
  );
}
