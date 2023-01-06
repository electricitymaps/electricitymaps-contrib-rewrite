import { useAtom } from 'jotai';
import { useTranslation } from 'translation/translation';
import { formatTimeRange } from 'utils/formatting';
import { timeAverageAtom } from 'utils/state/atoms';
import { HiOutlineArrowDownTray } from 'react-icons/hi2';

type Props = {
  translationKey: string;
};

export function ChartTitle({ translationKey }: Props) {
  const { __, i18n } = useTranslation();
  const [timeAverage] = useAtom(timeAverageAtom);

  const localExists = i18n.exists(`${translationKey}.${timeAverage}`, {
    fallbackLng: i18n.language,
  });
  const localDefaultExists = i18n.exists(`${translationKey}.default`, {
    fallbackLng: i18n.language,
  });
  /*
  Use local for timeAverage if exists, otherwise use local default if exists. If no translation exists, use english
  */
  return (
    <>
      <h3 className="pt-3 pb-1 text-md">
        {localExists
          ? __(`${translationKey}.${timeAverage}`)
          : __(
              `${translationKey}.default`,
              formatTimeRange(localDefaultExists ? i18n.language : 'en', timeAverage)
            )}
      </h3>
      <div className="message flex flex-row items-center pb-2 text-xs no-underline">
        <HiOutlineArrowDownTray size={12} />
        <a
          href="https://electricitymaps.com/?utm_source=app.electricitymap.org&utm_medium=referral&utm_campaign=country_panel"
          target="_blank"
          rel="noreferrer"
          className="pl-0.5"
        >
          {__('country-history.Getdata')}
        </a>
      </div>
    </>
  );
}
