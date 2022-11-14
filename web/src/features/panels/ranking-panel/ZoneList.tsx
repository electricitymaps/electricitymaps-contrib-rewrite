import type { ReactElement } from 'react';
import { GridState } from 'types';

interface ZonelistProperties {
  data: ZoneRow[];
}

export interface ZoneRow {
  zoneId: keyof GridState;
  color?: string;
  co2intensity?: number;
}

function ZoneRow({ co2intensity, zoneId, color }: ZoneRow) {
  return (
    <div key={zoneId} style={{ backgroundColor: color }}>
      <text>
        {zoneId} - {co2intensity}
      </text>
    </div>
  );
}

export default function Zonelist(properties: ZonelistProperties): ReactElement {
  return (
    <div>
      {properties.data.map((d) => (
        <ZoneRow key={d.zoneId} {...d} />
      ))}
    </div>
  );
}
