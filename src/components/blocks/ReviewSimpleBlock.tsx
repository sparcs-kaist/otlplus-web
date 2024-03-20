import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../../common/boundClassNames';
import { isSpecialLecture } from '../../utils/lectureUtils';
import { getSingleScoreLabel } from '../../utils/scoreUtils';
import { getSemesterName } from '../../utils/semesterUtils';
import { useTranslatedString } from '@/hooks/useTranslatedString';

import Review from '@/shapes/model/review/Review';
import BlockLink from '@/shapes/BlockLink';

interface Props {
  review: Review;
  linkTo?: BlockLink;
}

/**
 * TimeTable 페이지에서 사용되는 리뷰 블록입니다.
 * linkTo를 통해 해당 과목의 dictionary 페이지로 이동할 수 있습니다.
 */
const ReviewSimpleBlock: React.FC<Props> = ({ review, linkTo }) => {
  const RootTag = linkTo ? Link : 'div';
  const { t } = useTranslation();
  const translate = useTranslatedString();

  return (
    <RootTag
      to={linkTo ?? ''}
      className={classNames('block', 'block--review-simple')}
      target="_blank"
      rel="noopener noreferrer">
      <div>
        <span>{`${review.lecture.year} ${getSemesterName(review.lecture.semester)}`}</span>
        {isSpecialLecture(review.lecture) ? (
          <span>{translate(review.lecture, 'class_title')}</span>
        ) : null}
      </div>
      <div>{review.content}</div>
      <div>
        <span>
          {t('ui.score.likes')}
          &nbsp;
          <strong>{review.like}</strong>
        </span>
        <span>
          {t('ui.score.grade')}
          &nbsp;
          <strong>{getSingleScoreLabel(review.grade)}</strong>
        </span>
        <span>
          {t('ui.score.load')}
          &nbsp;
          <strong>{getSingleScoreLabel(review.load)}</strong>
        </span>
        <span>
          {t('ui.score.speech')}
          &nbsp;
          <strong>{getSingleScoreLabel(review.speech)}</strong>
        </span>
      </div>
    </RootTag>
  );
};

export default React.memo(ReviewSimpleBlock);
