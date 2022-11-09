import { CountryTag } from './CountryTag';
import ZoneHeaderTitle from './ZoneHeaderTitle';

interface ZoneHeaderProps {
  zoneId: string;
}

export function ZoneHeader(props: ZoneHeaderProps) {
  const { zoneId } = props;

  return (
    <div className="grid w-full gap-20">
      <ZoneHeaderTitle
        title="West Denmark"
        formattedDate="November 9, 2022 at 8:00"
        goBackPath="/"
        labels={[
          <div key="estimated" className="w-18 rounded-full bg-yellow-400 px-2 text-center text-xs">
            Estimated
          </div>,
        ]}
        countryTag={<CountryTag zoneId={zoneId} />}
      />
      <ZoneHeaderTitle
        title="Western Area Power Administration Rocky Mountain Region "
        formattedDate="November 9, 2022 at 8:00"
        goBackPath="/"
        labels={[
          <div key="estimated" className="w-18 rounded-full bg-yellow-400 px-2 text-center text-xs">
            Estimated
          </div>,
          <div key="estimated" className="w-20 rounded-full bg-gray-400 px-2 text-center text-xs text-white">
            Aggregated
          </div>,
        ]}
        countryTag={<CountryTag zoneId={zoneId} />}
      />
    </div>
  );
}
