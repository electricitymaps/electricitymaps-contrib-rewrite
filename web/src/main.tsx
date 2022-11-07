import App from 'App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { registerSW } from 'virtual:pwa-register';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import { REFETCH_INTERVAL_MS } from 'api/helpers';
import enableErrorsInOverlay from 'utils/errorOverlay';

registerSW();

if (import.meta.env.DEV) {
  enableErrorsInOverlay();
}

const MAX_RETRIES = 1;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: MAX_RETRIES,
      refetchInterval: REFETCH_INTERVAL_MS,
    },
  },
});

const container = document.querySelector('#root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools position="top-right" initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
}
