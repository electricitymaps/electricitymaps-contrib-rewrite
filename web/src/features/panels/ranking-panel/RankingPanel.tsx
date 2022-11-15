import useGetState from 'api/getState';
import { useCo2ColorScale } from 'hooks/theme';
import { useAtom } from 'jotai';
import { ReactElement, useState } from 'react';
import { selectedDatetimeIndexAtom, timeAverageAtom } from 'utils/state';
import { getCountryName, useTranslation } from '../../../translation/translation';
import { getRankedState } from './getRankingPanelData';
import SearchBar from './SearchBar';
import ZoneList from './ZoneList';

interface RankingPanelProperties {}

export default function RankingPanel(properties: RankingPanelProperties): ReactElement {
  console.log('renders three times when translating');
  const { __ } = useTranslation();
  const getCo2colorScale = useCo2ColorScale();
  const [timeAverage] = useAtom(timeAverageAtom);
  const [selectedDatetime] = useAtom(selectedDatetimeIndexAtom);
  const [searchTerm, setSearchTerm] = useState('');

  const inputHandler = (inputEvent: any) => {
    //convert input text to lower case
    const lowerCase = inputEvent.target.value.toLowerCase();
    console.log('doin', lowerCase);
    setSearchTerm(lowerCase);
  };

  const { isLoading, isSuccess, isError, error, data } = useGetState(timeAverage);
  const rankedList = getRankedState(data, getCo2colorScale, 'asc', selectedDatetime);
  const filteredList = rankedList.filter((zone) => {
    console.log('zone', zone, getCountryName('NZ-NZC'));
    if (zone.countryName && zone.countryName.toLowerCase().includes(searchTerm))
      return true;
    if (zone.zoneName && zone.zoneName.toLowerCase().includes(searchTerm)) return true;
    return false;
  });
  console.log(searchTerm, filteredList);
  return (
    <div className="p-5">
      <div className="pb-5">
        <div className="title poppins text-lg font-medium">
          {__('left-panel.zone-list-header-title')}
        </div>
        <div className="subtitle inter text-xs">
          {__('left-panel.zone-list-header-subtitle')}
        </div>
      </div>

      <SearchBar
        placeholder={__('left-panel.search')}
        searchHandler={inputHandler}
        value={searchTerm}
      />
      {!isLoading && <ZoneList data={filteredList} />}
      {/* <InfoText /> TODO */}
    </div>
  );
}
