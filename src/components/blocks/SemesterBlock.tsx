import React from 'react';
import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';

import Semester from '@/shapes/model/subject/Semester';
import { getSemesterName } from '@/utils/semesterUtils';

type SemesterType = Semester | 'ALL';

interface Props {
  semester: SemesterType;
  isRaised: boolean;
  onClick: (semester: SemesterType) => void;
}

/**
 * semester Block 은 write-review 의 명예의 전당에서 사용됩니다.
 * @param isRaised 는 해당 semester Block 이 클릭되어 active한 상태인지를 나타냅니다.
 */

const SemesterBlock: React.FC<Props> = ({ semester, isRaised, onClick }) => {
  const { t } = useTranslation();

  const handleClick =
    onClick &&
    (() => {
      onClick(semester);
    });

  const title =
    semester === 'ALL'
      ? t('ui.semester.all')
      : `${semester.year} ${getSemesterName(semester.semester)}`;

  return (
    <div
      className={classNames(
        'block',
        'block--semester',
        'block--clickable',
        isRaised ? 'block--raised' : null,
      )}
      onClick={handleClick}>
      <div className={classNames('block--semester__title')}>{title}</div>
    </div>
  );
};

export default React.memo(SemesterBlock);
