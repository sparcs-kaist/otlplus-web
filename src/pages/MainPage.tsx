import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ZaboEmbed } from 'zabo-embed';
import { appBoundClassNames as classNames } from '../common/boundClassNames';
import Footer from '../common/guideline/components/Footer';
import TodaysTimetableSection from '../components/sections/main/TodaysTimetableSection';
import AcademicScheduleSection from '../components/sections/main/AcademicScheduleSection';
import RelatedCourseFeedSection from '../components/sections/main/RelatedCourseFeedSection';
import LatestReviewSection from '../components/sections/main/LatestReviewSection';
import FamousMajorReviewFeedSection from '../components/sections/main/FamousMajorReviewFeedSection';
import FamousHumanityReviewFeedSection from '../components/sections/main/FamousHumanityReviewFeedSection';
import RankedReviewFeedSection from '../components/sections/main/RankedReviewFeedSection';
import ReviewWriteFeedSection from '../components/sections/main/ReviewWriteFeedSection';
import MainSearchSection from '../components/sections/main/MainSearchSection';
import NoticeSection from '../components/sections/main/NoticeSection';
import RateFeedSection from '../components/sections/main/RateFeedSection';
import { range, throttle } from 'lodash';
import { useFeed, useNotices } from '@/queries/main';
import { RootState } from '@/redux';

// TODO: Feed 의 타입은 이후에 API 타입 패키지로 바꿀 예정
// TODO: 추후 스크롤 감지 interserct observer 로 바꾸기

const MainPage: React.FC = () => {
  const { t } = useTranslation();

  const contentRef = useRef<HTMLDivElement | null>(null);
  const { user } = useSelector((state: RootState) => state.common.user);
  const { isPortrait } = useSelector((state: RootState) => state.common.media);

  const COLUMN_NUM = isPortrait ? 1 : 3;
  const SCROLL_WAIT_TIME = 2000;

  const { data: notices } = useNotices();
  const { data: feedDays, isFetchingNextPage, fetchNextPage } = useFeed(user);

  const handleScroll = throttle(() => {
    if (!user || !contentRef.current) return;
    const SCROLL_BOTTOM_PADDING = 100;
    const columns = Array.from(
      contentRef.current.querySelectorAll(`.${classNames('page-grid--main')} > div`),
    );

    const isBottomReached = columns.some(
      (column) =>
        column.lastChild &&
        column.lastChild.getBoundingClientRect().top < window.innerHeight + SCROLL_BOTTOM_PADDING,
    );

    if (isBottomReached && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, SCROLL_WAIT_TIME);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user]);

  const mapFeedToSection = (feed: any, date: any) => {
    switch (feed.type) {
      case 'REVIEW_WRITE':
        return (
          <ReviewWriteFeedSection
            lecture={feed.lecture}
            review={user?.reviews.find((r: any) => r.lecture.id === feed.lecture.id)}
            key={`${date}-${feed.type}-${feed.lecture.id}`}
          />
        );
      case 'RELATED_COURSE':
        return (
          <RelatedCourseFeedSection
            course={feed.course}
            key={`${date}-${feed.type}-${feed.course.id}`}
          />
        );
      case 'FAMOUS_MAJOR_REVIEW':
        return (
          <FamousMajorReviewFeedSection
            department={feed.department}
            reviews={feed.reviews}
            key={`${date}-${feed.type}-${feed.department.code}`}
          />
        );
      case 'FAMOUS_HUMANITY_REVIEW':
        return (
          <FamousHumanityReviewFeedSection reviews={feed.reviews} key={`${date}-${feed.type}`} />
        );
      case 'RANKED_REVIEW':
        return (
          <RankedReviewFeedSection
            semester={feed.semester}
            reviews={feed.reviews}
            key={`${date}-${feed.type}`}
          />
        );
      case 'RATE':
        return <RateFeedSection rated={feed.rated} key={`${date}-${feed.type}`} />;
      default:
        return null;
    }
  };

  const feeds = [
    <TodaysTimetableSection key="TODAYS_TIMETABLE" />,
    <AcademicScheduleSection key="ACADEMIC_SCHEDULE" />,
    <ZaboEmbed key="ZABO_EMBED" serviceColor="#E54C65" style={{ marginBottom: 12 }} />,
    notices &&
      notices.map((n: any) => (
        <NoticeSection notice={n} key={`${n.start_date}-${n.end_date}-${n.title}`} />
      )),
    <LatestReviewSection key="LATEST_REVIEW" />,
    user &&
      feedDays?.pages.map((page, index) =>
        page.map((feed) => mapFeedToSection(feed, feedDays.pageParams[index])),
      ),
  ].flat();

  return (
    <>
      <section className={classNames('main-image')}>
        <MainSearchSection />
      </section>
      <section className={classNames('content')} ref={contentRef}>
        <div className={classNames('page-grid', 'page-grid--main')}>
          {range(COLUMN_NUM).map((i) => (
            <div
              style={{
                gridArea: `feeds-column-${i + 1}`,
                position: 'relative',
                overflow: 'initial',
                minWidth: 0,
              }}
              key={i}>
              {feeds.filter((_, feedIndex) => feedIndex % COLUMN_NUM === i)}
              <div style={{ position: 'absolute', width: '100%' }}>
                {range(10).map((j) => (
                  <div className={classNames('section', 'section--feed--placeholder')} key={j} />
                ))}
              </div>
            </div>
          ))}
          <div className={classNames('main-date')}>
            {user ? (
              <span onClick={() => fetchNextPage()}>
                {isFetchingNextPage ? t('ui.placeholder.loading') : t('ui.button.loadMore')}
              </span>
            ) : (
              <>
                <a href={`/session/login/?next=${window.location.href}`}>
                  {t('ui.button.signInWithSso')}
                </a>
                <div>{t('ui.message.signInForMore')}</div>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MainPage;
