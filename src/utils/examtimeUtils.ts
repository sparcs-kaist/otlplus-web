import { useTranslatedString } from '@/hooks/useTranslatedString';
import Examtime from '@/shapes/model/subject/Examtime';

const translate = useTranslatedString();

export const getStr = (examtime: Examtime) => translate(examtime, 'str');

export const getTimeStr = (examtime: Examtime) => {
  const fullStr = getStr(examtime);
  return fullStr?.slice(fullStr.indexOf(' '));
};
