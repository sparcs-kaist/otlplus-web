import React from 'react';
import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import { useSpringCarousel } from 'react-spring-carousel';
import style from '../../sass/_campaign.module.scss';

const CampaignSection: React.FC = () => {
  const { carouselFragment, slideToPrevItem, slideToNextItem } = useSpringCarousel({
    withLoop: true,
    items: [
      {
        id: 'app-preview-1',
        renderItem: <div>App Preview 1</div>,
      },
    ],
  });

  React.useEffect(() => {
    const callback = setInterval(() => {
      slideToNextItem();
    }, 3000);

    return () => clearInterval(callback);
  }, []);

  return (
    <div className={style.fullscreenSection}>
      <div className={classNames('subsection', 'subsection--campaign')}>테스트</div>
      <div>{carouselFragment}</div>
    </div>
  );
};

export default CampaignSection;
