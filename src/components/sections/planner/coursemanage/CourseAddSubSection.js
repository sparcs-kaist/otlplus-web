import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import { range } from 'lodash';
import PropTypes from 'prop-types';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';
import Scroller from '../../../Scroller';

import userShape from '../../../../shapes/model/session/UserShape';
import semesterShape from '../../../../shapes/model/subject/SemesterShape';
import plannerShape from '../../../../shapes/model/planner/PlannerShape';
import itemFocusShape from '../../../../shapes/state/planner/ItemFocusShape';

import { getSemesterName, getTimetableSemester } from '../../../../utils/semesterUtils';
import Attributes from '../../../Attributes';
import { addItemToPlanner, updateItemInPlanner } from '../../../../actions/planner/planner';
import { ItemFocusFrom } from '../../../../reducers/planner/itemFocus';
import { setItemFocus } from '../../../../actions/planner/itemFocus';

import {
  performAddArbitraryToPlanner,
  performAddToPlanner,
} from '../../../../common/commonOperations';

class CourseCustomizeSubSection extends Component {
  _createRandomItemId = () => {
    return Math.floor(Math.random() * 100000000);
  };

  addCourseToPlanner = (course, year, semester) => {
    const {
      user,
      selectedPlanner,
      addItemToPlannerDispatch,
      setItemFocusDispatch,
      updateItemInPlannerDispatch,
    } = this.props;

    const beforeRequest = () => {};
    const afterResponse = (item, duplicateTakenItems) => {
      addItemToPlannerDispatch(item);
      setItemFocusDispatch(item, course, ItemFocusFrom.TABLE_FUTURE, true);
      duplicateTakenItems.forEach((ti) => {
        if (!user) {
          const newItem = {
            ...ti,
            is_excluded: true,
          };
          updateItemInPlannerDispatch(newItem);
        } else {
          axios
            .post(`/api/users/${user.id}/planners/${selectedPlanner.id}/update-item`, {
              item: ti.id,
              item_type: ti.item_type,
              is_excluded: true,
            })
            .then((response) => {
              const newProps = this.props;
              if (!newProps.selectedPlanner || newProps.selectedPlanner.id !== selectedPlanner.id) {
                return;
              }
              updateItemInPlannerDispatch(response.data);
            })
            .catch((error) => {});
        }
      });
    };
    performAddToPlanner(
      course,
      year,
      semester,
      selectedPlanner,
      user,
      '',
      beforeRequest,
      afterResponse,
    );
  };

  addArbitraryCourseToPlanner = (course, year, semester) => {
    const { user, selectedPlanner, addItemToPlannerDispatch, setItemFocusDispatch } = this.props;

    const beforeRequest = () => {};
    const afterResponse = (item) => {
      const newProps = this.props;
      if (!newProps.selectedPlanner || newProps.selectedPlanner.id !== selectedPlanner.id) {
        return;
      }
      addItemToPlannerDispatch(item);
      setItemFocusDispatch(item, course, ItemFocusFrom.TABLE_ARBITRARY, true);
    };
    performAddArbitraryToPlanner(
      course,
      year,
      semester,
      selectedPlanner,
      user,
      '',
      beforeRequest,
      afterResponse,
    );
  };

  render() {
    const { t, selectedPlanner, itemFocus, semesters } = this.props;

    if (!selectedPlanner) {
      return null;
    }

    const plannerYears = range(selectedPlanner.start_year, selectedPlanner.end_year + 1);

    const firstEditableSemester = getTimetableSemester(semesters);
    const isEditable = (year, semester) =>
      year > firstEditableSemester.year ||
      (year === firstEditableSemester.year && semester > firstEditableSemester.semester);

    const sectionHead = (
      <>
        <div className={classNames('detail-title-area')}>
          <div className={classNames('title')}>{t('ui.title.lectureInformation')}</div>
          <div className={classNames('subtitle')}>수강 예정 추가</div>
          <div className={classNames('buttons')}>&nbsp;</div>
        </div>
      </>
    );
    const sectionBody = (
      <>
        <Scroller>
          <Attributes
            entries={plannerYears
              .map((y) =>
                [1, 3].map((s) => ({
                  name: `${y} ${getSemesterName(s)}`,
                  info: '추가하기',
                  onInfoClick: !itemFocus.course.isArbitrary
                    ? () => this.addCourseToPlanner(itemFocus.course, y, s)
                    : () => this.addArbitraryCourseToPlanner(itemFocus.course, y, s),
                  isInfoClickDisabled: !isEditable(y, s),
                })),
              )
              .flat()}
            fixedWidthName
          />
          <div className={classNames('caption')} style={{ marginTop: 8 }}>
            Beta UI:
            <br />본 UI는 완성되지 않은 임시 UI로, 추후 다른 UI로 대체될 예정입니다.
          </div>
        </Scroller>
      </>
    );

    return (
      <div className={classNames('subsection', 'subsection--course-manage-right')}>
        {sectionHead}
        {sectionBody}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.common.user.user,
  semesters: state.common.semester.semesters,
  selectedPlanner: state.planner.planner.selectedPlanner,
  itemFocus: state.planner.itemFocus,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToPlannerDispatch: (item) => {
    dispatch(addItemToPlanner(item));
  },
  setItemFocusDispatch: (item, course, from, clicked) => {
    dispatch(setItemFocus(item, course, from, clicked));
  },
  updateItemInPlannerDispatch: (item) => {
    dispatch(updateItemInPlanner(item));
  },
});

CourseCustomizeSubSection.propTypes = {
  user: userShape,
  semesters: PropTypes.arrayOf(semesterShape),
  selectedPlanner: plannerShape,
  itemFocus: itemFocusShape,

  addItemToPlannerDispatch: PropTypes.func.isRequired,
  setItemFocusDispatch: PropTypes.func.isRequired,
  updateItemInPlannerDispatch: PropTypes.func.isRequired,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CourseCustomizeSubSection),
);
