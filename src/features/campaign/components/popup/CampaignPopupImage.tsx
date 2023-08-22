import React from 'react';
import style from '../../sass/_campaignPopupImage.module.scss';
import DesktopOnly from '@/common/components/utils/DesktopOnly';
import MobileOnly from '@/common/components/utils/MobileOnly';

const CampaignPopupImage: React.FC = () => {
  return (
    <>
      <DesktopOnly>
        <div className={style.campaignContainerDesktop}>
          <img alt="OTL" src="https://profill.s3.ap-northeast-2.amazonaws.com/web.png" />
        </div>
      </DesktopOnly>
      <MobileOnly>
        <div className={style.campaignContainerMobile}>
          <img alt="OTL" src="https://profill.s3.ap-northeast-2.amazonaws.com/mobile.png" />
        </div>
      </MobileOnly>
    </>
  );
};

export default CampaignPopupImage;
