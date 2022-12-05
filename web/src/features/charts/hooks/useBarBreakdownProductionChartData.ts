import useGetZone from 'api/getZone';
import { useAtom } from 'jotai';
import { productionConsumptionAtom, selectedDatetimeIndexAtom } from 'utils/state';
import {
  getDataBlockPositions,
  getExchangeData,
  getProductionData,
} from '../bar-breakdown/utils';

export default function useBarBreakdownChartData() {
  // TODO: Create hook for using "current" selectedTimeIndex of data instead
  const { data: zoneData, isLoading } = useGetZone();
  const [selectedDatetime] = useAtom(selectedDatetimeIndexAtom);
  const [mixMode] = useAtom(productionConsumptionAtom);
  const currentData = zoneData?.zoneStates?.[selectedDatetime.datetimeString];
  if (isLoading || !zoneData || !selectedDatetime.datetimeString || !currentData) {
    return {
      height: 0,
      data: {},
      exchangeData: [],
      productionData: [],
      isLoading: true,
    };
  }

  const exchangeKeys = []; // TODO: Fix
  const productionData = getProductionData(currentData); // TODO: Consider memoing this
  const exchangeData = getExchangeData(currentData, exchangeKeys, mixMode); // TODO: Consider memoing this

  const { exchangeY, exchangeHeight } = getDataBlockPositions(
    productionData.length,
    exchangeData
  );
  const height = exchangeY + exchangeHeight;

  return {
    height,
    data: zoneData, // TODO: Data is returned here just to pass it back to the tooltip
    exchangeData,
    productionData,
    isLoading: false,
  };
}
