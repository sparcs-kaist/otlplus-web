import i18n from 'i18next';
import GeneralTrack from '@/shapes/model/graduation/GeneralTrack';
import MajorTrack from '@/shapes/model/graduation/MajorTrack';
import AdditionalTrack from '@/shapes/model/graduation/AdditionalTrack';
import { AdditionalTrackType } from '@/shapes/enum';
import { getTranslatedString } from './translationUtils';
/**
 * 플래너 설정 모달, 플래너의 오른쪽 상단 섹션에서 사용되는 util 함수들입니다.
 * 전공 - 전산학부(2017~2021)
 */
export const getYearName = (year: number) => {
  if (year <= 2000 || year >= 2100) {
    return '';
  }
  return year.toString();
};

export const getGeneralTrackName = (track: GeneralTrack) => {
  const name = i18n.t('ui.track.general');
  const year = `${getYearName(track.start_year)}~${getYearName(track.end_year)}`;
  return `${name} (${year})`;
};

export const getMajorTrackName = (track: MajorTrack) => {
  const name = getTranslatedString(track.department, 'name');
  const year = `${getYearName(track?.start_year)}~${getYearName(track?.end_year)}`;
  return `${name} (${year})`;
};

export const getAdditionalTrackName = (track: AdditionalTrack, short = false) => {
  const type =
    track.type === AdditionalTrackType.DOUBLE
      ? i18n.t('ui.track.doubleMajor')
      : track.type === AdditionalTrackType.MINOR
      ? i18n.t('ui.track.minor')
      : track.type === AdditionalTrackType.ADVANCED
      ? i18n.t('ui.track.advancedMajor')
      : track.type === AdditionalTrackType.INTERDISCIPLINARY
      ? i18n.t('ui.track.interdisciplinaryMajor')
      : '기타';
  const name =
    track.type !== AdditionalTrackType.INTERDISCIPLINARY
      ? getTranslatedString(track.department, 'name')
      : '';
  const year = `${getYearName(track.start_year)}~${getYearName(track.end_year)}`;
  if (track.type === AdditionalTrackType.INTERDISCIPLINARY) {
    return `${type} (${year})`;
  }
  if (short) {
    return `${name} (${year})`;
  }
  return `${type} - ${name} (${year})`;
};
