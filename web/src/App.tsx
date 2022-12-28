import { ToastProvider } from '@radix-ui/react-toast';
import { useGetAppVersion } from 'api/getAppVersion';
import LoadingOverlay from 'components/LoadingOverlay';
import { OnboardingModal } from 'components/modals/OnboardingModal';
import Toast from 'components/Toast';
import ErrorComponent from 'features/error-boundary/ErrorBoundary';
import Header from 'features/header/Header';
import MapControls from 'features/map-controls/MapControls';
import InfoModal from 'features/modals/InfoModal';
import { lazy, ReactElement, Suspense } from 'react';
import LegendContainer from 'components/legend/LegendContainer';
import TimeControllerWrapper from 'features/time/TimeControllerWrapper';
import * as Sentry from '@sentry/react';

const isProduction = import.meta.env.PROD;

const MapWrapper = lazy(async () => import('features/map/MapWrapper'));
const LeftPanel = lazy(async () => import('features/panels/LeftPanel'));
const handleReload = () => {
  window.location.reload();
};
export default function App(): ReactElement {
  const currentAppVersion = APP_VERSION;
  const { data, isSuccess } = useGetAppVersion();
  const isNewVersionAvailable =
    data?.version && currentAppVersion && isProduction
      ? data.version !== currentAppVersion
      : false;

  return (
    <Suspense fallback={<div />}>
      <main className="fixed flex h-screen w-screen flex-col">
        <ToastProvider duration={20_000}>
          <Header />
          <div className="relative flex flex-auto items-stretch">
            <Sentry.ErrorBoundary fallback={<ErrorComponent />} showDialog>
              {isSuccess && isNewVersionAvailable && (
                <Toast
                  title="A new app version is available"
                  toastAction={handleReload}
                  isCloseable={true}
                  toastActionText="Reload"
                />
              )}
              <LoadingOverlay />
              <OnboardingModal />
              <InfoModal />
              <LeftPanel />
              <MapWrapper />
              <TimeControllerWrapper />
              <MapControls />
              <LegendContainer />
            </Sentry.ErrorBoundary>
          </div>
        </ToastProvider>
      </main>
    </Suspense>
  );
}
