import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ReactGA from 'react-ga4';

import { appBoundClassNames as classNames } from '../../common/boundClassNames';
import { getProfessorsShortStr } from '../../utils/lectureUtils';
import { getSingleScoreLabel } from '../../utils/scoreUtils';

import review from '@/shapes/model/review/review';
import link from '@/shapes/link';

import { formatNewlineToBr } from '../../utils/commonUtils';
import { getSemesterName } from '../../utils/semesterUtils';
import { CONTACT } from '../../common/constants';

interface ReviewBlockProps {
  review: review;
  shouldLimitLines: boolean;
  linkTo?: link;
  pageFrom: string;
}

const ReviewBlock: React.FC<ReviewBlockProps> = ({
  review,
  shouldLimitLines,
  linkTo,
  pageFrom,
}) => {
  const { i18n, t } = useTranslation();
  const [changedLikes, setChangedLikes] = useState(review.like);
  const [changedIsLiked, setChangedIsLiked] = useState(review.userspecific_is_liked);
  const onLikeClick = (e) => {
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
      .then((response) => {
        setChangedLikes(changedLikes + 1);
        setChangedIsLiked(true);
      })
      .catch((error) => {});

    ReactGA.event({
      category: 'Review',
      action: 'Liked Review',
      label: `Review : ${review.id} / From : Page : ${pageFrom}`,
    });
  };

  const onReportClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const info = i18n.t('ui.reportMail.body.infoTemplate', {
      lecture: review.lecture[t('js.property.title')],
      code: review.lecture.old_code,
      semester: getSemesterName(review.lecture.semester),
      prof: getProfessorsShortStr(review.lecture),
      content: review.content,
    });
    const mailSubject = `${t('ui.reportMail.subject')}`;

    const mailBody = [
      t('ui.reportMail.body.header'),
      t('ui.reportMail.divider'),
      t('ui.reportMail.extra_space'),
      t('ui.reportMail.divider'),
      t('ui.reportMail.body.footer'),
      info,
    ]
      .map((e) => encodeURI(e).replace(/\n/g, '%0D%0A'))
      .join('');

    const mailtoLink = `mailto:${CONTACT}?subject=${mailSubject}&body=${mailBody}`;

    window.location.href = mailtoLink;

    ReactGA.event({
      category: 'Review',
      action: 'Reported Review',
      label: `Review : ${review.id} / From : Page : ${pageFrom}`,
    });
  };

  const RootTag = linkTo ? Link : 'div';

  const contentDisplay = formatNewlineToBr(review.content);

  return (
    <RootTag className={classNames('block', 'block--review')} to={linkTo}>
      <div className={classNames('block--review__title')}>
        <strong>{review.lecture[t('js.property.title')]}</strong>
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
            onClick={onReportClick}
            className={classNames(
              'text-button',
              'text-button--black',
              'text-button--review-block',
            )}>
            {t('ui.button.report')}
          </button>
        </span>
      </div>
    </RootTag>
  );
};

export default React.memo(ReviewBlock);
