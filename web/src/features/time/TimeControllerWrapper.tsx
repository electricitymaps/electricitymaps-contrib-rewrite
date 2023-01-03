import { loadingMapAtom } from 'features/map/mapAtoms';
import { useAtom } from 'jotai';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { hasOnboardingBeenSeenAtom } from 'utils/state/atoms';
import { useBreakpoint } from 'utils/styling';
import TimeController from './TimeController';
import TimeHeader from './TimeHeader';

const SNAP_POINTS = [60, 160];

function BottomSheetWrappedTimeController() {
  const [isLoadingMap] = useAtom(loadingMapAtom);
  const [hasOnboardingBeenSeen] = useAtom(hasOnboardingBeenSeenAtom);

  return (
    <BottomSheet
      scrollLocking={false} // Ensures scrolling is not blocked on IOS
      open={!isLoadingMap}
      snapPoints={() => (hasOnboardingBeenSeen ? SNAP_POINTS : [0])}
      blocking={false}
      header={<TimeHeader />}
    >
      <TimeController className="p-2 px-4 pt-1" />
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
  const isBiggerThanMobile = useBreakpoint('sm');
  return isBiggerThanMobile ? (
    <FloatingTimeController />
  ) : (
    <BottomSheetWrappedTimeController />
  );
}
