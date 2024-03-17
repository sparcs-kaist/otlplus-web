import React from 'react';
import { withTranslation } from 'react-i18next';
import { appBoundClassNames as classNames } from '../../common/boundClassNames';
import Course from '@/shapes/model/subject/Course';
import { ArbitraryPseudoCourse } from '@/shapes/state/planner/ItemFocus';
import { useTranslatedString } from '@/hooks/useTranslatedString';

interface Props {
  t: (string: string) => string;
  course: Course | ArbitraryPseudoCourse;
  isRaised?: boolean;
  isDimmed?: boolean;
  isAdded: boolean;
  onMouseOver?: (course: Course | ArbitraryPseudoCourse) => void;
  onMouseOut?: (course: Course | ArbitraryPseudoCourse) => void;
  onClick?: (course: Course | ArbitraryPseudoCourse) => void;
  addToPlanner: (course: Course | ArbitraryPseudoCourse) => void;
}

/**
 * Component `PlannerCourseBlock` displays an overview of a course within the search results on the `PlannerPage`.
 * It shows the title, classification, and code of the course.
 */
const PlannerCourseBlock: React.FC<Props> = ({
  t,
  course,
  isRaised,
  isDimmed,
  isAdded,
  onMouseOver,
  onMouseOut,
  onClick,
  addToPlanner,
}) => {
  const translate = useTranslatedString();

  const handleMouseOver = onMouseOver
    ? () => {
        onMouseOver(course);
      }
    : undefined;
  const handleMouseOut = onMouseOut
    ? () => {
        onMouseOut(course);
      }
    : undefined;
  const handleClick = onClick
    ? () => {
        onClick(course);
      }
    : undefined;
  const handleAddToPlannerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    addToPlanner(course);
  };

  return (
    <div
      className={classNames(
        'block',
        'block--planner-course',
        onClick ? 'block--clickable' : null,
        isRaised ? 'block--raised' : null,
        isDimmed ? 'block--dimmed' : null,
        isAdded ? 'block--completed' : null,
      )}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>
      <div className={classNames('block__completed-text')}>{t('ui.others.added')}</div>
      <div className={classNames('block--planner-course__text')}>
        <div className={classNames('block--planner-course__text__caption')}>
          {`${course.department && translate(course.department, 'name')} / ${translate(
            course,
            'type',
          )}`}
        </div>
        <div className={classNames('block--planner-course__text__title')}>
          {translate(course, 'title')}
        </div>
        <div className={classNames('block--planner-course__text__subtitle')}>{course.old_code}</div>
      </div>
      <button
        className={classNames('block--planner-course__button')}
        onClick={handleAddToPlannerClick}>
        <i className={classNames('icon', 'icon--add-lecture')} />
      </button>
    </div>
  );
};

export default withTranslation()(React.memo(PlannerCourseBlock));
