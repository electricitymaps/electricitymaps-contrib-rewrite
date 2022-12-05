import useGetZone from 'api/getZone';
import { useAtom } from 'jotai';
import { selectedDatetimeIndexAtom } from 'utils/state/atoms';

const useSelectedData = () => {
  const { data, status, ...apiProps } = useGetZone();
  const [selectedDatetime] = useAtom(selectedDatetimeIndexAtom);

  if (status !== 'success' || !data.zoneStates) {
    return { currentData: undefined, status, ...apiProps };
  }

  const currentData = data.zoneStates?.[selectedDatetime.datetimeString];

  if (!currentData) {
    return { currentData: undefined, status: 'error', ...apiProps };
  }

  return { currentData, status, ...apiProps };
};

export default useSelectedData;
