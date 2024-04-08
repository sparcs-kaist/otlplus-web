import React from 'react';
import { useTranslation } from 'react-i18next';
import { appBoundClassNames as classNames } from '../../common/boundClassNames';

import lecture from '../../shapes/model/subject/Lecture';
import { useTranslatedString } from '@/hooks/useTranslatedString';

interface LectureGroupBlockProps {
  lectureGroup: lecture[];
  isRaised: boolean;
  isDimmed: boolean;
  isTaken: boolean;
  children?: React.ReactNode;
}

const LectureGroupBlock: React.FC<LectureGroupBlockProps> = ({
  lectureGroup,
  isRaised,
  isDimmed,
  isTaken,
  children,
}) => {
  const { t } = useTranslation();
  const translate = useTranslatedString();

  return (
    <div
      className={classNames(
        'block',
        'block--lecture-group',
        isRaised ? 'block--raised' : null,
        isDimmed ? 'block--dimmed' : null,
        isTaken ? 'block--completed' : null,
      )}>
      <div className={classNames('block__completed-text')}>{t('ui.others.taken')}</div>
      <div className={classNames('block--lecture-group__title')}>
        <strong>{translate(lectureGroup[0], 'common_title')}</strong>
        {lectureGroup[0].old_code}
      </div>
      {children}
    </div>
  );
};

export default React.memo(LectureGroupBlock);
