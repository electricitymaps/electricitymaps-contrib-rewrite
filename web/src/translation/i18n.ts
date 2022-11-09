import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// Import { isProduction } from './environment';
import { useNavigate, Route } from 'react-router-dom';

// eslint-disable-next-line no-constant-condition fix
const LOCALES_PATH = 'window.isCordova' ? 'locales' : '/locales'; // TODO test on mobile

const LOCALE_TO_FACEBOOK_LOCALE = {
  ar: 'ar_AR',
  cs: 'cs_CZ',
  da: 'da_DK',
  de: 'de_DE',
  el: 'el_GR',
  en: 'en_US',
  es: 'es_ES',
  et: 'et_EE',
  fi: 'fi_FI',
  fr: 'fr_FR',
  hr: 'hr_HR',
  id: 'id_ID',
  it: 'it_IT',
  ja: 'ja_JP',
  ko: 'ko_KR',
  nl: 'nl_NL',
  no: 'no_NB',
  'no-NB': 'no_NB',
  pl: 'pl_PL',
  'pt-BR': 'pt_BR',
  ro: 'ro_RO',
  ru: 'ru_RU',
  sk: 'sk_SK',
  sv: 'sv_SE',
  vn: 'vi_VN',
  'zh-cn': 'zh_CN',
  'zh-hk': 'zh_HK',
  'zh-tw': 'zh_TW',
};

// This function is copied and slightly adjusted from https://github.com/i18next/i18next-http-backend/blob/master/lib/request.js
// The changes are done in order to make it work cross-platform
// See source for these changes: https://github.com/i18next/i18next-http-backend/issues/23#issuecomment-718929822
function requestWithXmlHttpRequest(
  options: { crossDomain: any; withCredentials: any; customHeaders: any },
  url: string | URL,
  payload: Document | XMLHttpRequestBodyInit | null | undefined,
  callback: (argument0: string | null, argument1: { status: number; data: string }) => any
) {
  try {
    const x = new XMLHttpRequest();
    x.open('GET', url, 1);
    if (!options.crossDomain) {
      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    x.withCredentials = Boolean(options.withCredentials);
    if (payload) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    if (x.overrideMimeType) {
      x.overrideMimeType('application/json');
    }
    let h = options.customHeaders;
    h = typeof h === 'function' ? h() : h;
    if (h) {
      // eslint-disable-next-line no-restricted-syntax
      for (const index in h) {
        x.setRequestHeader(index, h[index]);
      }
    }
    x.addEventListener('readystatechange', () => {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      x.readyState > 3 &&
        callback(x.status >= 400 ? x.statusText : null, {
          status: x.status || 200,
          data: x.responseText,
        }); // In android webview loading a file is status status 0
    });
    x.send(payload);
  } catch (error) {
    console && console.error(error);
  }
}

// Init localisation package and ensure it uses relevant plugins
// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true, //IsProduction() ? false : true,
    backend: {
      loadPath: `${LOCALES_PATH}/{{lng}}.json`,
      crossDomain: true,
      request: requestWithXmlHttpRequest,
    },
    detection: {
      order: ['querystring', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },
  });

i18n.on('languageChanged', function (lng) {
  document.documentElement.setAttribute('lang', lng);
  // TODO: Use react-helmet to manage meta tags
  document.title = `Electricity Maps | ${i18n.t('misc.maintitle')}`;
  // Optional chaining added to ensure jsdom works
  document
    .querySelector('meta[property="og:locale"]')
    ?.setAttribute('content', LOCALE_TO_FACEBOOK_LOCALE[lng]);
});

export { default } from 'i18next';
