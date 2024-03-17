import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { appBoundClassNames as classNames } from '../../common/boundClassNames';
import { getProfessorsFullStr } from '../../utils/courseUtils';
import Course from '@/shapes/model/subject/Course';
import BlockLink from '@/shapes/BlockLink';
import Attributes from '../Attributes';
import { useTranslatedString } from '@/hooks/useTranslatedString';

interface Props {
  t: (string: string) => string;
  course: Course;
  shouldShowReadStatus?: boolean;
  isRead?: boolean;
  isRaised?: boolean;
  isDimmed?: boolean;
  onMouseOver?: (course: Course) => void;
  onMouseOut?: (course: Course) => void;
  onClick?: (course: Course) => void;
  linkTo?: BlockLink;
}

/**
 *
 * Component `CourseBlock` displays a overview of a course in `DictionaryPage`.
 * It shows the title, classification, professors, and description of the course.
 *
 */
const CourseBlock: React.FC<Props> = ({
  t,
  course,
  shouldShowReadStatus,
  isRead,
  isRaised,
  isDimmed,
  onMouseOver,
  onMouseOut,
  onClick,
  linkTo,
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

  const RootTag = linkTo ? Link : 'div';

  return (
    <RootTag
      className={classNames(
        'block',
        'block--course',
        onClick ? 'block--clickable' : null,
        isRaised ? 'block--raised' : null,
        isDimmed ? 'block--dimmed' : null,
      )}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      to={linkTo ?? ''}>
      <div className={classNames('block--course__title')}>
        {!shouldShowReadStatus ? null : isRead ? (
          <i className={classNames('icon', 'icon--status-read')} />
        ) : (
          <i className={classNames('icon', 'icon--status-unread')} />
        )}
        <strong>{translate(course, 'title')}</strong>
        &nbsp;
        <span>{course.old_code}</span>
      </div>
      <Attributes
        entries={[
          {
            name: t('ui.attribute.classification'),
            info: `${course.department && translate(course.department, 'name')}, ${translate(
              course,
              'type',
            )}`,
          },
          { name: t('ui.attribute.professors'), info: getProfessorsFullStr(course) },
          { name: t('ui.attribute.description'), info: course.summary },
        ]}
        longInfo
      />
    </RootTag>
  );
};

export default withTranslation()(React.memo(CourseBlock));
