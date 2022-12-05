import { useAtom } from 'jotai';
import { PulseLoader } from 'react-spinners';
import { displayByEmissionsAtom } from 'utils/state';
import { useRefWidthHeightObserver } from 'utils/viewport';
import useBarBreakdownChartData from '../hooks/useBarBreakdownProductionChartData';
import BarBreakdownEmissionsChart from './BarBreakdownEmissionsChart';
import BarBreakdownProductionChart from './BarBreakdownProductionChart';

function BarBreakdownChart() {
  const { data, productionData, exchangeData, isLoading, height } =
    useBarBreakdownChartData();
  const [displayByEmissions] = useAtom(displayByEmissionsAtom);
  const { ref, width } = useRefWidthHeightObserver();

  if (isLoading) {
    // TODO: Replace with skeleton graph (maybe full graph with no data?)
    return <PulseLoader />;
  }

  // TODO: Show CountryTableOverlayIfNoData when required

  const todoHandler = () => {
    console.warn('TODO: Handle tooltips');
    // see countrytable.jsx
    // handleProductionRowMouseOver
    //handleProductionRowMouseOut
    //handleExchangeRowMouseOver
    //handleExchangeRowMouseOut
  };

  return (
    <div className="relative w-full" ref={ref}>
      {displayByEmissions ? (
        <BarBreakdownEmissionsChart
          data={data}
          productionData={productionData}
          exchangeData={exchangeData}
          onProductionRowMouseOver={todoHandler}
          onProductionRowMouseOut={todoHandler}
          onExchangeRowMouseOver={todoHandler}
          onExchangeRowMouseOut={todoHandler}
          width={width}
          height={height}
          isMobile={false}
        />
      ) : (
        <BarBreakdownProductionChart
          data={data}
          productionData={productionData}
          exchangeData={exchangeData}
          onProductionRowMouseOver={todoHandler}
          onProductionRowMouseOut={todoHandler}
          onExchangeRowMouseOver={todoHandler}
          onExchangeRowMouseOut={todoHandler}
          width={width}
          height={height}
          isMobile={false}
        />
      )}
    </div>
  );
}

export default BarBreakdownChart;
