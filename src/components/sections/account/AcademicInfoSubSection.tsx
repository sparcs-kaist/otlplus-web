import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import { CONTACT } from '@/common/constants';
import Attributes from '@/components/Attributes';
import { useSessionInfo } from '@/queries/account';
import { useTranslatedString } from '@/hooks/useTranslatedString';

const AcademicInfoSubSection = () => {
  const { t } = useTranslation();
  const translate = useTranslatedString();
  const { data: user } = useSessionInfo();

  if (!user) {
    return null;
  }

  return (
    <div className={classNames('subsection', 'subsection--academic-info')}>
      <div className={classNames('title')}>{t('ui.title.academicInformation')}</div>
      <Attributes
        entries={[
          { name: t('ui.attribute.studentId'), info: user.student_id },
          {
            name: t('ui.attribute.major'),
            info: user.majors.map((d) => translate(d, 'name')).join(', '),
          },
        ]}
      />
      <div className={classNames('caption')}>
        {t('ui.message.academicInfoCaptionHead')}
        <a
          href={`mailto:${CONTACT}`}
          className={classNames('text-button')}
          data-testid="contact-mail">
          {CONTACT}
        </a>
        {t('ui.message.academicInfoCaptionTail')}
      </div>
    </div>
  );
};

export default AcademicInfoSubSection;
