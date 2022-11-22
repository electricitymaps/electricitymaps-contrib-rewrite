import type { ReactElement } from 'react';
import { useTranslation } from 'translation/translation';
import { ExchangeArrowData } from 'types';
import { formatPower } from 'utils/formatting';
import { CarbonIntensity, ZoneName } from 'utils/tooltipHelpers';

interface ExchangeTooltipProperties {
  exchangeData: ExchangeArrowData;
}

export default function ExchangeTooltip(
  properties: ExchangeTooltipProperties
): ReactElement {
  const { key, netFlow, co2intensity } = properties.exchangeData;
  console.log('data', key, netFlow, properties.exchangeData);
  const { __ } = useTranslation();
  const isExporting = netFlow > 0;
  const roundedNetFlow = Math.abs(Math.round(netFlow));
  const zoneFrom = key.split('->')[isExporting ? 0 : 1];
  const zoneTo = key.split('->')[!isExporting ? 0 : 1];

  return (
    <div className="p-1">
      {__('tooltips.crossborderexport')}:
      <div className="flex  p-1">
        <ZoneName zone={zoneFrom} /> <p className="m-2">→</p> <ZoneName zone={zoneTo} />
        <b className="pt-0 text-xs ">:{formatPower(roundedNetFlow)}</b>
      </div>
      {__('tooltips.carbonintensityexport')}:
      <div className="flex p-1">
        {' '}
        {Boolean(co2intensity) && <CarbonIntensity intensity={co2intensity} />}
      </div>
    </div>
  );
}
