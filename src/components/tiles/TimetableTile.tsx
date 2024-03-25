import React from 'react';
import { withTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import { TIMETABLE_START_HOUR, TIMETABLE_END_HOUR } from '@/common/constants';
import Lecture from '@/shapes/model/subject/Lecture';
import Classtime from '@/shapes/model/subject/Classtime';
import { useTranslatedString } from '@/hooks/useTranslatedString';
import { getProfessorsShortStr } from '@/utils/lectureUtils';

interface Props {
  lecture: Lecture;
  classtime: Classtime;
  tableIndex: number;
  dayIndex: number;
  beginIndex: number;
  endIndex: number;
  color: number;
  cellWidth: number;
  cellHeight: number;
  isTimetableReadonly: boolean;
  isRaised: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  isTemp: boolean;
  isSimple: boolean;
  onMouseOver?: (lecture: Lecture) => void;
  onMouseOut?: (lecture: Lecture) => void;
  onClick?: (lecture: Lecture) => void;
  deleteLecture: (lecture: Lecture) => void;
  occupiedIndices?: number[][];
}

/**
 * 모의시간표의 시간표 타일
 */
const TimetableTile: React.FC<Props> = ({
  lecture,
  classtime,
  tableIndex,
  dayIndex,
  beginIndex,
  endIndex,
  color,
  cellWidth,
  cellHeight,
  isTimetableReadonly,
  isRaised,
  isHighlighted,
  isDimmed,
  isTemp,
  isSimple,
  onMouseOver,
  onMouseOut,
  onClick,
  deleteLecture,
  occupiedIndices,
}) => {
  const translate = useTranslatedString();

  const handleMouseOver = onMouseOver && (() => onMouseOver(lecture));
  const handleMouseOut = onMouseOut && (() => onMouseOut(lecture));
  const handleClick = onClick && (() => onClick(lecture));

  const handleDeleteFromTableClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteLecture(lecture);
  };

  const getTop = () => {
    if (tableIndex === 0) {
      const timedTableOffset = 17 + cellHeight * beginIndex;
      return timedTableOffset + 2;
    }
    const timedTableHeight = 17 + cellHeight * ((TIMETABLE_END_HOUR - TIMETABLE_START_HOUR) * 2);
    const untimedTableHeight = 17 + cellHeight * 3;
    const tableSpacing = cellHeight;
    const untimedTableOffset = 17 + cellHeight * beginIndex;
    return (
      timedTableHeight +
      untimedTableHeight * (tableIndex - 1) +
      tableSpacing * tableIndex +
      untimedTableOffset +
      2
    );
  };

  return (
    <div
      className={classNames(
        'tile',
        'tile--timetable',
        `background-color--${color}`,
        isRaised ? 'tile--raised' : null,
        isTemp ? 'tile--temp' : null,
        isHighlighted ? 'tile--highlighted' : null,
        isDimmed ? 'tile--dimmed' : null,
      )}
      style={{
        left: 18 + (cellWidth + 5) * dayIndex - 1,
        top: getTop(),
        width: cellWidth + 2,
        height: cellHeight * (endIndex - beginIndex) - 3,
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}>
      {!isTemp && !isTimetableReadonly ? (
        <button
          className={classNames('tile--timetable__button')}
          onClick={handleDeleteFromTableClick}>
          <i className={classNames('icon', 'icon--delete-lecture')} />
        </button>
      ) : null}
      <div
        // onMouseDown={() => onMouseDown()}
        className={classNames('tile--timetable__content')}>
        <p
          className={classNames(
            'tile--timetable__content__title',
            isSimple ? 'mobile-hidden' : null,
          )}>
          {translate(lecture, 'title')}
        </p>
        <p className={classNames('tile--timetable__content__info', 'mobile-hidden')}>
          {getProfessorsShortStr(lecture)}
        </p>
        <p className={classNames('tile--timetable__content__info', 'mobile-hidden')}>
          {classtime && translate(classtime, 'classroom')}
        </p>
      </div>
      {occupiedIndices &&
        occupiedIndices.map((o) => (
          <div
            key={`${o[0]}:${o[1]}`}
            className={classNames('tile--timetable__occupied-area')}
            style={{
              top: cellHeight * (o[0] - beginIndex),
              height: cellHeight * (o[1] - o[0]) - 3,
            }}
          />
        ))}
    </div>
  );
};

export default withTranslation()(React.memo(TimetableTile));
