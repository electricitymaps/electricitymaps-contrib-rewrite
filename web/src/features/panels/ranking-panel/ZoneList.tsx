import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridState } from 'types';
import { CountryTag } from '../zone/CountryTag';

interface ZonelistProperties {
  data: ZoneRow[];
}

export interface ZoneRow {
  zoneId: keyof GridState;
  ranking?: number;
  color?: string;
  co2intensity?: number;
  countryName?: string;
  zoneName?: string;
}

function ZoneRow({ zoneId, color, ranking, countryName, zoneName }: ZoneRow) {
  const navigate = useNavigate();

  const onRowClick = () => {
    navigate(`/zone/${zoneId}`);
  };
  return (
    <button
      className="my-1 flex h-9 w-full items-center rounded bg-gray-100  pl-3 text-left hover:bg-gray-200"
      key={ranking}
      onClick={onRowClick}
    >
      <text className=" flex w-4 justify-end pr-2 text-sm">{ranking}</text>
      <div
        className="mr-2 h-4 w-4 min-w-[16px] rounded"
        style={{ backgroundColor: color }}
      ></div>
      <CountryTag zoneId={zoneId} />
      <div className="over flex flex-col justify-center overflow-hidden pl-2 ">
        <text className="truncate text-sm leading-none">{countryName}</text>
        <text
          className={`${countryName ? 'text-xs text-gray-400' : 'truncate text-sm '}`}
        >
          {zoneName}
        </text>
      </div>
    </button>
  );
}

export default function Zonelist(properties: ZonelistProperties): ReactElement {
  return (
    <div>
      {properties.data.map((rowProps, index) => {
        return <ZoneRow key={index} ranking={index + 1} {...rowProps} />;
      })}
    </div>
  );
}
