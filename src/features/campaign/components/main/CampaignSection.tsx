import React from 'react';
import Slider from 'react-slick';
import ImageCarouselBanner from './carouselPages/ImageCarouselBanner';
import style from '../../sass/_campaign.module.scss';

const CampaignSection: React.FC = () => {
  return (
    <div className={style.fullscreenSection}>
      <Slider dots={true} arrows={false} infinite speed={800} autoplay={true} autoplaySpeed={8000}>
        <ImageCarouselBanner
          ifDefault={{
            imageUrl: 'https://profill.s3.ap-northeast-2.amazonaws.com/app-launch.png',
            cta: 'DEPRECATED',
            link: '',
          }}
          ifAndroid={{
            link: 'https://play.google.com/store/apps/details?id=org.sparcs.otlplus',
          }}
          ifIOS={{
            link: 'https://apps.apple.com/us/app/otl/id1579878255',
          }}
        />
        <ImageCarouselBanner
          ifDefault={{
            imageUrl: 'https://profill.s3.ap-northeast-2.amazonaws.com/app-event.png',
            cta: '공지 보기 2',
            link: 'google.com',
          }}
        />
        <ImageCarouselBanner
          ifDefault={{
            imageUrl: 'https://profill.s3.ap-northeast-2.amazonaws.com/release-note.png',
            cta: '공지 보기 2',
            link: 'google.com',
          }}
        />
      </Slider>
    </div>
  );
};

export default CampaignSection;
