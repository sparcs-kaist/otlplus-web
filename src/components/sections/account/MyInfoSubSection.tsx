import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import { getFullName } from '@/common/guideline/components/Header';
import Attributes from '@/components/Attributes';
import { useSessionInfo } from '@/queries/account';

const MyInfoSubSection = () => {
  const { t } = useTranslation();
  const { data: user } = useSessionInfo();

  if (!user) {
    return null;
  }

  return (
    <div className={classNames('subsection', 'subsection--my-info')}>
      <div className={classNames('title')}>{t('ui.title.myInformation')}</div>
      <Attributes
        entries={[
          { name: t('ui.attribute.name'), info: getFullName(user) },
          { name: t('ui.attribute.email'), info: user.email },
        ]}
      />
      <div className={classNames('caption')}>
        {t('ui.message.myInfoCaptionHead')}
        <a
          href="https://sparcssso.kaist.ac.kr/"
          className={classNames('text-button')}
          target="_blank"
          rel="noopener noreferrer">
          SPARCS SSO
        </a>
        {t('ui.message.myInfoCaptionTail')}
      </div>
    </div>
  );
};

export default MyInfoSubSection;
