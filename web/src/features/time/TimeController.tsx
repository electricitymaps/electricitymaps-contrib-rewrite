import useGetState from 'api/getState';
import TimeAverageToggle from 'components/TimeAverageToggle';
import TimeSlider from 'components/TimeSlider';
import { useAtom } from 'jotai';
import { selectedDatetimeIndexAtom, timeAverageAtom } from 'utils/state';

export default function TimeController() {
  const [timeaverage] = useAtom(timeAverageAtom);
  const [selectedDatetimeIndex, setSelectedDatetimeIndex] = useAtom(
    selectedDatetimeIndexAtom
  );
  const { data, isLoading } = useGetState(timeaverage);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div
      className={
        'absolute bottom-20 left-3 right-3 rounded-xl bg-white p-5 shadow-md sm:max-w-md'
      }
    >
      <div className="flex flex-row items-center justify-between">
        <p className="mb-2 text-sm font-bold">Display data from the past</p>
        <div className="mb-2 rounded-full bg-gray-100 py-2 px-3 text-xs">
          {selectedDatetimeIndex}
        </div>
      </div>
      <TimeAverageToggle className="mb-2" />
      <TimeSlider datetimes={data.data.datetimes} />
    </div>
  );
}
