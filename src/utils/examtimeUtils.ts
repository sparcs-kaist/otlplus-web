import Examtime from '@/shapes/model/subject/Examtime';
import { getTranslatedString } from '@/utils/translationUtils';

export const getStr = (examtime: Examtime) => getTranslatedString(examtime, 'str');

export const getTimeStr = (examtime: Examtime) => {
  const fullStr = getStr(examtime);
  return fullStr?.slice(fullStr.indexOf(' '));
};
