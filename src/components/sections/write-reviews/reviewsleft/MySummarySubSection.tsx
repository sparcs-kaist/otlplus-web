import { sumBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';

import { rootReducer } from '@/App';
import React from 'react';
import Scores from '../../../Scores';

export type RootState = ReturnType<typeof rootReducer>;

const MySummarySubSection = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => ({
    user: state.common.user.user,
  }));

  const writableTakenLectures = user ? user.review_writable_lectures : [];
  const editableReviews = user
    ? user.reviews.filter((r) => writableTakenLectures.some((l) => l.id === r.lecture.id))
    : [];

  return (
    <div className={classNames('subsection', 'subsection--my-summary')}>
      <div className={classNames('title')}>{t('ui.title.takenLectures')}</div>
      <Scores
        entries={[
          {
            name: t('ui.score.reviewsWritten'),
            score: (
              <>
                <span>{user ? editableReviews.length : '-'}</span>
                <span>{user ? `/${writableTakenLectures.length}` : '/-'}</span>
              </>
            ),
          },
          {
            name: t('ui.score.likes'),
            score: user ? sumBy(editableReviews, (r) => r.like) : '-',
          },
        ]}
      />
    </div>
  );
};

export default React.memo(MySummarySubSection);
