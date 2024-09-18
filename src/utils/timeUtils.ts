import i18n from 'i18next';
import { Day } from '@/shapes/enum';

export const getDayStr = (day: Day) => {
  const dayNames = [
    i18n.t('ui.day.monday'),
    i18n.t('ui.day.tuesday'),
    i18n.t('ui.day.wednesday'),
    i18n.t('ui.day.thursday'),
    i18n.t('ui.day.friday'),
    i18n.t('ui.day.saturday'),
    i18n.t('ui.day.sunday'),
  ];
  return dayNames[day];
};

export const getTimeStr = (time: number) => {
  const hour = Math.floor(time / 60);
  const minute = time % 60;
  return `${hour}:${String(minute).padStart(2, '0')}`;
};

// TimeTable 에서 시간표를 드래그해서 강의를 검샐할 때 사용됩니다.
// 예를 들어 "월요일 10:00 ~ 12:00" 과 같은 형태로 반환합니다.
export const getRangeStr = (day: Day, begin: number, end: number) => {
  return `${getDayStr(day)} ${getTimeStr(begin)} ~ ${getTimeStr(end)}`;
};
