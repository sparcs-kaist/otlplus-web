import React from 'react';

import { useTranslation } from 'react-i18next';
import { appBoundClassNames as classNames } from '../common/boundClassNames';

const ltos = (l: string) => (l === 'ko' ? 'ko' : 'en');

const EventBannerPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [languageUrlPrefix, setLanguageUrlPrefix] = React.useState<string>(ltos(i18n.language));

  i18n.on('languageChanged', (lng) => {
    setLanguageUrlPrefix(ltos(lng));
  });

  return (
    <section className={classNames('content', 'content--no-scroll')}>
      <div className={classNames('section')}>
        <div className={classNames('subsection', 'subsection--eventbanner')}>
          <img
            src={`https://profill.s3.ap-northeast-2.amazonaws.com/qr-code-page/${languageUrlPrefix}/web.png`}
          />
          <div className={classNames('button-group')}>
            <button
              onClick={() => {
                window.open('https://apps.apple.com/us/app/otl/id1579878255', '_blank');
              }}>
              App Store
            </button>
            <button
              onClick={() => {
                window.open(
                  'https://play.google.com/store/apps/details?id=org.sparcs.otlplus',
                  '_blank',
                );
              }}>
              Google Play
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventBannerPage;
