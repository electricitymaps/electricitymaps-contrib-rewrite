import type { ReactElement } from 'react';

interface Co2LegendProperties {}

export default function Co2Legend(properties: Co2LegendProperties): ReactElement {
  return (
    <div className=" h-[86px] w-[224px] rounded bg-white p-2 shadow">
      CO2 Legend Content
    </div>
  );
}
