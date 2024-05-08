import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import qs from 'qs';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';
import { getAverageScoreLabel } from '../../../../utils/scoreUtils';

import Scroller from '../../../Scroller';
import CloseButton from '../../../CloseButton';
import ReviewSimpleBlock from '../../../blocks/ReviewSimpleBlock';

import { clearLectureFocus, setReviews } from '../../../../actions/timetable/lectureFocus';
import { addLectureToCart, deleteLectureFromCart } from '../../../../actions/timetable/list';
import {
  addLectureToTimetable,
  removeLectureFromTimetable,
} from '../../../../actions/timetable/timetable';

import { LectureFocusFrom } from '@/shapes/enum';
import { LectureListCode } from '@/shapes/enum';

import {
  inTimetable,
  inCart,
  getProfessorsFullStr,
  getClassroomStr,
  getExamFullStr,
  getSyllabusUrl,
} from '../../../../utils/lectureUtils';
import {
  performAddToTable,
  performDeleteFromTable,
  performAddToCart,
  performDeleteFromCart,
} from '../../../../common/commonOperations';

import Divider from '../../../Divider';
import OtlplusPlaceholder from '../../../OtlplusPlaceholder';
import Attributes from '../../../Attributes';
import Scores from '../../../Scores';
import Review from '@/shapes/model/review/Review';
import Lecture from '@/shapes/model/subject/Lecture';

const LectureDetailSection = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [shouldShowCloseDict, setShouldShowCloseDict] = useState(false);
  const [isReviewLoading, setIsReviewLoading] = useState(false); // <-- 이거 이름 isFetching  이런 걸로 바꾸는 건 어떤지..
  const openDictRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    user,
    isPortrait,
    lectureFocus,
    selectedListCode,
    selectedTimetable,
    lists,
    year,
    semester,
  } = useSelector((state) => ({
    user: state.common.user.user,
    isPortrait: state.common.media.isPortrait,
    lectureFocus: state.timetable.lectureFocus,
    selectedListCode: state.timetable.list.selectedListCode,
    selectedTimetable: state.timetable.timetable.selectedTimetable,
    lists: state.timetable.list.lists,
    year: state.timetable.semester.year,
    semester: state.timetable.semester.semester,
  }));
  const clearLectureFocusDispatch = () => dispatch(clearLectureFocus());
  const setReviewsDispatch = (reviews: Review[]) => dispatch(setReviews(reviews));
  const addLectureToTimetableDispatch = (lecture: Lecture) =>
    dispatch(addLectureToTimetable(lecture));
  const removeLectureFromTimetableDispatch = (lecture: Lecture) =>
    dispatch(removeLectureFromTimetable(lecture));
  const addLectureToCartDispatch = (lecture: Lecture) => dispatch(addLectureToCart(lecture));
  const deleteLectureFromCartDispatch = (lecture: Lecture) =>
    dispatch(deleteLectureFromCart(lecture));

  // lecture Focus state 업데이트 -> review 받아오는 api 호출  -> api 결과 받은뒤 Review state 업데이트
  useEffect(() => {
    // 렉처를 언호버했거나, 이미 진행 중인 리뷰 로딩이 있을 때는 리뷰를 로딩하지 않는다.
    if (!lectureFocus.lecture || isReviewLoading) {
      // console.log(`진행중인 요청이 있잖아! ${isReviewLoading} `);
      return;
    }
    // console.log(`리뷰 로딩 시작! ${lectureFocus.lecture}`);
    if (!isPortrait) {
      lectureFocus.clicked ? openDictPreview() : closeDictPreview();
    }
    _checkAndLoadReviews();
  }, [lectureFocus.lecture, isPortrait, lectureFocus.clicked]);

  useEffect(() => {
    if (lectureFocus.from === LectureFocusFrom.LIST && selectedListCode) {
      // console.log("리스트 이동, focus 해제")
      clearLectureFocusDispatch();
    } else if (lectureFocus.from === LectureFocusFrom.TABLE && selectedTimetable.id) {
      // console.log("테이블 이동, focus 해제")
      clearLectureFocusDispatch();
    }
    if (year && semester) {
      // console.log("학기 정보 변경, focus 해제 ")
      clearLectureFocusDispatch();
    }
  }, [selectedListCode, selectedTimetable, year, semester]);

  const openDictPreview = () => {
    if (scrollRef.current == null || openDictRef.current == null) {
      return;
    }
    const scrollTop =
      openDictRef.current.getBoundingClientRect().top -
      scrollRef.current.querySelector('.ScrollbarsCustom-Content').getBoundingClientRect().top +
      1;
    scrollRef.current.querySelector('.ScrollbarsCustom-Scroller').scrollTop = scrollTop;
  };

  const closeDictPreview = () => {
    if (scrollRef.current == null || openDictRef.current == null) {
      return;
    }
    if (scrollRef.current) {
      scrollRef.current.querySelector('.ScrollbarsCustom-Scroller').scrollTop = 0;
    }
  };

  const unfix = () => {
    clearLectureFocusDispatch();
  };

  const addToTable = (event: React.MouseEvent) => {
    event.stopPropagation();

    const labelOfTabs = new Map([
      [LectureListCode.SEARCH, 'Search'],
      [LectureListCode.BASIC, 'Basic'],
      [LectureListCode.HUMANITY, 'Humanity'],
      [LectureListCode.CART, 'Cart'],
    ]);
    const fromString =
      lectureFocus.from === LectureFocusFrom.TABLE
        ? 'Timetable'
        : lectureFocus.from === LectureFocusFrom.LIST
        ? `Lecture List : ${labelOfTabs.get(selectedListCode) || selectedListCode}`
        : 'Unknown';
    const beforeRequest = () => {};
    const afterResponse = () => {
      // const newProps = this.props;
      // if (!newProps.selectedTimetable || newProps.selectedTimetable.id !== selectedTimetable.id) {
      //   return;
      // }
      // TODO: Fix timetable not updated when semester unchanged and timetable changed
      addLectureToTimetableDispatch(lectureFocus.lecture);
    };
    performAddToTable(
      lectureFocus.lecture,
      selectedTimetable,
      user,
      fromString,
      beforeRequest,
      afterResponse,
    );
  };

  const deleteFromTable = (event: React.MouseEvent) => {
    event.stopPropagation();

    const labelOfTabs = new Map([
      [LectureListCode.SEARCH, 'Search'],
      [LectureListCode.BASIC, 'Basic'],
      [LectureListCode.HUMANITY, 'Humanity'],
      [LectureListCode.CART, 'Cart'],
    ]);
    const fromString =
      lectureFocus.from === LectureFocusFrom.TABLE
        ? 'Timetable'
        : lectureFocus.from === LectureFocusFrom.LIST
        ? `Lecture List : ${labelOfTabs.get(selectedListCode) || selectedListCode}`
        : 'Unknown';
    const beforeRequest = () => {};
    const afterResponse = () => {
      // const newProps = this.props;
      // if (!newProps.selectedTimetable || newProps.selectedTimetable.id !== selectedTimetable.id) {
      //   // console.log("타임테이블이 바뀌었거나, 현재 selectedTimeTable이 없을 경우, ")
      //   return;
      // }
      // TODO: Fix timetable not updated when semester unchanged and timetable changed
      removeLectureFromTimetableDispatch(lectureFocus.lecture);
    };
    performDeleteFromTable(
      lectureFocus.lecture,
      selectedTimetable,
      user,
      fromString,
      beforeRequest,
      afterResponse,
    );
  };

  const addToCart = (event: React.MouseEvent) => {
    event.stopPropagation();

    const labelOfTabs = new Map([
      [LectureListCode.SEARCH, 'Search'],
      [LectureListCode.BASIC, 'Basic'],
      [LectureListCode.HUMANITY, 'Humanity'],
      [LectureListCode.CART, 'Cart'],
    ]);
    const fromString =
      lectureFocus.from === LectureFocusFrom.TABLE
        ? 'Timetable'
        : lectureFocus.from === LectureFocusFrom.LIST
        ? `Lecture List : ${labelOfTabs.get(selectedListCode) || selectedListCode}`
        : 'Unknown';
    const beforeRequest = () => {};
    const afterResponse = () => {
      // const newProps = this.props;
      // if (newProps.year !== year || newProps.semester !== semester) {
      //   return;
      // }
      addLectureToCartDispatch(lectureFocus.lecture);
    };
    performAddToCart(lectureFocus.lecture, user, fromString, beforeRequest, afterResponse);
  };

  const deleteFromCart = (event: React.MouseEvent) => {
    event.stopPropagation();

    const labelOfTabs = new Map([
      [LectureListCode.SEARCH, 'Search'],
      [LectureListCode.BASIC, 'Basic'],
      [LectureListCode.HUMANITY, 'Humanity'],
      [LectureListCode.CART, 'Cart'],
    ]);
    const fromString =
      lectureFocus.from === LectureFocusFrom.TABLE
        ? 'Timetable'
        : lectureFocus.from === LectureFocusFrom.LIST
        ? `Lecture List : ${labelOfTabs.get(selectedListCode) || selectedListCode}`
        : 'Unknown';
    const beforeRequest = () => {};
    const afterResponse = () => {
      // const newProps = this.props;
      // if (newProps.year !== year || newProps.semester !== semester) {
      //   return;
      // }
      deleteLectureFromCartDispatch(lectureFocus.lecture);
    };
    performDeleteFromCart(lectureFocus.lecture, user, fromString, beforeRequest, afterResponse);
  };

  const onScroll = () => {
    _updateDictButton();
    _checkAndLoadReviews();
  };

  const _updateDictButton = () => {
    const openDictElement = openDictRef.current;
    const scrollElement = openDictElement?.closest('.ScrollbarsCustom-Scroller');

    if (!scrollElement || !openDictElement) {
      return;
    }

    const topOffset =
      openDictElement.getBoundingClientRect().top - scrollElement.getBoundingClientRect().top;
    if (topOffset < 1.0) {
      // TODO: Change handing method for errors of 0.x differnce
      setShouldShowCloseDict(true);
    } else {
      setShouldShowCloseDict(false);
    }
  };

  const _checkAndLoadReviews = async () => {
    const LIMIT = 100;
    if (isReviewLoading || lectureFocus.reviews !== null) {
      return;
    }

    const openDictElement = openDictRef.current;
    const scrollElement = openDictElement.closest('.ScrollbarsCustom-Scroller');

    const bottomSpace =
      scrollElement.getBoundingClientRect().bottom - openDictElement.getBoundingClientRect().bottom;

    if (bottomSpace < 12 + 1) {
      return;
    }

    setIsReviewLoading(true);

    await axios
      .get(`/api/lectures/${lectureFocus.lecture.id}/related-reviews`, {
        params: {
          order: ['-written_datetime', '-id'],
          limit: LIMIT,
        },
        metadata: {
          gaCategory: 'Lecture',
          gaVariable: 'GET Related Reviews / Instance',
        },
      })
      .then((response) => {
        // const newProps = this.props;
        // if (newProps.lectureFocus.lecture.id !== lectureFocus.lecture.id) {
        //   return;
        // }
        if (response.data === LIMIT) {
          // TODO: handle limit overflow
        }
        setReviewsDispatch(response.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsReviewLoading(false);
      });
  };

  const isSingleFocus =
    lectureFocus.from === LectureFocusFrom.LIST || lectureFocus.from === LectureFocusFrom.TABLE;
  const shouldShowUnfix = isSingleFocus && lectureFocus.clicked;

  const mapReviewToBlock = (review: Review, index: number) => (
    <ReviewSimpleBlock
      key={`review_${index}`}
      review={review}
      linkTo={{
        pathname: '/dictionary',
        search: qs.stringify({ startCourseId: review.course.id }),
      }}
    />
  );

  const getSectionContent = () => {
    if (isSingleFocus) {
      const reviewBlocks =
        lectureFocus.reviews == null ? (
          <div className={classNames('list-placeholder', 'min-height-area')}>
            <div>{t('ui.placeholder.loading')}</div>
          </div>
        ) : lectureFocus.reviews.length ? (
          <div className={classNames('block-list', 'min-height-area')}>
            {lectureFocus.reviews.map(mapReviewToBlock)}
          </div>
        ) : (
          <div className={classNames('list-placeholder', 'min-height-area')}>
            <div>{t('ui.placeholder.noResults')}</div>
          </div>
        );
      return (
        <>
          <CloseButton onClick={unfix} />
          <div className={classNames('detail-title-area')}>
            <div className={classNames('title')}>
              {lectureFocus.lecture[t('js.property.title')]}
            </div>
            <div className={classNames('subtitle')}>
              {lectureFocus.lecture.old_code}
              {lectureFocus.lecture.class_no.length ? ` (${lectureFocus.lecture.class_no})` : ''}
            </div>
            <div className={classNames('buttons')}>
              <button
                onClick={unfix}
                className={classNames(
                  'text-button',
                  shouldShowUnfix ? null : 'text-button--disabled',
                )}>
                {t('ui.button.unfix')}
              </button>
              <a
                className={classNames('text-button', 'text-button--right')}
                href={getSyllabusUrl(lectureFocus.lecture)}
                target="_blank"
                rel="noopener noreferrer">
                {t('ui.button.syllabus')}
              </a>
              <Link
                className={classNames('text-button', 'text-button--right')}
                to={{
                  pathname: '/dictionary',
                  search: qs.stringify({ startCourseId: lectureFocus.lecture.course }),
                }}
                target="_blank"
                rel="noopener noreferrer">
                {t('ui.button.dictionary')}
              </Link>
            </div>
          </div>
          <Scroller onScroll={onScroll} key={lectureFocus.lecture.id}>
            <Attributes
              entries={[
                {
                  name: t('ui.attribute.type'),
                  info: lectureFocus.lecture[t('js.property.type')],
                },
                {
                  name: t('ui.attribute.department'),
                  info: lectureFocus.lecture[t('js.property.department_name')],
                },
                {
                  name: t('ui.attribute.professors'),
                  info: getProfessorsFullStr(lectureFocus.lecture),
                },
                {
                  name: t('ui.attribute.classroom'),
                  info: getClassroomStr(lectureFocus.lecture),
                },
                { name: t('ui.attribute.limit'), info: lectureFocus.lecture.limit },
                { name: t('ui.attribute.exam'), info: getExamFullStr(lectureFocus.lecture) },
              ]}
              fixedWidthName
            />
            <Scores
              entries={[
                {
                  name: t('ui.score.language'),
                  score: lectureFocus.lecture.is_english ? 'Eng' : '한',
                },
                {
                  name: lectureFocus.lecture.credit > 0 ? t('ui.score.credit') : 'AU',
                  score:
                    lectureFocus.lecture.credit > 0
                      ? lectureFocus.lecture.credit
                      : lectureFocus.lecture.credit_au,
                },
                {
                  name: t('ui.score.competition'),
                  score:
                    lectureFocus.lecture.limit === 0
                      ? '0.0:1'
                      : `${(lectureFocus.lecture.num_people / lectureFocus.lecture.limit)
                          .toFixed(1)
                          .toString()}:1`,
                },
              ]}
            />
            <Scores
              entries={[
                {
                  name: t('ui.score.grade'),
                  score: getAverageScoreLabel(lectureFocus.lecture.grade),
                },
                {
                  name: t('ui.score.load'),
                  score: getAverageScoreLabel(lectureFocus.lecture.load),
                },
                {
                  name: t('ui.score.speech'),
                  score: getAverageScoreLabel(lectureFocus.lecture.speech),
                },
              ]}
            />
            {shouldShowCloseDict ? (
              <button
                className={classNames('small-title', 'top-sticky')}
                onClick={closeDictPreview}
                ref={openDictRef}>
                <span>{t('ui.title.reviews')}</span>
                <i className={classNames('icon', 'icon--lecture-uparrow')} />
              </button>
            ) : (
              <button
                className={classNames('small-title', 'top-sticky')}
                onClick={openDictPreview}
                ref={openDictRef}>
                <span>{t('ui.title.reviews')}</span>
                <i className={classNames('icon', 'icon--lecture-downarrow')} />
              </button>
            )}
            {reviewBlocks}
          </Scroller>
          <Divider
            orientation={Divider.Orientation.HORIZONTAL}
            isVisible={{ desktop: false, mobile: true }}
          />
          <div
            className={classNames('subsection--lecture-detail__mobile-buttons', 'desktop-hidden')}>
            {!inCart(lectureFocus.lecture, lists[LectureListCode.CART]) ? (
              <button
                className={classNames('text-button', 'text-button--black')}
                onClick={addToCart}>
                <i className={classNames('icon', 'icon--add-cart')} />
                <span>{t('ui.button.addToWishlist')}</span>
              </button>
            ) : (
              <button
                className={classNames('text-button', 'text-button--black')}
                onClick={deleteFromCart}>
                <i className={classNames('icon', 'icon--delete-cart')} />
                <span>{t('ui.button.deleteFromWishlist')}</span>
              </button>
            )}
            {selectedTimetable && !selectedTimetable.isReadOnly ? (
              !inTimetable(lectureFocus.lecture, selectedTimetable) ? (
                <button
                  className={classNames('text-button', 'text-button--black')}
                  onClick={addToTable}>
                  <i className={classNames('icon', 'icon--add-lecture')} />
                  <span>{t('ui.button.addToTable')}</span>
                </button>
              ) : (
                <button
                  className={classNames('text-button', 'text-button--black')}
                  onClick={deleteFromTable}>
                  <i className={classNames('icon', 'icon--delete-from-table')} />
                  <span>{t('ui.button.deleteFromTable')}</span>
                </button>
              )
            ) : !inTimetable(lectureFocus.lecture, selectedTimetable) ? (
              <button
                className={classNames(
                  'text-button',
                  'text-button--black',
                  'text-button--disabled',
                )}>
                <i className={classNames('icon', 'icon--add-lecture')} />
                <span>{t('ui.button.addToTable')}</span>
              </button>
            ) : (
              <button
                className={classNames(
                  'text-button',
                  'text-button--black',
                  'text-button--disabled',
                )}>
                <i className={classNames('icon', 'icon--delete-from-table')} />
                <span>{t('ui.button.deleteFromTable')}</span>
              </button>
            )}
          </div>
        </>
      );
    }
    if (lectureFocus.from === LectureFocusFrom.MULTIPLE) {
      return (
        <>
          <div className={classNames('detail-title-area')}>
            <div className={classNames('title')}>{lectureFocus.multipleTitle}</div>
            <div className={classNames('subtitle')}>
              {t('ui.others.multipleDetailCount', { count: lectureFocus.multipleDetails.length })}
            </div>
            <div className={classNames('buttons')}>
              <span className={classNames('text-button', 'text-button--disabled')}>
                {t('ui.button.unfix')}
              </span>
              <span
                className={classNames(
                  'text-button',
                  'text-button--right',
                  'text-button--disabled',
                )}>
                {t('ui.button.syllabus')}
              </span>
              <span
                className={classNames(
                  'text-button',
                  'text-button--right',
                  'text-button--disabled',
                )}>
                {t('ui.button.dictionary')}
              </span>
            </div>
          </div>
          <Attributes
            entries={lectureFocus.multipleDetails.map((d) => ({ name: d.name, info: d.info }))}
            longName
          />
        </>
      );
    }
    return <OtlplusPlaceholder />;
  };

  return (
    <div
      className={classNames(
        'section',
        'section--lecture-detail',
        isPortrait && 'section--modal',
        lectureFocus.clicked ? null : 'mobile-hidden',
      )}>
      <div
        className={classNames('subsection', 'subsection--lecture-detail', 'subsection--flex')}
        ref={scrollRef}>
        {getSectionContent()}
      </div>
    </div>
  );
};

export default React.memo(LectureDetailSection);
