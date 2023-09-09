import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../../common/boundClassNames';

import lectureType from '@/shapes/model/subject/LectureType';

interface LectureSimpleBlockProps {
  lecture: lectureType;
  isRaised: boolean;
  isDimmed: boolean;
  hasReview: boolean;
  onClick?: (lecture: lectureType) => void; ///
}
const LectureSimpleBlock: React.FC<LectureSimpleBlockProps> = ({
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

// LectureSimpleBlock.propTypes = {
//   lecture: lectureShape.isRequired,
//   isRaised: PropTypes.bool.isRequired,
//   isDimmed: PropTypes.bool.isRequired,
//   hasReview: PropTypes.bool.isRequired,
//   onClick: PropTypes.func.isRequired,
// };

export default React.memo(LectureSimpleBlock);
