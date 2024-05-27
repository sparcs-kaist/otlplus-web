import ReactGA from 'react-ga4';
import { useDispatch, useSelector } from 'react-redux';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';

import { ReviewsFocusFrom } from '@/shapes/enum';
import { setReviewsFocus } from '../../../../actions/write-reviews/reviewsFocus';

import Lecture from '@/shapes/model/subject/Lecture';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RootState } from './MySummarySubSection';

const ReviewsMenusSubSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const setReviewsFocusDispatch = (from: ReviewsFocusFrom, lecture: Lecture | null) => {
    dispatch(setReviewsFocus(from, lecture));
  };
  const { user, reviewsFocus } = useSelector((state: RootState) => ({
    user: state.common.user.user,
    reviewsFocus: state.writeReviews.reviewsFocus,
  }));

  const handleMenuClick = (from: ReviewsFocusFrom) => () => {
    setReviewsFocusDispatch(from, null);

    ReactGA.event({
      category: 'Write Reviews - Selection',
      action: 'Selected List',
      label: `List : ${from}`,
    });
  };

  return (
    <div className={classNames('subsection', 'subsection--reviews-menus')}>
      <div>
        <button
          className={classNames(
            'text-button',
            reviewsFocus.from === ReviewsFocusFrom.REVIEWS_LATEST ? 'text-button--disabled' : null,
          )}
          onClick={handleMenuClick(ReviewsFocusFrom.REVIEWS_LATEST)}>
          {t('ui.title.latestReviews')}
        </button>
      </div>
      <div>
        <button
          className={classNames(
            'text-button',
            reviewsFocus.from === ReviewsFocusFrom.REVIEWS_RANKED ? 'text-button--disabled' : null,
          )}
          onClick={handleMenuClick(ReviewsFocusFrom.REVIEWS_RANKED)}>
          {t('ui.title.rankedReviews')}
        </button>
      </div>
      <div>
        <button
          className={classNames(
            'text-button',
            !user || reviewsFocus.from === ReviewsFocusFrom.REVIEWS_MY
              ? 'text-button--disabled'
              : null,
          )}
          onClick={handleMenuClick(ReviewsFocusFrom.REVIEWS_MY)}>
          {t('ui.title.myReviews')}
        </button>
      </div>
      <div>
        <button
          className={classNames(
            'text-button',
            !user || reviewsFocus.from === ReviewsFocusFrom.REVIEWS_LIKED
              ? 'text-button--disabled'
              : null,
          )}
          onClick={handleMenuClick(ReviewsFocusFrom.REVIEWS_LIKED)}>
          {t('ui.title.likedReviews')}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ReviewsMenusSubSection);
