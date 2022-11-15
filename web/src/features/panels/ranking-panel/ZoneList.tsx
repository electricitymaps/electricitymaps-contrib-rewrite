import type { ReactElement } from 'react';
import { GridState } from 'types';
import { CountryTag } from '../zone/CountryTag';

interface ZonelistProperties {
  data: ZoneRow[];
}

export interface ZoneRow {
  zoneId: keyof GridState;
  ranking?: number | undefined;
  color?: string;
  co2intensity?: number;
  countryName?: string;
  zoneName?: string;
}

function ZoneRow({ zoneId, color, ranking, countryName, zoneName }: ZoneRow) {
  return (
    <div className="flex h-8  items-center   pl-2" key={ranking}>
      <text className=" flex w-4 justify-end pr-2">{ranking}</text>
      <div
        className="mr-2 h-4 w-4 min-w-[16px] rounded"
        style={{ backgroundColor: color }}
      ></div>
      <CountryTag zoneId={zoneId} />
      <div className="over flex flex-col justify-center overflow-hidden pl-2 ">
        <text className="truncate text-base  leading-none">{countryName}</text>
        <text className="text-xs text-gray-200">{zoneName}</text>
      </div>
    </div>
  );
}

export default function Zonelist(properties: ZonelistProperties): ReactElement {
  return (
    <div>
      {properties.data.map((d, index) => {
        const a = { ...d, ranking: index + 1 };
        return <ZoneRow key={index} {...a} />;
      })}
    </div>
  );
}
