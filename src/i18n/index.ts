import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enUsTranslations from './locales/en-us.json';
import itItTranslations from './locales/it-it.json';

const resources = {
    'en-US': {
        translation: enUsTranslations
    },
    'it-IT': {
        translation: itItTranslations
    }
};

const i18nConfig = {
    resources,
    fallbackLng: 'it-IT',
};

const translate = i18n;
translate.use(LanguageDetector).use(initReactI18next).init(i18nConfig);

const language = localStorage.getItem('language-bucket-list');

if (language) {
    translate.changeLanguage(language);
}
export const AVAILABLE_LANGUAGES = {
    'en-US': 'English',
    'it-IT': 'Italiano'
};
export const changeLanguage = (value: keyof typeof AVAILABLE_LANGUAGES) => {
    translate.changeLanguage(value);
    localStorage.setItem('language-bucket-list', value);
};
export default translate;