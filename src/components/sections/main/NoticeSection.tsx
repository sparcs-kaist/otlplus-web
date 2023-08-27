import React from 'react';
import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import { formatNewlineToBr } from '@/utils/commonUtils';

interface INoticeSectionProps {
  notice: {
    title: string;
    content: string;
  };
}

const NoticeSection: React.FC<INoticeSectionProps> = (props) => {
  const formattedContent = formatNewlineToBr(props.notice.content);

  return (
    <div className={classNames('section', 'section--feed')}>
      <div className={classNames('subsection', 'subsection--notice')}>
        <div className={classNames('title')}>{props.notice.title}</div>
        <div className={classNames('subsection--notice__content')}>{formattedContent}</div>
      </div>
    </div>
  );
};

export default NoticeSection;
