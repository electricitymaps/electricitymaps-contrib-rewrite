import { ToastProvider } from '@radix-ui/react-toast';
import { useGetAppVersion } from 'api/getAppVersion';
import LoadingOverlay from 'components/LoadingOverlay';
import { OnboardingModal } from 'components/modals/OnboardingModal';
import Toast from 'components/Toast';
import ErrorComponent from 'features/error-boundary/ErrorBoundary';
import Header from 'features/header/Header';
import MapControls from 'features/map-controls/MapControls';
import { lazy, ReactElement, Suspense } from 'react';
import LegendContainer from 'components/legend/LegendContainer';
import TimeControllerWrapper from 'features/time/TimeControllerWrapper';
import { ErrorBoundary, init } from '@sentry/react';

const isProduction = import.meta.env.PROD;
if (isProduction) {
  init({
    dsn: 'https://c6e9e4041eb74d22803b3f2bfb0c794d@o192958.ingest.sentry.io/1829181', //Electricitymap-app sentry project
    tracesSampleRate: 1, //This will send 100% of errors to Sentry
  });
}

const Map = lazy(async () => import('features/map/Map'));
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
    <Suspense fallback={<ErrorComponent />}>
      <main className="fixed flex h-screen w-screen flex-col">
        <ToastProvider duration={20_000}>
          <Header />
          <div className="relative flex flex-auto items-stretch">
            <ErrorBoundary fallback={<ErrorComponent />}>
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
              <LeftPanel />
              <Map />
              <TimeControllerWrapper />
              <MapControls />
              <LegendContainer />
            </ErrorBoundary>
          </div>
        </ToastProvider>
      </main>
    </Suspense>
  );
}
