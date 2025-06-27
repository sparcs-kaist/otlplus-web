import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import Divider from '@/components/Divider';
import Scroller from '@/components/Scroller';
import MyInfoSubSection from '@/components/sections/account/MyInfoSubSection';
import AcademicInfoSubSection from '@/components/sections/account/AcademicInfoSubSection';
import FavoriteDepartmentsSubSection from '@/components/sections/account/FavoriteDepartmentsSubSection';
import { API_URL } from '@/const';
import { Orientation } from '@/shapes/enum';

const AccountPage = () => {
  const { t } = useTranslation();
  return (
    <section className={classNames('content', 'content--no-scroll')}>
      <div className={classNames('page-grid', 'page-grid--full')}>
        <div className={classNames('section', 'section--account')}>
          <Scroller expandTop={12}>
            <MyInfoSubSection />
            <Divider orientation={Orientation.HORIZONTAL} isVisible={true} />
            <AcademicInfoSubSection />
            <Divider orientation={Orientation.HORIZONTAL} isVisible={true} />
            <FavoriteDepartmentsSubSection />
            <Divider orientation={Orientation.HORIZONTAL} isVisible={true} />
            <div>
              <a
                href={`${API_URL}/session/logout?next=${window.location.origin}`}
                className={classNames('text-button')}>
                {t('ui.button.signOut')}
              </a>
            </div>
          </Scroller>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
