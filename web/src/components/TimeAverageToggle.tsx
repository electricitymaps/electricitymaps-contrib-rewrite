import { TimeAverages } from 'utils/constants';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { timeAverageAtom } from 'utils/state';
import { useAtom } from 'jotai';
import { useTransition, animated, config, useSpring } from 'react-spring';
import { useEffect, useState } from 'react';

interface ToggleItem {
  value: TimeAverages;
  label: string;
  text: string;
}

const settings: ToggleItem[] = [
  {
    value: TimeAverages.HOURLY,
    label: 'hourly',
    text: '24 hours',
  },
  {
    value: TimeAverages.DAILY,
    label: 'daily',
    text: '30 days',
  },
  {
    value: TimeAverages.MONTHLY,
    label: 'monthly',
    text: '12 months',
  },
  {
    value: TimeAverages.YEARLY,
    label: 'yearly',
    text: '5 years',
  },
];

function TimeAverageToggle({ className }: { className?: string }) {
  const [timeAverage, setTimeAverage] = useAtom(timeAverageAtom);
  const [label, setLabel] = useState('24 hours');

  const onToggleGroupClick = (newTimeAvg: TimeAverages) => {
    setTimeAverage(newTimeAvg);
    setLabel(settings.find((s) => s.value === newTimeAvg)?.text ?? '24 hours');
  };

  const transitions = useTransition(timeAverage, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
    config: config.stiff,
  });

  const [props, set, stop] = useSpring(() => ({
    opacity: 1,
    transform: 'translateX(50px)',
    from: {
      transform: 'translateX(0px)',
    },
  }));

  return (
    <>
      <ToggleItem value={TimeAverages.HOURLY} text={label} />
      <ToggleGroupPrimitive.Root
        className={className}
        type="multiple"
        aria-label="Font settings"
      >
        {settings.map(({ value, label, text }) => (
          <ToggleGroupPrimitive.Item
            key={`group-item-${value}-${label}`}
            value={value}
            aria-label={label}
            onClick={() => onToggleGroupClick(value)}
          >
            <div className={`mr-2 rounded-full bg-gray-100 px-5 py-2 text-sm`}>
              <p className="w-15 h-6 text-gray-700 dark:text-gray-100">
                {text}
              </p>
            </div>
          </ToggleGroupPrimitive.Item>
        ))}
      </ToggleGroupPrimitive.Root>
    </>
  );
}

function ToggleItem({ value, text }: { value: TimeAverages; text: string }) {
  const [timeAverage, setTimeAverage] = useAtom(timeAverageAtom);

  const getTransform = (value: TimeAverages) => {
    if (value !== TimeAverages.HOURLY) {
      return 'translateX(0px)';
    }

    switch (timeAverage) {
      case TimeAverages.HOURLY:
        return 'translateX(0px)';
      case TimeAverages.DAILY:
        return 'translateX(105px)';
      case TimeAverages.MONTHLY:
        return 'translateX(203px)';
      case TimeAverages.YEARLY:
        return 'translateX(320px)';
    }
  };

  const props = useSpring({
    transform: getTransform(value),
  });

  return (
    <animated.div
      style={{ transform: props.transform }}
      className={`absolute z-10 mr-2 flex rounded-full bg-white px-2 py-2 text-center text-sm font-bold text-green-700 shadow-md`}
    >
      <AnimatedClock />
      <animated.p className="w-15 h-6 text-gray-700 dark:text-gray-100">
        {text}
      </animated.p>
    </animated.div>
  );
}

function AnimatedClock() {
  const [timeAverage] = useAtom(timeAverageAtom);
  const [rotation, setRotation] = useState(0);

  const props = useSpring({
    delay: 300,
    config: config.stiff,
    transform: `rotate(${rotation}deg)`,
  });

  const getRotation = (value: TimeAverages) => {
    switch (value) {
      case TimeAverages.HOURLY:
        return 0;
      case TimeAverages.DAILY:
        return 180;
      case TimeAverages.MONTHLY:
        return 360;
      case TimeAverages.YEARLY:
        return 360 + 180;
    }
  };

  useEffect(() => {
    setRotation(getRotation(timeAverage));
  }, [timeAverage]);

  return (
    <animated.span
      style={{ color: '#335a3d', marginRight: 3, fontSize: '22px', ...props }}
      class="material-symbols-outlined"
    >
      schedule
    </animated.span>
  );
}

export default TimeAverageToggle;
