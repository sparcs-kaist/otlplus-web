import React from 'react';
import ReactGA from 'react-ga4';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';

import Divider from '../../../Divider';
import Scroller from '../../../Scroller';
import LectureSimpleBlock from '../../../blocks/LectureSimpleBlock';

import { ReviewsFocusFrom, SemesterType } from '@/shapes/enum';
import { clearReviewsFocus, setReviewsFocus } from '../../../../actions/write-reviews/reviewsFocus';

import { unique } from '../../../../utils/commonUtils';
import { getSemesterName } from '../../../../utils/semesterUtils';

import Lecture from '@/shapes/model/subject/Lecture';
import { RootState } from './MySummarySubSection';

const TakenLecturesSubSection = () => {
  const { t } = useTranslation();
  const { user, selectedLecture } = useSelector((state: RootState) => ({
    user: state.common.user.user,
    selectedLecture: state.writeReviews.reviewsFocus.lecture,
  }));

  const dispatch = useDispatch();
  const setReviewsFocusDispatch = (from: ReviewsFocusFrom, lecture: Lecture | null) => {
    dispatch(setReviewsFocus(from, lecture));
  };
  const clearReviewsFocusDispatch = () => {
    dispatch(clearReviewsFocus());
  };

  const writableTakenLectures = user ? user.review_writable_lectures : [];

  const targetSemesters: { year: number; semester: SemesterType }[] = unique(
    writableTakenLectures.map((l) => ({ year: l.year, semester: l.semester })),
    (a: Lecture, b: Lecture) => a.year === b.year && a.semester === b.semester,
  ).sort((a: Lecture, b: Lecture) =>
    a.year !== b.year ? b.year - a.year : b.semester - a.semester,
  );

  const focusLectureWithClick = (lecture: Lecture) => {
    if (selectedLecture && lecture.id === selectedLecture.id) {
      clearReviewsFocusDispatch();

      ReactGA.event({
        category: 'Write Reviews - Selection',
        action: 'Selected Lecture',
        label: `Lecture : ${lecture.id}`,
      });
    } else {
      setReviewsFocusDispatch(ReviewsFocusFrom.LECTURE, lecture);

      ReactGA.event({
        category: 'Write Reviews - Selection',
        action: 'Unelected Lecture',
        label: `Lecture : ${lecture.id}`,
      });
    }
  };

  const getTakenLecturesArea = () => {
    if (!user) {
      return (
        <div className={classNames('list-placeholder')}>{t('ui.placeholder.loginRequired')}</div>
      );
    }
    if (targetSemesters.length === 0) {
      return <div className={classNames('list-placeholder')}>{t('ui.placeholder.noResults')}</div>;
    }
    return (
      <Scroller expandTop={12}>
        {targetSemesters.map((s, i) => (
          <React.Fragment key={`${s.year}-${s.semester}`}>
            {i !== 0 ? (
              <Divider orientation={Divider.Orientation.HORIZONTAL} isVisible={true} />
            ) : null}
            <div className={classNames('small-title')}>{`${s.year} ${getSemesterName(
              s.semester,
            )}`}</div>
            <div className={classNames('block-grid')}>
              {writableTakenLectures
                .filter((l) => l.year === s.year && l.semester === s.semester)
                .map((l) =>
                  !selectedLecture ? (
                    <LectureSimpleBlock
                      key={l.id}
                      lecture={l}
                      isRaised={false}
                      isDimmed={false}
                      hasReview={user.reviews.some((r) => r.lecture.id === l.id)}
                      onClick={focusLectureWithClick}
                    />
                  ) : (
                    <LectureSimpleBlock
                      key={l.id}
                      lecture={l}
                      isRaised={selectedLecture.id === l.id}
                      isDimmed={selectedLecture.id !== l.id}
                      hasReview={user.reviews.some((r) => r.lecture.id === l.id)}
                      onClick={focusLectureWithClick}
                    />
                  ),
                )}
            </div>
          </React.Fragment>
        ))}
      </Scroller>
    );
  };

  return (
    <div className={classNames('subsection', 'subsection--taken-lectures')}>
      {getTakenLecturesArea()}
    </div>
  );
};

export default React.memo(TakenLecturesSubSection);
