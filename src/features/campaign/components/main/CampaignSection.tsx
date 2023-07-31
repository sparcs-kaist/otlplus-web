import React from 'react';
import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import Slider from 'react-slick';
import ImageCarouselBanner from './carouselPages/ImageCarouselBanner';
import style from '../../sass/_campaign.module.scss';

const CampaignSection: React.FC = () => {
  return (
    <div className={style.fullscreenSection}>
      <Slider dots={false} infinite speed={800} autoplay={true} autoplaySpeed={8000}>
        <ImageCarouselBanner
          ifDefault={{
            imageUrl: 'https://profill.s3.ap-northeast-2.amazonaws.com/otl-ios.png',
            cta: '공지 보기 1',
            link: 'google.com',
          }}
        />
        <ImageCarouselBanner
          ifDefault={{
            imageUrl: 'https://profill.s3.ap-northeast-2.amazonaws.com/otl-macos.png',
            cta: '공지 보기 2',
            link: 'google.com',
          }}
        />
      </Slider>
    </div>
  );
};

export default CampaignSection;
