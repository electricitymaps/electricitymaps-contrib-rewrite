import useGetState from 'api/getState';
import TimeAverageToggle from 'components/TimeAverageToggle';
import TimeSlider from 'components/TimeSlider';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { TimeAverages } from 'utils/constants';
import { dateToDatetimeString } from 'utils/helpers';
import { selectedDatetimeIndexAtom, timeAverageAtom } from 'utils/state/atoms';
import TimeAxis from './TimeAxis';
import TimeHeader from './TimeHeader';

export default function TimeController() {
  const [timeAverage, setTimeAverage] = useAtom(timeAverageAtom);
  const [selectedDatetime, setSelectedDatetime] = useAtom(selectedDatetimeIndexAtom);
  const { data, isLoading } = useGetState();

  // TODO: Figure out whether we want to work with datetimes as strings
  // or as Date objects. In this case datetimes are easier to work with
  const datetimes = useMemo(
    () => (data ? data.data?.datetimes.map((d) => new Date(d)) : undefined),
    [data]
  );

  useEffect(() => {
    if (datetimes) {
      // Reset the selected datetime when data changes
      setSelectedDatetime({
        datetimeString: dateToDatetimeString(datetimes[datetimes.length - 1]),
        index: datetimes.length - 1,
      });
    }
  }, [data]);

  const onTimeSliderChange = (index: number) => {
    // TODO: Does this work properly missing values?
    if (!datetimes) {
      return;
    }
    setSelectedDatetime({
      datetimeString: dateToDatetimeString(datetimes[index]),
      index,
    });
  };

  const onToggleGroupClick = (timeAverage: TimeAverages) => {
    setTimeAverage(timeAverage);
  };

  return (
    <div
      className={
        'bottom-0 z-20 w-full rounded-t-xl bg-white p-5 shadow-md dark:bg-gray-900 sm:fixed sm:bottom-3 sm:left-3 sm:w-[calc(14vw_+_16rem)] sm:rounded-xl md:w-[calc((14vw_+_16rem)_-_30px)]'
      }
    >
      <TimeHeader
        // Hide the header on mobile as it is loaded directly into the BottomSheet header section
        className="hidden sm:flex"
      />
      <TimeAverageToggle
        timeAverage={timeAverage}
        onToggleGroupClick={onToggleGroupClick}
      />
      <TimeSlider
        onChange={onTimeSliderChange}
        numberOfEntries={datetimes ? datetimes.length - 1 : 0}
        selectedIndex={selectedDatetime.index}
      />
      <TimeAxis
        datetimes={datetimes}
        selectedTimeAggregate={timeAverage}
        isLoading={isLoading}
        className="h-[22px] w-full overflow-visible"
        transform={`translate(${12}, 0)`}
        isLiveDisplay={timeAverage === TimeAverages.HOURLY}
      />
    </div>
  );
}
