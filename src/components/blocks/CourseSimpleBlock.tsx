import React from 'react';
import { withTranslation } from 'react-i18next';
import { appBoundClassNames as classNames } from '../../common/boundClassNames';
import Course from '@/shapes/model/subject/Course';
import { useTranslatedString } from '@/hooks/useTranslatedString';

interface Props {
  course: Course;
}

const CourseSimpleBlock: React.FC<Props> = ({ course }) => {
  const translate = useTranslatedString();

  return (
    <div className={classNames('block', 'block--course-simple')}>
      <div className={classNames('block--course-simple__title')}>{translate(course, 'title')}</div>
      <div className={classNames('block--course-simple__subtitle')}>{course.old_code}</div>
    </div>
  );
};

export default withTranslation()(React.memo(CourseSimpleBlock));
