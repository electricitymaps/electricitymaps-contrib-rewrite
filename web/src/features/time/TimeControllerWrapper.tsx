import { useAtom } from 'jotai';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { loadingMapAtom } from 'utils/state/atoms';
import { useBreakpoint } from 'utils/styling';
import TimeController from './TimeController';
import TimeHeader from './TimeHeader';

// Arbitrary value based on Iphone SE at 375 and Iphone 12 Pro at 390
export const LARGE_DEVICE_VIEWPORT_WIDTH = 390;

function BottomSheetWrappedTimeController() {
  const [isLoadingMap] = useAtom(loadingMapAtom);

  // Provide extra swipe up space for larger IOS devices
  const isLargeDevice = window.screen.width >= LARGE_DEVICE_VIEWPORT_WIDTH;
  const snapPoints = isLargeDevice ? [70, 180] : [60, 160];

  return (
    <BottomSheet
      scrollLocking={false} // Ensures scrolling is not blocked on IOS
      open={!isLoadingMap}
      snapPoints={() => snapPoints}
      blocking={false}
      header={<TimeHeader />}
    >
      <TimeController className="p-2 pt-1 " />
    </BottomSheet>
  );
}

function FloatingTimeController() {
  return (
    <div className="fixed bottom-3 left-3 z-20 w-[calc(14vw_+_16rem)] rounded-xl bg-white p-5 shadow-md dark:bg-gray-900  md:w-[calc((14vw_+_16rem)_-_30px)]">
      <TimeController />
    </div>
  );
}

export default function TimeControllerWrapper() {
  const isMinSM = useBreakpoint('sm');
  return isMinSM ? <FloatingTimeController /> : <BottomSheetWrappedTimeController />;
}
