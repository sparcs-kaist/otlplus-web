import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';

import Scroller from '../../../Scroller';

import { setMultipleFocus, clearMultipleFocus } from '@/redux/actions/timetable/lectureFocus';
import { getOverallLectures, isSingleFocused } from '@/utils/lectureUtils';
import { getTimeStr } from '@/utils/examtimeUtils';
import { getDayStr } from '@/utils/timeUtils';

import { LectureFocusFrom } from '@/shapes/enum';
import { useTranslatedString } from '@/hooks/useTranslatedString';
import Lecture from '@/shapes/model/subject/Lecture';
import Examtime from '@/shapes/model/subject/Examtime';
import { RootState } from '@/redux';
import { Day } from '@/shapes/enum';

const ExamSubSection: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const translate = useTranslatedString();

  const lectureFocus = useSelector((state: RootState) => state.timetable.lectureFocus);
  const selectedTimetable = useSelector(
    (state: RootState) => state.timetable.timetable.selectedTimetable,
  );

  const [multipleFocusDayIndex, setMultipleFocusDayIndex] = useState<number | null>(null);

  const _getOverallLecEtPairs = () => {
    return getOverallLectures(selectedTimetable, lectureFocus)
      .map((l) =>
        l.examtimes.map((et) => ({
          lecture: l,
          examtime: et,
        })),
      )
      .flat(1);
  };

  const _getLecEtPairsOnDay = (dayIndex: number) =>
    _getOverallLecEtPairs().filter((p) => p.examtime.day === dayIndex);

  const setFocusOnExam = (dayIndex: number) => {
    if (lectureFocus.from !== LectureFocusFrom.NONE || !selectedTimetable) {
      return;
    }

    const lecEtPairsOnDay = _getLecEtPairsOnDay(dayIndex);
    const details = lecEtPairsOnDay.map((p) => ({
      lecture: p.lecture,
      name: translate(p.lecture, 'title'),
      info: getTimeStr(p.examtime),
    }));
    dispatch(setMultipleFocus(t('ui.others.examOfDay', { day: getDayStr(dayIndex) }), details));
    setMultipleFocusDayIndex(dayIndex);
  };

  const clearFocus = () => {
    if (lectureFocus?.from !== LectureFocusFrom.MULTIPLE) {
      return;
    }

    dispatch(clearMultipleFocus());
    setMultipleFocusDayIndex(null);
  };

  const mapPairToElem = (lecEtPair: { lecture: Lecture; examtime: Examtime }) => {
    const isFocused =
      isSingleFocused(lecEtPair.lecture, lectureFocus) ||
      multipleFocusDayIndex === lecEtPair.examtime.day;
    return (
      <li className={classNames(isFocused ? 'focused' : null)} key={lecEtPair.lecture.id}>
        <div>{translate(lecEtPair.lecture, 'title')}</div>
        <div>{getTimeStr(lecEtPair.examtime)}</div>
      </li>
    );
  };

  return (
    <div className={classNames('subsection--exam', 'mobile-hidden')}>
      <div className={classNames('subsection--exam__title')}>
        <span>{t('ui.title.exams')}</span>
      </div>
      <div className={classNames('subsection--exam__content')}>
        <Scroller>
          {[Day.MON, Day.TUE, Day.WED, Day.THU, Day.FRI].map((dayIndex) => (
            <div
              key={dayIndex}
              className={classNames('subsection--exam__content__day')}
              onMouseOver={() => setFocusOnExam(dayIndex)}
              onMouseOut={() => clearFocus()}>
              <div className={classNames(t('jsx.className.fixedByLang'))}>
                {t(
                  `ui.day.${
                    [
                      'mondayShort',
                      'tuesdayShort',
                      'wednesdayShort',
                      'thursdayShort',
                      'fridayShort',
                    ][dayIndex]
                  }`,
                )}
              </div>
              <ul>{_getLecEtPairsOnDay(dayIndex).map((p) => mapPairToElem(p))}</ul>
            </div>
          ))}
        </Scroller>
      </div>
    </div>
  );
};

export default ExamSubSection;
