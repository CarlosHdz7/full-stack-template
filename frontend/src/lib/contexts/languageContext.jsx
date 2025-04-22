import { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import locales from '@locales/locales.json';

// Create context
const I18nContext = createContext();

// Available languages
export const languages = {
  en: { nativeName: 'English' },
  es: { nativeName: 'Español' },
  // Add more languages as needed
};

// Resources object with all translations
const resources = {
  en: { translation: locales.en },
  es: { translation: locales.es },
};

// Get stored language from localStorage before initializing
const getStoredLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18nextLng');
  }
  return null;
};

const storedLanguage = getStoredLanguage();

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources,
    lng: storedLanguage, // Set initial language from localStorage if available
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export const LanguageProvider = ({ children }) => {
  const { t, i18n: i18nInstance } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18nInstance.language);

  // Update currentLanguage state when language changes
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLanguage(lng);
      // Save the language preference to localStorage
      localStorage.setItem('i18nextLng', lng);

      // For RTL language support (if needed)
      document.documentElement.dir = ['ar', 'he'].includes(lng) ? 'rtl' : 'ltr';
    };

    // Set the initial language correctly
    setCurrentLanguage(i18nInstance.language);

    i18nInstance.on('languageChanged', handleLanguageChanged);

    return () => {
      i18nInstance.off('languageChanged', handleLanguageChanged);
    };
  }, [i18nInstance]);

  // Change language function
  const setLanguage = (lng) => {
    if (currentLanguage !== lng) {
      i18nInstance.changeLanguage(lng);
    }
  };

  // Value object to be provided by the context
  const value = {
    t,
    i18n: i18nInstance,
    currentLanguage,
    setLanguage,
    languages,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// Custom hook to use the i18n context
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export default I18nContext;
