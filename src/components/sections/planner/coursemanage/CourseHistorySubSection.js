import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { range } from 'lodash';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';

import Scroller from '../../../Scroller';
import LectureGroupSimpleBlock from '../../../blocks/LectureGroupSimpleBlock';

import semesterShape from '../../../../shapes/model/subject/SemesterShape';
import itemFocusShape from '../../../../shapes/state/planner/ItemFocusShape';

class CourseHistorySubSection extends Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { itemFocus } = this.props;

    if (prevProps.itemFocus.lectures === null && itemFocus.lectures !== null) {
      const scrollTarget = this.scrollRef.current.querySelector('.ScrollbarsCustom-Scroller');
      scrollTarget.scrollLeft = scrollTarget.scrollWidth;
    }
  }

  render() {
    const { t } = this.props;
    const { semesters, itemFocus } = this.props;

    if (!itemFocus.course) {
      return null;
    }

    if (itemFocus.lectures === null) {
      return (
        <>
          <div className={classNames('small-title')}>{t('ui.title.courseHistory')}</div>
          <div ref={this.scrollRef}>
            <div className={classNames('list-placeholder', 'list-placeholder--history')}>
              <div>{t('ui.placeholder.loading')}</div>
            </div>
          </div>
        </>
      );
    }

    const semesterYears = semesters != null ? semesters.map((s) => s.year) : [];
    const lectureYears = itemFocus.lectures != null ? itemFocus.lectures.map((l) => l.year) : [];

    const getBlockOrPlaceholder = (year, semester) => {
      const filteredLectures = itemFocus.lectures.filter(
        (l) => l.year === year && l.semester === semester,
      );
      if (filteredLectures.length === 0) {
        return (
          <td className={classNames('history__cell--unopen')} key={`${year}-1`}>
            <div>{t('ui.others.notOffered')}</div>
          </td>
        );
      }
      return (
        <td key={`${year}-1`}>
          <LectureGroupSimpleBlock lectures={filteredLectures} />
        </td>
      );
    };

    const startYear = Math.min(...semesterYears, ...lectureYears);
    const endYear = Math.max(...semesterYears, ...lectureYears);
    const targetYears = range(startYear, endYear + 1);

    const specialLectures = itemFocus.lectures.filter(
      (l) => l[t('js.property.class_title')].length > 3,
    );
    const isSpecialLectureCourse = specialLectures.length / itemFocus.lectures.length > 0.3;

    return (
      <div className={classNames('subsection', 'subsection--course-history')}>
        <div className={classNames('small-title')}>{t('ui.title.courseHistory')}</div>
        <div ref={this.scrollRef}>
          <Scroller noScrollX={false} noScrollY={true}>
            <table
              className={classNames(
                'history',
                isSpecialLectureCourse ? 'history--special-lecture' : null,
              )}>
              <tbody>
                <tr>
                  <th>{t('ui.semester.spring')}</th>
                  {targetYears.map((y) => getBlockOrPlaceholder(y, 1))}
                </tr>
                <tr>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th />
                  {targetYears.map((y) => (
                    <td className={classNames('history__cell--year-label')} key={`${y}-l`}>
                      {y}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>{t('ui.semester.fall')}</th>
                  {targetYears.map((y) => getBlockOrPlaceholder(y, 3))}
                </tr>
              </tbody>
            </table>
          </Scroller>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  semesters: state.common.semester.semesters,
  itemFocus: state.planner.itemFocus,
});

const mapDispatchToProps = (dispatch) => ({});

CourseHistorySubSection.propTypes = {
  semesters: PropTypes.arrayOf(semesterShape),
  itemFocus: itemFocusShape.isRequired,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CourseHistorySubSection),
);
