import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { range } from 'lodash';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';

import Scroller from '../../../Scroller';
import LectureGroupSimpleBlock from '../../../blocks/LectureGroupSimpleBlock';

import semesterShape from '../../../../shapes/model/subject/SemesterShape';
import courseFocusShape from '../../../../shapes/state/dictionary/CourseFocusShape';

import styles from './CourseHistorySubSection.module.scss';

class CourseHistorySubSection extends Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { courseFocus } = this.props;

    if (prevProps.courseFocus.lectures === null && courseFocus.lectures !== null) {
      const scrollTarget = this.scrollRef.current.querySelector('.ScrollbarsCustom-Scroller');
      scrollTarget.scrollLeft = scrollTarget.scrollWidth;
    }
  }

  render() {
    const { t } = this.props;
    const { semesters, courseFocus } = this.props;

    if (!courseFocus.course) {
      return null;
    }

    if (courseFocus.lectures === null) {
      return (
        <>
          <div className={classNames('small-title')}>{t('ui.title.courseHistory')}</div>
          <div ref={this.scrollRef}>
            <div className={classNames('list-placeholder', styles.placeholder)}>
              <div>{t('ui.placeholder.loading')}</div>
            </div>
          </div>
        </>
      );
    }

    const semesterYears = semesters != null ? semesters.map((s) => s.year) : [];
    const lectureYears =
      courseFocus.lectures != null ? courseFocus.lectures.map((l) => l.year) : [];

    const getBlockOrPlaceholder = (year, semester) => {
      const filteredLectures = courseFocus.lectures.filter(
        (l) => l.year === year && l.semester === semester,
      );
      if (filteredLectures.length === 0) {
        return (
          <td className={styles.unopened} key={year}>
            <div>{t('ui.others.notOffered')}</div>
          </td>
        );
      }
      return (
        <td key={year}>
          <LectureGroupSimpleBlock lectures={filteredLectures} />
        </td>
      );
    };

    const startYear = Math.min(...semesterYears, ...lectureYears);
    const endYear = Math.max(...semesterYears, ...lectureYears);
    const targetYears = range(startYear, endYear + 1);

    const specialLectures = courseFocus.lectures.filter(
      (l) => l[t('js.property.class_title')].length > 3,
    );
    const isSpecialLectureCourse = specialLectures.length / courseFocus.lectures.length > 0.3;

    return (
      <section className={classNames('subsection')}>
        <div className={classNames('small-title')}>{t('ui.title.courseHistory')}</div>
        <div ref={this.scrollRef}>
          <Scroller noScrollX={false} noScrollY={true}>
            <table
              className={classNames(styles.history, {
                [styles.specialLecture]: isSpecialLectureCourse,
              })}>
              <tbody>
                <tr className={styles.springSemesters}>
                  <th>{t('ui.semester.spring')}</th>
                  {targetYears.map((y) => getBlockOrPlaceholder(y, 1))}
                </tr>
                <tr className={styles.years}>
                  <th />
                  {targetYears.map((year) => (
                    <td key={year}>{year}</td>
                  ))}
                </tr>
                <tr className={styles.fallSemesters}>
                  <th>{t('ui.semester.fall')}</th>
                  {targetYears.map((y) => getBlockOrPlaceholder(y, 3))}
                </tr>
              </tbody>
            </table>
          </Scroller>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  semesters: state.common.semester.semesters,
  courseFocus: state.dictionary.courseFocus,
});

const mapDispatchToProps = (dispatch) => ({});

CourseHistorySubSection.propTypes = {
  semesters: PropTypes.arrayOf(semesterShape),
  courseFocus: courseFocusShape.isRequired,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CourseHistorySubSection),
);
