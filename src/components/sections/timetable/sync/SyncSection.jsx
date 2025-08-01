import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';

import { setSemester } from '../../../../redux/actions/timetable/semester';

import semesterShape from '../../../../shapes/model/subject/SemesterShape';

class SemesterSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSynced: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  render() {
    const { t } = this.props;
    const { isPortrait } = this.props;

    const sectionContent = (
      <button>
        {this.state.isSynced ? t('syncSection.synced') : t('syncSection.sync')}
        <span className={classNames('icon', 'icon--sync')} />
      </button>
    );

    return (
      <div className={classNames('section', 'section--sync', isPortrait && 'section--transparent')}>
        <div className={classNames('subsection', 'subsection--sync')}>{sectionContent}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  semesters: state.common.semester.semesters,
  isPortrait: state.common.media.isPortrait,
  year: state.timetable.semester.year,
  semester: state.timetable.semester.semester,
});

const mapDispatchToProps = (dispatch) => ({
  setSemesterDispatch: (year, semester) => {
    dispatch(setSemester(year, semester));
  },
});

SemesterSection.propTypes = {
  startSemester: semesterShape,
  isPortrait: PropTypes.bool.isRequired,

  semesters: PropTypes.arrayOf(semesterShape),
  year: PropTypes.number,
  semester: PropTypes.oneOf([1, 2, 3, 4]),

  setSemesterDispatch: PropTypes.func.isRequired,
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(SemesterSection));
