import type { ReactElement } from 'react';
import { MapGrid } from 'types';

interface ZonelistProperties {
  zoneData: MapGrid | undefined;
}

function ZoneRow({
  zoneName,
  countryName,
  co2,
}: {
  zoneName: string;
  countryName: string;
  co2: number;
}) {
  return (
    <div className="bg-gray-200">
      <text>{zoneName}</text>
    </div>
  );
}

export default function Zonelist(properties: ZonelistProperties): ReactElement {
  return <ZoneRow zoneName="ASD" countryName="Sad" co2={5} />;
}
