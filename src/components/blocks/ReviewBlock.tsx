import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ReactGA from 'react-ga4';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import { getProfessorsShortStr } from '@/utils/lectureUtils';
import { getSingleScoreLabel } from '@/utils/scoreUtils';
import { useTranslatedString } from '@/hooks/useTranslatedString';

import Review from '@/shapes/model/review/Review';
import BlockLink from '@/shapes/BlockLink';

import { formatNewlineToBr } from '@/utils/commonUtils';
import { getSemesterName } from '@/utils/semesterUtils';
import { CONTACT } from '@/common/constants';

interface Props {
  review: Review;
  shouldLimitLines: boolean;
  linkTo?: BlockLink;
  pageFrom: string;
}

/**
  Main Page의 피드, Write Review 페이지, dictionary 페이지, 졸업 플래너 페이지에서 사용되는 리뷰 블록입니다. 
  Main Page의 피드, Write Review 페이지에서는 linkTo를 통해 해당 리뷰의 상세 페이지로 이동할 수 있습니다.
  @param review 리뷰 객체
  @param shouldLimitLines 리뷰 내용을 줄여서 보여주기 위한 옵션
  @param linkTo 리뷰 블록을 클릭했을 때 이동할 링크 (없을 경우 블록이 클릭되지 않음)
  @param pageFrom 리뷰 블록이 사용되는 페이지
 **/

const ReviewBlock: React.FC<Props> = ({ review, shouldLimitLines, linkTo, pageFrom }) => {
  const [changedLikes, setChangedLikes] = useState(review.like);
  const [changedIsLiked, setChangedIsLiked] = useState(review.userspecific_is_liked);
  const translate = useTranslatedString();
  const { t } = useTranslation();

  const onLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    axios
      .post(
        `/api/reviews/${review.id}/like`,
        {},
        {
          metadata: {
            gaCategory: 'Review',
            gaVariable: 'POST Like / Instance',
          },
        },
      )
      .then(() => {
        setChangedLikes(changedLikes + 1);
        setChangedIsLiked(true);
      })
      .catch(() => {});

    ReactGA.event({
      category: 'Review',
      action: 'Liked Review',
      label: `Review : ${review.id} / From : Page : ${pageFrom}`,
    });
  };

  const onReportClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    alert(t('ui.message.reportUnderDevelopment', { contact: CONTACT }));

    ReactGA.event({
      category: 'Review',
      action: 'Reported Review',
      label: `Review : ${review.id} / From : Page : ${pageFrom}`,
    });
  };

  const RootTag = linkTo ? Link : 'div';

  const contentDisplay = formatNewlineToBr(review.content);

  return (
    <RootTag className={classNames('block', 'block--review')} to={linkTo ? linkTo : ''}>
      <div className={classNames('block--review__title')}>
        <strong>{translate(review.lecture, 'title')}</strong>
        <span>{getProfessorsShortStr(review.lecture)}</span>
        <span>{`${review.lecture.year} ${getSemesterName(review.lecture.semester)}`}</span>
      </div>
      <div
        className={classNames(
          'block--review__content',
          shouldLimitLines ? 'block--review__content--limit-5' : null,
        )}>
        {contentDisplay}
      </div>
      <div className={classNames('block--review__menus')}>
        <span>
          <span className={classNames('block--review__menus__score')}>
            {t('ui.score.likes')}
            &nbsp;
            <strong>{changedLikes}</strong>
          </span>
          <span className={classNames('block--review__menus__score')}>
            {t('ui.score.grade')}
            &nbsp;
            <strong>{getSingleScoreLabel(review.grade)}</strong>
          </span>
          <span className={classNames('block--review__menus__score')}>
            {t('ui.score.load')}
            &nbsp;
            <strong>{getSingleScoreLabel(review.load)}</strong>
          </span>
          <span className={classNames('block--review__menus__score')}>
            {t('ui.score.speech')}
            &nbsp;
            <strong>{getSingleScoreLabel(review.speech)}</strong>
          </span>
        </span>
        <span>
          {!changedIsLiked ? (
            <button
              className={classNames('text-button', 'text-button--review-block')}
              onClick={onLikeClick}>
              {t('ui.button.like')}
            </button>
          ) : (
            <button
              className={classNames(
                'text-button',
                'text-button--disabled',
                'text-button--review-block',
              )}>
              {t('ui.button.like')}
            </button>
          )}
          <button
            className={classNames('text-button', 'text-button--black', 'text-button--review-block')}
            onClick={onReportClick}>
            {t('ui.button.report')}
          </button>
        </span>
      </div>
    </RootTag>
  );
};

export default React.memo(ReviewBlock);
