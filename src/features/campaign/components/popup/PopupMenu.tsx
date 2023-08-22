import React from 'react';
import style from '../../sass/_popupMenu.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IPopupMenuProps {
  onDoNotShow: VoidFunction;
  onClose: VoidFunction;
}

const DoNotShowAgain: React.FC<{ onClick: VoidFunction }> = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <button className={classNames(style.button)} onClick={(e) => props.onClick()}>
      <p>다지 보지 않기</p>
    </button>
  );
};

const CloseButton: React.FC<{ onClick: VoidFunction }> = (props) => {
  return (
    <button className={classNames(style.button)} onClick={(e) => props.onClick()}>
      <p>닫기</p>
    </button>
  );
};

const PopupMenu: React.FC<IPopupMenuProps> = (props) => {
  return (
    <div className={style.popupMenu}>
      <DoNotShowAgain onClick={props.onDoNotShow} />
      <div className={style.divider} />
      <CloseButton onClick={props.onClose} />
    </div>
  );
};

export default PopupMenu;
