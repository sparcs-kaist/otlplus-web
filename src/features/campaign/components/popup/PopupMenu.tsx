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
      <p>{t('ui.bannerPopup.close')}</p>
    </button>
  );
};

const CloseButton: React.FC<{ onClick: VoidFunction }> = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <button className={classNames(style.button)} onClick={(e) => props.onClick()}>
      <p>{t('ui.bannerPopup.doNotShowAgain')}</p>
    </button>
  );
};

const PopupMenu: React.FC<IPopupMenuProps> = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={style.popupMenu}>
      <DoNotShowAgain onClick={props.onDoNotShow} />
      <div className={style.divider} />
      <CloseButton onClick={props.onClose} />
    </div>
  );
};

export default PopupMenu;
