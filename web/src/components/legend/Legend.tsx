import type { ReactElement } from 'react';
import Co2Legend from './Co2Legend';

interface LegendProperties {}

export default function Legend(properties: LegendProperties): ReactElement {
  return (
    <div className="fixed bottom-4 right-3 z-50 ">
      <Co2Legend />
    </div>
  );
}
