import { useTranslation } from 'react-i18next';

/**
 * Custom hook that returns a function for translating strings based on the current language.
 *
 * @returns {function} A function that takes an object and a key and returns the translated string.
 * @example const translate = useTranslatedString();
 *          const translatedString = translate(review.lecture, 'title');
 */
export const useTranslatedString = () => {
  const { i18n } = useTranslation();

  return <T,>(obj: T, key: keyof T extends string ? keyof T : never) => {
    const translatedValue = obj[(i18n.language.startsWith('ko') ? key : `${key}_en`) as keyof T];

    return typeof translatedValue === 'string' ? translatedValue : null;
  };
};
