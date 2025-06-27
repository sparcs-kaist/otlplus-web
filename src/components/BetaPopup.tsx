import { useState } from 'react';
import { appBoundClassNames as classNames } from '../common/boundClassNames';

import CloseButton from './CloseButton';

interface BetaPopupProps {
  title: string;
  content: string[];
  link: string;
}

const BetaPopup = ({ title, content, link }: BetaPopupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const close = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={classNames('section', 'section--popup')}>
      <CloseButton onClick={close} />
      <div className={classNames('subsection', 'subsection--flex', 'subsection--beta-popup')}>
        <div className={classNames('title')}>{title}</div>
        <div className={classNames('subsection--beta-popup__content')}>
          {content.map((l, index) => (
            <div key={index}>{l}</div>
          ))}
        </div>
        <div className={classNames('buttons')}>
          <a
            href={link}
            className={classNames('text-button')}
            target="_blank"
            rel="noopener noreferrer">
            피드백 제출하기
          </a>
        </div>
      </div>
    </div>
  );
};

export default BetaPopup;
