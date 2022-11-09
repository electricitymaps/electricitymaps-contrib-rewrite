import type { ReactElement } from 'react';
import { useTranslation } from '../../../translation/translation';
import SearchBar from './SearchBar';
import ZoneList from './ZoneList';
import InfoText from './InfoText';
import i18n from 'i18next';

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

  return (
    <div>
      <div>
        <div className="title"> {__('left-panel.zone-list-header-title')}</div>
        <div className="subtitle">{__('left-panel.zone-list-header-subtitle')}</div>
      </div>

      <SearchBar
        className="zone-search-bar"
        placeholder={__('left-panel.search')}
        documentKeyUpHandler={documentSearchKeyUpHandler}
        searchHandler={(input: Event) => {
          console.log('search', input);
        }}
      />

      <ZoneList />

      {/* <InfoText /> TODO */}
    </div>
  );
}
