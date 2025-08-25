import React from 'react';
import { Link } from 'react-router-dom';
import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import { useTranslation } from 'react-i18next';

const UpdatesFeedSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={classNames('section', 'section--feed')}>
      <div className={classNames('title')}>{t('ui.title.updates')}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          color: '#888888',
          fontSize: '13px',
          fontWeight: 500,
        }}>
        <Link
          to={{
            pathname: '/update',
          }}
          style={{
            backgroundColor: '#DDDDDD',
            padding: '6px 12px',
            borderRadius: '6px',
          }}>
          <i className={classNames('icon', 'icon--open-in-new')} style={{ marginRight: '6px' }} />
          {t('ui.button.seeUpdates')}
        </Link>
      </div>
    </div>
  );
};

export default UpdatesFeedSection;
