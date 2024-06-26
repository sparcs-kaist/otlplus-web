import React from 'react';

import { appBoundClassNames as classNames } from '../../common/boundClassNames';
import { getProfessorsShortStr, getClassroomStr } from '../../utils/lectureUtils';
import Lecture from '@/shapes/model/subject/Lecture';
import { useTranslatedString } from '@/hooks/useTranslatedString';

type LectureVoidFunc = (x: Lecture) => void;

interface LectureGroupBlockRowProps {
  lecture: Lecture;
  isHighlighted: boolean;
  inTimetable: boolean;
  isTimetableReadonly: boolean;
  inCart: boolean;
  fromCart: boolean;
  addToCart: LectureVoidFunc;
  addToTable: LectureVoidFunc;
  deleteFromCart: LectureVoidFunc;
  onMouseOver?: LectureVoidFunc;
  onMouseOut?: LectureVoidFunc;
  onClick?: LectureVoidFunc;
}

const LectureGroupBlockRow: React.FC<LectureGroupBlockRowProps> = ({
  lecture,
  isHighlighted,
  inTimetable,
  isTimetableReadonly,
  inCart,
  fromCart,
  addToCart,
  addToTable,
  deleteFromCart,
  onMouseOver,
  onMouseOut,
  onClick,
}) => {
  const getClass = (lecture: Lecture) => {
    switch (lecture.class_title.length) {
      case 1:
        return classNames('block--lecture-group__row-content__texts__main__fixed-1');
      case 2:
        return classNames('block--lecture-group__row-content__texts__main__fixed-2');
      default:
        return classNames('');
    }
  };

  const handleDeleteFromCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteFromCart(lecture);
  };
  const handleAddToCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart(lecture);
  };
  const handleAddToTableClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    addToTable(lecture);
  };

  const cartButton = fromCart ? (
    <button
      className={classNames('block--lecture-group__row-content__button')}
      onClick={handleDeleteFromCartClick}>
      <i className={classNames('icon', 'icon--delete-cart')} />
    </button>
  ) : !inCart ? (
    <button
      className={classNames('block--lecture-group__row-content__button')}
      onClick={handleAddToCartClick}>
      <i className={classNames('icon', 'icon--add-cart')} />
    </button>
  ) : (
    <button
      className={classNames(
        'block--lecture-group__row-content__button',
        'block--lecture-group__row-content__button--disable',
      )}>
      <i className={classNames('icon', 'icon--add-cart')} />
    </button>
  );
  const timetableButton =
    !inTimetable && !isTimetableReadonly ? (
      <button
        className={classNames('block--lecture-group__row-content__button')}
        onClick={handleAddToTableClick}>
        <i className={classNames('icon', 'icon--add-lecture')} />
      </button>
    ) : (
      <button
        className={classNames(
          'block--lecture-group__row-content__button',
          'block--lecture-group__row-content__button--disable',
        )}>
        <i className={classNames('icon', 'icon--add-lecture')} />
      </button>
    );

  const translate = useTranslatedString();

  return (
    <div
      className={classNames(
        'block--lecture-group__row',
        isHighlighted ? 'block--lecture-group__row--highlighted' : null,
      )}
      data-id={lecture.id}
      onClick={() => onClick?.(lecture)}
      onMouseOver={() => onMouseOver?.(lecture)}
      onMouseOut={() => onMouseOut?.(lecture)}>
      <div className={classNames('block--lecture-group__row-content')}>
        <div className={classNames('block--lecture-group__row-content__texts')}>
          <div className={classNames('block--lecture-group__row-content__texts__sub')}>
            {translate(lecture, 'department_name')}
            {' / '}
            {translate(lecture, 'type')}
          </div>
          <div className={classNames('block--lecture-group__row-content__texts__main')}>
            <strong className={getClass(lecture)}>{translate(lecture, 'class_title')}</strong>{' '}
            <span>{getProfessorsShortStr(lecture)}</span>
          </div>
          <div className={classNames('block--lecture-group__row-content__texts__sub')}>
            {getClassroomStr(lecture)}
            {' / '}
            {lecture.limit}
          </div>
        </div>
        {cartButton}
        {timetableButton}
      </div>
    </div>
  );
};

export default React.memo(LectureGroupBlockRow);
