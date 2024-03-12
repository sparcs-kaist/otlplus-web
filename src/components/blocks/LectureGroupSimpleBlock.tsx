import React from 'react';
import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../../common/boundClassNames';
import { getProfessorsShortStr } from '../../utils/lectureUtils';
import lecture from '../../shapes/model/subject/Lecture';

interface lectureGroupSimpleBlockProps {
  lectures: lecture[];
}

const LectureGroupSimpleBlock: React.FC<lectureGroupSimpleBlockProps> = ({ lectures }) => {
  const { t } = useTranslation();
  const getClass = (lecture) => {
    if (!lecture.class_title) {
      return classNames('');
    }
    switch (lecture.class_title.length) {
      case 1:
        return classNames('block--lecture-group-simple__row-content__texts__fixed-1');
      case 2:
        return classNames('block--lecture-group-simple__row-content__texts__fixed-2');
      default:
        return classNames('');
    }
  };
  return (
    <div className={classNames('block', 'block--lecture-group-simple')}>
      {lectures.map((l) => (
        <div className={classNames('block--lecture-group-simple__row')} key={l.id}>
          <div className={classNames('block--lecture-group-simple__row-content')}>
            <div className={classNames('block--lecture-group-simple__row-content__texts')}>
              <strong className={getClass(l)}>{l[t('js.property.class_title')]}</strong>{' '}
              <span>{getProfessorsShortStr(l)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(LectureGroupSimpleBlock);
