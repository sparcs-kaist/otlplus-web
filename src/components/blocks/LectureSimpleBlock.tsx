import React from 'react';
import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../../common/boundClassNames';

import Lecture from '@/shapes/model/subject/Lecture';
import { useTranslatedString } from '@/hooks/useTranslatedString';

interface LectureSimpleBlockProps {
  lecture: Lecture;
  isRaised: boolean;
  isDimmed: boolean;
  hasReview: boolean;
  onClick?: (x: Lecture) => void;
}
const LectureSimpleBlock: React.FC<LectureSimpleBlockProps> = ({
  lecture,
  isRaised,
  isDimmed,
  hasReview,
  onClick,
}) => {
  const { t } = useTranslation();

  const translate = useTranslatedString();

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
      onClick={() => onClick?.(lecture)}>
      <div className={classNames('block__completed-text')}>{t('ui.others.written')}</div>
      <div className={classNames('block--lecture-simple__title')}>
        {translate(lecture, 'title')}
      </div>
      <div className={classNames('block--lecture-simple__subtitle')}>{lecture.old_code}</div>
    </div>
  );
};

export default React.memo(LectureSimpleBlock);
