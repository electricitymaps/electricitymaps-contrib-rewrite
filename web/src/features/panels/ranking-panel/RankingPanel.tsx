import useGetState from 'api/getState';
import { useCo2ColorScale } from 'hooks/theme';
import { ReactElement, useMemo } from 'react';
import { TimeAverages } from 'utils/constants';
import { useTranslation } from '../../../translation/translation';
import { getRankedState } from './getRankingPanelData';
import SearchBar from './SearchBar';
import ZoneList from './ZoneList';

interface RankingPanelProperties {}

const documentSearchKeyUpHandler = (key: any, searchReference: any) => {
  if (key === '/') {
    // Reset input and focus
    if (searchReference.current) {
      searchReference.current.value = '';
      searchReference.current.focus();
    }
  } else if (
    key &&
    /^[A-z]$/.test(key) && // If input is not focused, focus it and append the pressed key
    searchReference.current &&
    searchReference.current !== document.activeElement
  ) {
    searchReference.current.value += key;
    searchReference.current.focus();
  }
};
// I18n.changeLanguage('en', () => {
//   //TODO remove when done testing language change
//   Console.log('language set');
// });

export default function RankingPanel(properties: RankingPanelProperties): ReactElement {
  console.log('renders three times when translating');
  const { __ } = useTranslation();
  const getCo2colorScale = useCo2ColorScale();
  const { isLoading, isSuccess, isError, error, data } = useGetState(TimeAverages.HOURLY);
  const rankedList = useMemo(() => getRankedState(data, getCo2colorScale, 'asc'), [data]);

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
        className="zone-search-bar"
        placeholder={__('left-panel.search')}
        documentKeyUpHandler={documentSearchKeyUpHandler}
        searchHandler={(input: Event) => {
          console.log('search', input);
        }}
      />
      {/* {!isLoading && <ZoneList zoneData={data} />} */}
      {/* <InfoText /> TODO */}
    </div>
  );
}
