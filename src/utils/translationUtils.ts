import i18n from 'i18next';

/**
 * useTranslatedString  커스텀 hook 과 동일한 역할을 하는 util 함수입니다.
 * @example const translatedString = getTranslatedString(review.lecture, 'title');
 */
export const getTranslatedString = <T>(obj: T, key: keyof T extends string ? keyof T : never) => {
  const translatedValue = obj[(i18n.language.startsWith('ko') ? key : `${key}_en`) as keyof T];
  return typeof translatedValue === 'string' ? translatedValue : null;
};
