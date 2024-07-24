import i18n from 'i18next';
import GeneralTrack from '@/shapes/model/graduation/GeneralTrack';
import MajorTrack from '@/shapes/model/graduation/MajorTrack';
import { useTranslatedString } from '@/hooks/useTranslatedString';
import AdditionalTrack from '@/shapes/model/graduation/AdditionalTrack';
import { AdditionalTrackType } from '@/shapes/enum';

export const getYearName = (year: number) => {
  if (year <= 2000 || year >= 2100) {
    return '';
  }
  return year.toString();
};

export const getGeneralTrackName = (track: GeneralTrack, short = false) => {
  const name = i18n.t('ui.track.general');
  const year = `${getYearName(track.start_year)}~${getYearName(track.end_year)}`;
  return `${name} (${year})`;
};

export const getMajorTrackName = (track: MajorTrack, short = false) => {
  const translate = useTranslatedString();
  const name = translate(track.department, 'name');

  const year = `${getYearName(track.start_year)}~${getYearName(track.end_year)}`;
  return `${name} (${year})`;
};

export const getAdditionalTrackName = (track: AdditionalTrack, short = false) => {
  const translate = useTranslatedString();
  const translatedName = translate(track.department, 'name');

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
  const name = track.type !== AdditionalTrackType.INTERDISCIPLINARY ? translatedName : '';
  const year = `${getYearName(track.start_year)}~${getYearName(track.end_year)}`;
  if (track.type === AdditionalTrackType.INTERDISCIPLINARY) {
    return `${type} (${year})`;
  }
  if (short) {
    return `${name} (${year})`;
  }
  return `${type} - ${name} (${year})`;
};
