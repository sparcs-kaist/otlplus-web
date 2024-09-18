import React, { Component } from 'react';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

import { reset as resetLectureFocus } from '../redux/actions/timetable/lectureFocus';
import { reset as resetList } from '../redux/actions/timetable/list';
import { reset as resetSearch } from '../redux/actions/timetable/search';
import { reset as resetSemester } from '../redux/actions/timetable/semester';
import {
  reset as resetTimetable,
  setSelectedTimetable,
  setIsTimetableTabsOpenOnMobile,
} from '../redux/actions/timetable/timetable';

import CloseButton from '../components/CloseButton';
import Divider from '../components/Divider';
import LectureDetailSection from '../components/sections/timetable/lecturedetail/LectureDetailSection';
import LectureListTabs from '../components/sections/timetable/lecturelist/LectureListTabs';
import LectureListSection from '../components/sections/timetable/lecturelist/LectureListSection';
import TimetableTabs from '../components/sections/timetable/timetableandinfos/TimetableTabs';
import SemesterSection from '../components/sections/timetable/semester/SemesterSection';
import TimetableSubSection from '../components/sections/timetable/timetableandinfos/TimetableSubSection';
import MapSubSection from '../components/sections/timetable/timetableandinfos/MapSubSection';
import SummarySubSection from '../components/sections/timetable/timetableandinfos/SummarySubSection';
import ExamSubSection from '../components/sections/timetable/timetableandinfos/ExamSubSection';
import ShareSubSection from '../components/sections/timetable/timetableandinfos/ShareSubSection';

import semesterShape from '../shapes/model/subject/SemesterShape';
import { myPseudoTimetableShape } from '../shapes/model/timetable/TimetableShape';
import userShape from '../shapes/model/session/UserShape';
import { parseQueryString } from '@/common/utils/parseQueryString';
import { Orientation } from '@/shapes/enum';

class TimetablePage extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { startInMyTable } = parseQueryString(this.props.location.search) || {};
    const { user, myTimetable, setSelectedTimetableDispatch } = this.props;

    if (startInMyTable && user) {
      setSelectedTimetableDispatch(myTimetable);
    }
  }

  componentWillUnmount() {
    const {
      resetLectureFocusDispatch,
      resetListDispatch,
      resetSearchDispatch,
      resetSemesterDispatch,
      resetTimetableDispatch,
    } = this.props;

    resetLectureFocusDispatch();
    resetListDispatch();
    resetSearchDispatch();
    resetSemesterDispatch();
    resetTimetableDispatch();
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { startSemester } = this.props.location.state || {};
    const {
      isPortrait,
      isTimetableTabsOpenOnMobile,
      isLectureListOpenOnMobile,
      setIsTimetableTabsOpenOnMobileDispatch,
    } = this.props;

    return (
      <>
        <section className={classNames('content', 'content--no-scroll')}>
          <div
            className={classNames(
              'page-grid',
              'page-grid--timetable',
              isLectureListOpenOnMobile ? 'page-grid--timetable--mobile-expanded' : null,
            )}>
            <LectureDetailSection />
            <LectureListTabs />
            <LectureListSection />
            <div
              className={classNames(
                'section',
                'section--semester-and-timetable-list',
                !isPortrait && 'section--transparent',
                isPortrait && 'section--modal',
                isTimetableTabsOpenOnMobile ? null : 'mobile-hidden',
              )}>
              <CloseButton onClick={() => setIsTimetableTabsOpenOnMobileDispatch(false)} />
              <TimetableTabs />
              <SemesterSection startSemester={startSemester} />
            </div>
            <div className={classNames('section', 'section--timetable-and-infos')}>
              <TimetableSubSection />
              <Divider
                orientation={{
                  desktop: Orientation.VERTICAL,
                  mobile: Orientation.HORIZONTAL,
                }}
                isVisible={true}
                gridArea="divider-main"
              />
              <MapSubSection />
              <Divider
                orientation={Orientation.HORIZONTAL}
                isVisible={{ desktop: true, mobile: false }}
                gridArea="divider-sub-1"
              />
              <SummarySubSection />
              <Divider
                orientation={Orientation.HORIZONTAL}
                isVisible={{ desktop: true, mobile: false }}
                gridArea="divider-sub-2"
              />
              <ExamSubSection />
              <Divider
                orientation={Orientation.HORIZONTAL}
                isVisible={{ desktop: true, mobile: !isLectureListOpenOnMobile }}
                gridArea="divider-sub-3"
              />
              <ShareSubSection />
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.common.user.user,
  isPortrait: state.common.media.isPortrait,
  myTimetable: state.timetable.timetable.myTimetable,
  isTimetableTabsOpenOnMobile: state.timetable.timetable.isTimetableTabsOpenOnMobile,
  isLectureListOpenOnMobile: state.timetable.list.isLectureListOpenOnMobile,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedTimetableDispatch: (timetable) => {
    dispatch(setSelectedTimetable(timetable));
  },
  resetLectureFocusDispatch: () => {
    dispatch(resetLectureFocus());
  },
  resetListDispatch: () => {
    dispatch(resetList());
  },
  resetSearchDispatch: () => {
    dispatch(resetSearch());
  },
  resetSemesterDispatch: () => {
    dispatch(resetSemester());
  },
  resetTimetableDispatch: () => {
    dispatch(resetTimetable());
  },
  setIsTimetableTabsOpenOnMobileDispatch: (isTimetableTabsOpenOnMobile) => {
    dispatch(setIsTimetableTabsOpenOnMobile(isTimetableTabsOpenOnMobile));
  },
});

TimetablePage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      startSemester: semesterShape,
      startInMyTable: PropTypes.bool,
    }),
  }).isRequired,

  user: userShape,
  isPortrait: PropTypes.bool.isRequired,
  myTimetable: myPseudoTimetableShape.isRequired,
  isTimetableTabsOpenOnMobile: PropTypes.bool.isRequired,
  isLectureListOpenOnMobile: PropTypes.bool.isRequired,

  setSelectedTimetableDispatch: PropTypes.func.isRequired,
  resetLectureFocusDispatch: PropTypes.func.isRequired,
  resetListDispatch: PropTypes.func.isRequired,
  resetSearchDispatch: PropTypes.func.isRequired,
  resetSemesterDispatch: PropTypes.func.isRequired,
  resetTimetableDispatch: PropTypes.func.isRequired,
  setIsTimetableTabsOpenOnMobileDispatch: PropTypes.func.isRequired,
};

const ClassComponent = connect(mapStateToProps, mapDispatchToProps)(TimetablePage);

const PlannerPageFC = () => {
  const location = useLocation();

  return <ClassComponent location={location} />;
};

export default PlannerPageFC;
