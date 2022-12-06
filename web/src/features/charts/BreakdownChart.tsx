import { PulseLoader } from 'react-spinners';
import { TimeAverages } from 'utils/constants';
import AreaGraph from './elements/AreaGraph';
import { noop } from './graphUtils';
import useBreakdownChartData from './hooks/useBreakdownChartData';
import BreakdownChartTooltip from './tooltips/BreakdownChartTooltip';

interface BreakdownChartProps {
  datetimes: Date[];
  timeAverage: TimeAverages;
}

function BreakdownChart({ datetimes, timeAverage }: BreakdownChartProps) {
  const { data } = useBreakdownChartData();

  if (!data) {
    return <PulseLoader />;
  }

  const { chartData, valueAxisLabel, layerFill, layerKeys } = data;

  return (
    <div className="ml-3">
      <AreaGraph
        testId="history-mix-graph"
        data={chartData}
        layerKeys={layerKeys}
        layerFill={layerFill}
        valueAxisLabel={valueAxisLabel}
        markerUpdateHandler={noop}
        markerHideHandler={noop}
        isMobile={false} // Todo: test on mobile https://linear.app/electricitymaps/issue/ELE-1498/test-and-improve-charts-on-mobile
        height="10em"
        isOverlayEnabled={false} // TODO: create overlay https://linear.app/electricitymaps/issue/ELE-1499/implement-chart-overlay-for-unavailable-data
        datetimes={datetimes}
        selectedTimeAggregate={timeAverage}
        tooltip={BreakdownChartTooltip}
      />
    </div>
  );
}

export default BreakdownChart;
