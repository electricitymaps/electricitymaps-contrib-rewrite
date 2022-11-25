import { PulseLoader } from 'react-spinners';
import { TimeAverages } from 'utils/constants';
import AreaGraph from './elements/AreaGraph';
import { noop } from './graphUtils';
import { usePriceChartData } from './hooks/usePriceChartData';

interface PriceChartProps {
  datetimes: Date[];
  timeAverage: TimeAverages;
}

function PriceChart({ datetimes, timeAverage }: PriceChartProps) {
  // TODO: incorporate https://github.com/electricitymaps/electricitymaps-contrib/pull/4749
  const { data, isLoading, isError } = usePriceChartData();

  if (isLoading || isError || !data) {
    return <PulseLoader />;
  }

  const { chartData, layerFill, layerKeys, layerStroke, valueAxisLabel, markerFill } =
    data;

  // sporadically missing data
  const spreadMissing = [chartData[2], chartData[3], chartData[22], chartData[23]];

  const firstN = chartData.slice(0, 2);

  const lastN = [
    chartData[chartData.length - 4],
    chartData[chartData.length - 3],
    chartData[chartData.length - 2],
    chartData[chartData.length - 1],
  ];

  const nullValues = chartData;
  nullValues[3] = {
    ...chartData[3],
    layerData: {
      price: Number.NaN,
    },
  };

  return (
    <div className="ml-3">
      <AreaGraph
        testId="history-prices-graph"
        data={nullValues}
        layerKeys={layerKeys}
        layerStroke={layerStroke}
        layerFill={layerFill}
        markerFill={markerFill}
        valueAxisLabel={valueAxisLabel}
        markerUpdateHandler={noop}
        markerHideHandler={noop}
        isMobile={false}
        height="6em"
        datetimes={datetimes}
        selectedTimeAggregate={timeAverage}
        isOverlayEnabled={false}
      />
    </div>
  );
}

export default PriceChart;
