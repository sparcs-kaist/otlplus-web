import React from 'react';
import style from '../../sass/_campaignPopupImage.module.scss';
import { useTranslation } from 'react-i18next';
import DesktopOnly from '@/common/components/utils/DesktopOnly';
import MobileOnly from '@/common/components/utils/MobileOnly';
import { useNavigate } from 'react-router';

const ltos = (l: string) => (l === 'ko' ? 'ko' : 'en');

const CampaignPopupImage: React.FC<{ closePopup: VoidFunction }> = (props) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const [languageUrlPrefix, setLanguageUrlPrefix] = React.useState<string>(ltos(i18n.language));

  i18n.on('languageChanged', (lng) => {
    setLanguageUrlPrefix(ltos(lng));
  });

  const bannerRedirect = () => {
    navigate('/eventBanner');
    props.closePopup();
  };

  return (
    <>
      <DesktopOnly>
        <div className={style.campaignContainerDesktop} onClick={() => bannerRedirect()}>
          <img
            alt="OTL"
            src={`https://profill.s3.ap-northeast-2.amazonaws.com/pop-up-image/${languageUrlPrefix}/web.png`}
          />
        </div>
      </DesktopOnly>
      <MobileOnly>
        <div className={style.campaignContainerMobile} onClick={() => bannerRedirect()}>
          <img
            alt="OTL"
            src={`https://profill.s3.ap-northeast-2.amazonaws.com/pop-up-image/${languageUrlPrefix}/mobile.png`}
          />
        </div>
      </MobileOnly>
    </>
  );
};

export default CampaignPopupImage;
