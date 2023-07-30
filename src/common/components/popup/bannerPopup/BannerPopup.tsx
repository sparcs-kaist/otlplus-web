import React from 'react';
import AnimatedScrimPopup from '../animatedScrimPopup/AnimatedScrimPopup';

import style from '../../../sass/popup/_bannerPopup.module.scss';

interface IBannerPopupProps {
  popupOpen: boolean;
  setPopupOpen: (popupOpen: boolean) => void;
}

const BannerPopup: React.FC<React.PropsWithChildren<IBannerPopupProps>> = (props) => {
  return (
    <AnimatedScrimPopup isOpen={props.popupOpen} onClose={() => props.setPopupOpen(false)}>
      <div className={style.popupContainer} onClick={() => props.setPopupOpen(false)}>
        <div className={style.popupBox}></div>
      </div>
    </AnimatedScrimPopup>
  );
};

export default BannerPopup;
