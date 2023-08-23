import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import ImageCarouselBanner from './carouselPages/ImageCarouselBanner';
import style from '../../sass/_campaign.module.scss';

const ltos = (l: string) => (l === 'ko' ? 'ko' : 'en');

const CampaignSection: React.FC = () => {
  const { i18n } = useTranslation();

  const [languageUrlPrefix, setLanguageUrlPrefix] = React.useState<string>(ltos(i18n.language));

  i18n.on('languageChanged', (lng) => {
    setLanguageUrlPrefix(ltos(lng));
  });

  return (
    <div className={style.fullscreenSection}>
      <Slider dots={true} arrows={false} infinite speed={800} autoplay={true} autoplaySpeed={8000}>
        <ImageCarouselBanner
          language={languageUrlPrefix}
          ifDefault={{
            imageUrl: `https://profill.s3.ap-northeast-2.amazonaws.com/banner-image/${languageUrlPrefix}/23f-sparcs-recruiting.png`,
            cta: 'DEPRECATED',
            link: 'https://apply.sparcs.org',
          }}
        />
        <ImageCarouselBanner
          language={languageUrlPrefix}
          ifDefault={{
            imageUrl: `https://profill.s3.ap-northeast-2.amazonaws.com/banner-image/${languageUrlPrefix}/app-launch.png`,
            cta: 'DEPRECATED',
            link: '/eventBanner',
          }}
          ifIOS={{
            link: 'https://apps.apple.com/us/app/otl/id1579878255',
          }}
          ifAndroid={{
            link: 'https://play.google.com/store/apps/details?id=org.sparcs.otlplus',
          }}
        />
        <ImageCarouselBanner
          language={languageUrlPrefix}
          ifDefault={{
            imageUrl: `https://profill.s3.ap-northeast-2.amazonaws.com/banner-image/${languageUrlPrefix}/release-note.png`,
            cta: '공지 보기 2',
            link: '/',
          }}
        />
      </Slider>
    </div>
  );
};

export default CampaignSection;
