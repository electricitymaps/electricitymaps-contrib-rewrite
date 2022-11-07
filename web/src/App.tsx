import ErrorBoundary from 'features/error-boundary/ErrorBoundary';
import Header from 'features/header/Header';
import TimeController from 'features/time/TimeController';
import type { ReactElement } from 'react';
import { lazy, Suspense } from 'react';

const Map = lazy(async () => import('features/map/Map'));
const LeftPanel = lazy(async () => import('features/panels/LeftPanel'));

export default function App(): ReactElement {
  return (
    <Suspense fallback={<div />}>
      <div className="h-full">
        <Header />
        <div className="flex h-screen">
          <ErrorBoundary>
            <LeftPanel />
            <Map />
            <TimeController />
          </ErrorBoundary>
        </div>
      </div>
    </Suspense>
  );
}
