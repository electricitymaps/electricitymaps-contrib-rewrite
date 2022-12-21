import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { REFETCH_INTERVAL_FIVE_MINUTES } from 'api/helpers';
import App from 'App';
import { useAtomsDevtools } from 'jotai/devtools';
import { createRoot } from 'react-dom/client';
import {
  Routes,
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
import { createConsoleGreeting } from 'utils/createConsoleGreeting';
import enableErrorsInOverlay from 'utils/errorOverlay';
import { registerSW } from 'virtual:pwa-register';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

const isProduction = import.meta.env.PROD;
if (isProduction) {
  Sentry.init({
    dsn: 'https://c6e9e4041eb74d22803b3f2bfb0c794d@o192958.ingest.sentry.io/1829181', //Electricitymap-app sentry project
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
    ],
    tracesSampleRate: 1, //This will send 100% of errors to Sentry
  });
}

// Init CSS
import 'react-spring-bottom-sheet/dist/style.css';
import './index.css';

// Init polyfills
import 'utils/polyfills';
import { StrictMode, useEffect } from 'react';

/**
 * DevTools for Jotai which makes atoms appear in Redux Dev Tools.
 * Only enabled on import.meta.env.DEV
 */
const AtomsDevtools = ({ children }: { children: JSX.Element }) => {
  useAtomsDevtools('demo');
  return children;
};

registerSW();
createConsoleGreeting();

if (import.meta.env.DEV) {
  enableErrorsInOverlay();
}

const MAX_RETRIES = 1;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: MAX_RETRIES,
      refetchInterval: REFETCH_INTERVAL_FIVE_MINUTES,
    },
  },
});

const container = document.querySelector('#root');
const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);
if (container) {
  const root = createRoot(container);
  // StrictMode is disabled due to issue in react-spring-bottom-sheet
  // https://github.com/stipsan/react-spring-bottom-sheet/issues/210
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SentryRoutes>
            <AtomsDevtools>
              <App />
            </AtomsDevtools>
          </SentryRoutes>
        </BrowserRouter>
        <ReactQueryDevtools position="top-right" initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
}
