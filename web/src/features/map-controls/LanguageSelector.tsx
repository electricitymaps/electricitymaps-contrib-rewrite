import { ReactElement, useState } from 'react';
import { useTranslation } from 'translation/translation';
import { languageNames } from '../../../config/locales.json';

interface LanguageSelectorProperties {
  setLanguageSelectorOpen: (isOpen: boolean) => void;
}

type LanguageNamesKey = keyof typeof languageNames;

export default function LanguageSelector(
  properties: LanguageSelectorProperties
): ReactElement {
  const { setLanguageSelectorOpen } = properties;
  const { __, i18n } = useTranslation();
  const languageKeys = Object.keys(languageNames) as Array<LanguageNamesKey>;
  const currentLanguage = i18n.language as LanguageNamesKey;

  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageSelect = (
    languageKey: LanguageNamesKey,
    preferredLanguage: string
  ) => {
    i18n.changeLanguage(languageKey);
    setSelectedLanguage(preferredLanguage);
    setLanguageSelectorOpen(false);
  };
  const languageOptions = languageKeys.map((key) => {
    console.log('ley', currentLanguage, key);
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        key={key}
        onClick={() => handleLanguageSelect(key, languageNames[key])}
        className={`${key === selectedLanguage && 'bg-gray-500'}`}
      >
        {languageNames[key]}
      </div>
    );
  });
  return <div className="bg-white">{languageOptions}</div>;
}
