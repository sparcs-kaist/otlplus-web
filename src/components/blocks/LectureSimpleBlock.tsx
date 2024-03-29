import React from 'react';
import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../../common/boundClassNames';

import lecture from '@/shapes/model/subject/Lecture';
interface lectureSimpleBlockProps {
  lecture: lecture;
  isRaised: boolean;
  isDimmed: boolean;
  hasReview: boolean;
  onClick?: (x: lecture) => void;
}
const LectureSimpleBlock: React.FC<lectureSimpleBlockProps> = ({
  lecture,
  isRaised,
  isDimmed,
  hasReview,
  onClick,
}) => {
  const { t } = useTranslation();

  const handleClick = onClick
    ? (event) => {
        onClick(lecture);
      }
    : undefined;

  return (
    <div
      className={classNames(
        'block',
        'block--lecture-simple',
        onClick ? 'block--clickable' : null,
        isRaised ? 'block--raised' : null,
        isDimmed ? 'block--dimmed' : null,
        hasReview ? 'block--completed' : null,
      )}
      onClick={handleClick}>
      <div className={classNames('block__completed-text')}>{t('ui.others.written')}</div>
      <div className={classNames('block--lecture-simple__title')}>
        {lecture[t('js.property.title')]}
      </div>
      <div className={classNames('block--lecture-simple__subtitle')}>{lecture.old_code}</div>
    </div>
  );
};

export default React.memo(LectureSimpleBlock);
