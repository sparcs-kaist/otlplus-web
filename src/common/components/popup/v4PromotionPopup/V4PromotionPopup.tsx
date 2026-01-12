import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';
import AnimatedScrimPopup from '../animatedScrimPopup/AnimatedScrimPopup';
import style from './V4PromotionPopup.module.scss';

const V4_POPUP_DISMISSED_KEY = 'v4-promotion-popup-dismissed';

const isOtlApp = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return navigator.userAgent.includes('otl-app');
};

const V4PromotionPopup: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOtlApp()) return;

    const dismissed = sessionStorage.getItem(V4_POPUP_DISMISSED_KEY);
    if (!dismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleSwitchToV4 = () => {
    ReactGA.event({
      category: 'V4Promotion',
      action: 'switch-to-v4',
    });
    window.location.href = '/__switch/v4';
  };

  const handleClose = () => {
    ReactGA.event({
      category: 'V4Promotion',
      action: 'popup-close',
    });
    sessionStorage.setItem(V4_POPUP_DISMISSED_KEY, 'true');
    setIsOpen(false);
  };

  const handleDoNotShowAgain = () => {
    ReactGA.event({
      category: 'V4Promotion',
      action: 'popup-do-not-show',
    });
    localStorage.setItem(V4_POPUP_DISMISSED_KEY, 'true');
    setIsOpen(false);
  };

  useEffect(() => {
    const localDismissed = localStorage.getItem(V4_POPUP_DISMISSED_KEY);
    if (localDismissed) {
      setIsOpen(false);
    }
  }, []);

  if (isOtlApp()) return null;

  return (
    <AnimatedScrimPopup isOpen={isOpen} onClose={handleClose}>
      <div className={style.popupContainer} onClick={handleClose}>
        <div className={style.popupBox} onClick={(e) => e.stopPropagation()}>
          <div className={style.content}>
            <h2 className={style.title}>{t('ui.v4Promotion.title')}</h2>
            <p className={style.description}>{t('ui.v4Promotion.description')}</p>
            <div className={style.features}>
              <div className={style.feature}>✨ {t('ui.v4Promotion.feature1')}</div>
              <div className={style.feature}>🚀 {t('ui.v4Promotion.feature2')}</div>
              <div className={style.feature}>📱 {t('ui.v4Promotion.feature3')}</div>
            </div>
          </div>
          <div className={style.buttons}>
            <button className={style.primaryButton} onClick={handleSwitchToV4}>
              {t('ui.v4Promotion.switchToV4')}
            </button>
            <button className={style.secondaryButton} onClick={handleClose}>
              {t('ui.v4Promotion.maybeLater')}
            </button>
          </div>
          <button className={style.doNotShowButton} onClick={handleDoNotShowAgain}>
            {t('ui.bannerPopup.doNotShowAgain')}
          </button>
        </div>
      </div>
    </AnimatedScrimPopup>
  );
};

export default V4PromotionPopup;
