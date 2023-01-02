import { ReactElement, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { languageNames } from 'translation/locales';
import { useTranslation } from 'translation/translation';

interface LanguageSelectorProperties {
  setLanguageSelectorOpen: (isOpen: boolean) => void;
  className?: string;
}

type LanguageNamesKey = keyof typeof languageNames;

export default function LanguageSelector({
  setLanguageSelectorOpen,
  className,
}: LanguageSelectorProperties): ReactElement {
  const { __, i18n } = useTranslation();
  const languageKeys = Object.keys(languageNames) as Array<LanguageNamesKey>;
  const currentLanguageKey = i18n.language as LanguageNamesKey;
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageNames[currentLanguageKey] ?? 'English'
  );

  const handleLanguageSelect = (languageKey: LanguageNamesKey) => {
    i18n.changeLanguage(languageKey);
    setSelectedLanguage(languageKey);
    setLanguageSelectorOpen(false);
  };
  const languageOptions = languageKeys.map((key) => {
    return (
      <button
        key={key}
        onKeyDown={() => handleLanguageSelect(key)}
        onClick={() => handleLanguageSelect(key)}
        className={`w-full cursor-pointer px-2 py-1 text-start text-sm ${
          languageNames[key] === selectedLanguage && 'bg-gray-200   dark:bg-gray-500'
        }`}
      >
        {languageNames[key]}
      </button>
    );
  });
  return (
    <div
      className={twMerge(
        'pointer-events-auto absolute top-[160px] right-10 h-[256px] w-[140px] overflow-auto rounded bg-white py-1 dark:bg-gray-900 dark:[color-scheme:dark]',
        className
      )}
    >
      {languageOptions}
    </div>
  );
}
