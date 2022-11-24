import { animated, useTransition } from '@react-spring/web';
import useGetState from 'api/getState';
import { useAtom } from 'jotai';
import { TimeAverages } from 'utils/constants';
import { loadingMapAtom } from 'utils/state';

// TODO: Consider splitting up the icon and the overlay into two different components.
// That way we can maybe reuse it in panels for a loading indicator there.
// TODO: Consider loading svg directly or via img tag instead of the background-image
// approach used here.
function FadingOverlay({ isVisible }: { isVisible: boolean }) {
  const transitions = useTransition(isVisible, {
    from: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions(
    (styles, isVisible) =>
      isVisible && (
        <animated.div
          className="fixed z-50 h-full w-full bg-gray-100 bg-[url('/loading-icon.svg')] bg-[length:100px] bg-center bg-no-repeat dark:bg-gray-900 dark:bg-[url('/loading-icon-darkmode.svg')]"
          style={styles}
        />
      )
  );
}

export default function LoadingOverlay() {
  const { isLoading, isError } = useGetState(TimeAverages.HOURLY);
  const [isLoadingMap] = useAtom(loadingMapAtom);

  const showLoadingOverlay = !isError && (isLoading || isLoadingMap);

  return <FadingOverlay isVisible={showLoadingOverlay} />;
}
