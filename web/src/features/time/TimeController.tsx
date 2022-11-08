import TimeAverageToggle from 'components/TimeAverageToggle';
import TimeSlider from 'components/TimeSlider';
import cx from 'classnames';

export default function TimeController() {
  return (
    <div
      className={cx(
        'absolute bottom-0 left-0 right-0 rounded-t-xl bg-white px-2 py-5 shadow-md',
        'sm:inset-x-3 sm:bottom-3 sm:max-w-md sm:rounded-xl sm:px-5 sm:py-5'
      )}
    >
      <div className="mb-2 flex flex-row items-center justify-between">
        <p className="mb-2 text-md font-bold">Display data from the past</p>
        <div className="mb-2 rounded-full bg-gray-100 py-2 px-3 text-xs">
          November 4, 2022 at 10:00 PM
        </div>
      </div>
      <TimeAverageToggle className="mb-2" />
      <TimeSlider />
    </div>
  );
}
