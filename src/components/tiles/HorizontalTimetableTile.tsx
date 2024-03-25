import React from 'react';
import { withTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import { useTranslatedString } from '@/hooks/useTranslatedString';
import Classtime from '@/shapes/model/subject/Classtime';
import Lecture from '@/shapes/model/subject/Lecture';
import { getProfessorsShortStr } from '@/utils/lectureUtils';

interface Props {
  lecture: Lecture;
  classtime?: Classtime;
  beginIndex: number;
  endIndex: number;
  color: number;
  cellWidth: number;
  cellHeight: number;
}

/**
 * 메인페이지의 오늘의 시간표에 보여지는 가로로된 시간표 타일
 */
const HorizontalTimetableTile: React.FC<Props> = ({
  lecture,
  classtime,
  beginIndex,
  endIndex,
  color,
  cellWidth,
  cellHeight,
}) => {
  const translate = useTranslatedString();

  return (
    <div
      className={classNames('tile', 'tile--horizontal-timetable', `background-color--${color}`)}
      style={{
        left: 2 + cellWidth * beginIndex + 2,
        top: 15 + 3,
        width: cellWidth * (endIndex - beginIndex) - 3,
        height: cellHeight - 3 * 2,
      }}>
      <div className={classNames('tile--horizontal-timetable__content')}>
        <p className={classNames('tile--horizontal-timetable__content__title')}>
          {translate(lecture, 'title')}
        </p>
        <p className={classNames('tile--horizontal-timetable__content__info')}>
          {getProfessorsShortStr(lecture)}
        </p>
        <p className={classNames('tile--horizontal-timetable__content__info')}>
          {classtime && translate(classtime, 'classroom')}
        </p>
      </div>
    </div>
  );
};

export default withTranslation()(React.memo(HorizontalTimetableTile));
