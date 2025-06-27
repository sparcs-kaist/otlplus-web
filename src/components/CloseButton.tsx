import React from 'react';
import { appBoundClassNames as classNames } from '../common/boundClassNames';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <div className={classNames('close-button-wrap')}>
      <button onClick={onClick}>
        <i className={classNames('icon', 'icon--close-section')} />
      </button>
    </div>
  );
};

export default CloseButton;
