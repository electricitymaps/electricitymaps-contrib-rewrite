/* eslint-disable unicorn/no-null */
import { CarbonIntensityDisplay } from 'components/CarbonIntensity';
import { useCo2ColorScale } from 'hooks/theme';
import { useAtom } from 'jotai';
import AreaGraphToolTipHeader from 'stories/tooltips/AreaGraphTooltipHeader';
import { useTranslation } from 'translation/translation';
import { formatDate } from 'utils/formatting';
import { timeAverageAtom } from 'utils/state/atoms';
import { getTotalElectricity, tonsPerHourToGramsPerMinute } from '../graphUtils';
import { InnerAreaGraphTooltipProps } from '../types';

export default function EmissionChartTooltip(props: InnerAreaGraphTooltipProps) {
  const [timeAverage] = useAtom(timeAverageAtom);
  const { i18n, __ } = useTranslation();
  const { zoneDetail } = props;

  const co2ColorScale = useCo2ColorScale();

  if (!zoneDetail) {
    return null;
  }

  const totalEmissions =
    Math.round(tonsPerHourToGramsPerMinute(getTotalElectricity(zoneDetail, true)) * 100) /
    100;
  const { co2intensity, stateDatetime } = zoneDetail;

  return (
    <div className="w-[350px] rounded-md bg-white p-3 shadow-xl">
      <AreaGraphToolTipHeader
        datetime={new Date(stateDatetime)}
        timeAverage={timeAverage}
        squareColor="#a5292a"
        title={__('country-panel.emissions')}
      />
      <p className="flex justify-center text-base">
        <b className="mr-1">{totalEmissions}t</b> {__('ofCO2eqPerMinute')}
      </p>
    </div>
  );
}
