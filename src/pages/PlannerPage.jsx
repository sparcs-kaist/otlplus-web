import React, { Component } from 'react';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

import { reset as resetCourseFocus } from '../redux/actions/planner/itemFocus';
import { reset as resetList } from '../redux/actions/planner/list';
import { reset as resetSearch } from '../redux/actions/planner/search';
import { reset as resetPlanner } from '../redux/actions/planner/planner';

import plannerShape from '../shapes/model/planner/PlannerShape';

import Divider from '../components/Divider';
import PlannerTabs from '../components/sections/planner/plannerandinfos/PlannerTabs';
import PlannerSubSection from '../components/sections/planner/plannerandinfos/PlannerSubSection';
import CourseListTabs from '../components/sections/planner/courselist/CourseListTabs';
import CourseListSection from '../components/sections/planner/courselist/CourseListSection';
import CourseManageSection from '../components/sections/planner/coursemanage/CourseManageSection';
import TrackSubSection from '../components/sections/planner/plannerandinfos/TrackSubSection';
import SummarySubSection from '../components/sections/planner/plannerandinfos/SummarySubSection';
// import ShareSubSection from '../components/sections/planner/plannerandinfos/ShareSubSection';
import TrackSettingsSection from '../components/sections/planner/TrackSettingsSection';
import BetaPopup from '../components/BetaPopup';
import { Orientation } from '@/shapes/enum';

class PlannerPage extends Component {
  componentWillUnmount() {
    const {
      resetCourseFocusDispatch,
      resetListDispatch,
      resetSearchDispatch,
      resetPlannerDispatch,
    } = this.props;

    resetCourseFocusDispatch();
    resetListDispatch();
    resetSearchDispatch();
    resetPlannerDispatch();
  }

  render() {
    const { isTrackSettingsSectionOpen, selectedPlanner } = this.props;

    return (
      <>
        <section className={classNames('content', 'content--no-scroll')}>
          <div className={classNames('page-grid', 'page-grid--planner')}>
            <PlannerTabs />
            <CourseListTabs />
            <div className={classNames('section', 'section--planner-and-infos')}>
              <PlannerSubSection />
              <Divider
                orientation={{
                  desktop: Orientation.VERTICAL,
                  mobile: Orientation.HORIZONTAL,
                }}
                isVisible={{
                  desktop: true,
                  mobile: false,
                }}
                gridArea="divider-main"
              />
              <TrackSubSection />
              <Divider
                orientation={Orientation.HORIZONTAL}
                isVisible={{
                  desktop: true,
                  mobile: false,
                }}
                gridArea="divider-sub-1"
              />
              <SummarySubSection />
              {/* TODO: Implement ShareSubSection */}
              {/* <Divider
                orientation={Orientation.HORIZONTAL}
                isVisible={{
                  desktop: true,
                  mobile: false,
                }}
                gridArea="divider-sub-2"
              />
              <ShareSubSection /> */}
            </div>
            <CourseListSection />
            <CourseManageSection />
            {isTrackSettingsSectionOpen && selectedPlanner && <TrackSettingsSection />}
          </div>
          <BetaPopup
            title="졸업플래너 베타 서비스 안내"
            content={[
              '졸업플레너 서비스는 현재 베타 상태입니다.',
              '일부 학점 계산이 정확하지 않거나 기능 사용이 불편할 수 있으며, 이는 정식 출시 때 개선될 예정입니다.',
            ]}
            link="https://sparcs.page.link/otl-feedback"
          />
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isTrackSettingsSectionOpen: state.planner.planner.isTrackSettingsSectionOpen,
  selectedPlanner: state.planner.planner.selectedPlanner,
});

const mapDispatchToProps = (dispatch) => ({
  resetCourseFocusDispatch: () => {
    dispatch(resetCourseFocus());
  },
  resetListDispatch: () => {
    dispatch(resetList());
  },
  resetSearchDispatch: () => {
    dispatch(resetSearch());
  },
  resetPlannerDispatch: () => {
    dispatch(resetPlanner());
  },
});

PlannerPage.propTypes = {
  isTrackSettingsSectionOpen: PropTypes.bool.isRequired,
  selectedPlanner: plannerShape,

  resetCourseFocusDispatch: PropTypes.func.isRequired,
  resetListDispatch: PropTypes.func.isRequired,
  resetSearchDispatch: PropTypes.func.isRequired,
  resetPlannerDispatch: PropTypes.func.isRequired,
};

const ClassComponent = connect(mapStateToProps, mapDispatchToProps)(PlannerPage);

const PlannerPageFC = () => {
  const location = useLocation();

  return <ClassComponent location={location} />;
};

export default PlannerPageFC;
