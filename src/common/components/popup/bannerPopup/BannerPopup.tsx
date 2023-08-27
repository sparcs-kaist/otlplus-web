import React from 'react';
import AnimatedScrimPopup from '../animatedScrimPopup/AnimatedScrimPopup';

import style from '../../../sass/popup/_bannerPopup.module.scss';

interface IBannerPopupProps {
  popupOpen: boolean;
  setPopupOpen: (popupOpen: boolean) => void;
  footerArea?: React.ReactNode;
}

const BannerPopup: React.FC<React.PropsWithChildren<IBannerPopupProps>> = (props) => {
  return (
    <AnimatedScrimPopup isOpen={props.popupOpen} onClose={() => props.setPopupOpen(false)}>
      <div className={style.popupContainer} onClick={() => props.setPopupOpen(false)}>
        <div
          className={style.popupBox}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          {props.children}
        </div>
        {props.footerArea}
      </div>
    </AnimatedScrimPopup>
  );
};

export default BannerPopup;
