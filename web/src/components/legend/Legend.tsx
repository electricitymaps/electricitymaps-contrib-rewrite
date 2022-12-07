import type { ReactElement } from 'react';
import Co2Legend from './Co2Legend';

export default function Legend(): ReactElement {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Co2Legend />
    </div>
  );
}
