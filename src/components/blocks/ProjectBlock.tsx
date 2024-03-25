import React from 'react';
import { withTranslation } from 'react-i18next';
import { appBoundClassNames as classNames } from '@/common/boundClassNames';

interface Props {
  project: {
    index: number;
    mainTitle: string;
    subTitle: string;
    period: string;
  };
  onClick?: (project: { index: number }) => void;
  isRaised: boolean;
}

/**
 * Component `ProjectBlock` displays an overview of a project on the `CreditPage`.
 * It shows the title, subtitle, and period of the project.
 */
const ProjectBlock: React.FC<Props> = ({ project, isRaised, onClick }) => {
  return (
    <div
      className={classNames(
        'block',
        'block--project',
        onClick ? 'block--clickable' : null,
        isRaised ? 'block--raised' : null,
      )}
      onClick={() => onClick?.(project)}>
      <div className={classNames('block--project__title')}>{project.mainTitle}</div>
      <div className={classNames('block--project__title')}>{project.subTitle}</div>
      <div className={classNames('block--project__content')}>{project.period}</div>
    </div>
  );
};

export default withTranslation()(React.memo(ProjectBlock));
