import clsx from 'clsx';
import ErrorBoundary from 'features/error-boundary/ErrorBoundary';
import Header from 'features/header/Header';
import type { ReactElement } from 'react';
import { lazy, Suspense } from 'react';

const Map = lazy(async () => import('features/map/Map'));
const LeftPanel = lazy(async () => import('features/panels/LeftPanel'));

const mainStyles = clsx('fixed flex h-screen w-screen flex-col');
const innerStyles = clsx('relative flex flex-auto items-stretch');
export default function App(): ReactElement {
  return (
    <Suspense fallback={<div />}>
      <main className={mainStyles}>
        <Header />
        <div className={innerStyles}>
          <ErrorBoundary>
            <LeftPanel />
            <Map />
          </ErrorBoundary>
        </div>
      </main>
    </Suspense>
  );
}
