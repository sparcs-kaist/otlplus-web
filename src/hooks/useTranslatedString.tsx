import { useTranslation } from 'react-i18next';

export const useTranslatedString = () => {
  const { i18n } = useTranslation();

  return <T,>(obj: T, key: keyof T extends string ? keyof T : never) => {
    const translatedValue = obj[(i18n.language.startsWith('ko') ? key : `${key}_en`) as keyof T];

    return typeof translatedValue === 'string' ? translatedValue : null;
  };
};
