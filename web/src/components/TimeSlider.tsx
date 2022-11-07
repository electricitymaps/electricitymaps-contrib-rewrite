import * as SliderPrimitive from '@radix-ui/react-slider';
import cx from 'classnames';

function TimeSlider() {
  return (
    <SliderPrimitive.Root
      defaultValue={[0]}
      max={25}
      step={1}
      aria-label="value"
      className="relative mb-2 flex h-5 w-full touch-none items-center"
    >
      <SliderPrimitive.Track className="relative h-2.5 w-full grow rounded-sm bg-gray-200 dark:bg-gray-800">
        <SliderPrimitive.Range />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cx(
          'block h-6 w-6 rounded-full bg-white shadow-xl dark:bg-white',
          'focus:outline-none focus-visible:ring focus-visible:ring-gray-300 focus-visible:ring-opacity-75'
        )}
        // TODO: icon can be added as child of thumb here
      />
    </SliderPrimitive.Root>
  );
}

export default TimeSlider;
