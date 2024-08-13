import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../../../common/boundClassNames';

import semesterShape from '../../../shapes/model/subject/SemesterShape';

import { getCurrentSchedule, getSemesterName } from '../../../utils/semesterUtils';
import { PORTAL } from '@/common/constants';

import styles from './AcademicScheduleSection.module.scss';

class AcademicScheduleSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ now: new Date() }), 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { t } = this.props;
    const { now } = this.state;
    const { semesters } = this.props;

    const getAcademicScheduleContent = () => {
      if (semesters == null) {
        return (
          <div className={classNames(styles.schedule, 'placeholder')}>
            <div className={styles.dDay}>{t('ui.placeholder.loading')}</div>
            <div>
              <strong className={styles.title}>-</strong>
              <span>-</span>
            </div>
          </div>
        );
      }
      const targetSchedule = getCurrentSchedule(semesters);
      if (!targetSchedule) {
        return (
          <div className={classNames(styles.schedule, 'placeholder')}>
            <div className={styles.dDay}>{t('ui.placeholder.unknown')}</div>
            <div>
              <strong className={styles.title}>-</strong>
              <span>-</span>
            </div>
          </div>
        );
      }
      const targetScheduleTime = targetSchedule.time;
      const timeDiff = targetScheduleTime - now;
      const seconds = Math.floor((timeDiff / 1000) % 60);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return (
        <div className={styles.schedule}>
          <div className={styles.dDay}>
            {`D-${t('ui.others.dayCount', { count: days })} ${t('ui.others.hourCount', {
              count: hours,
            })} ${t('ui.others.minuteCount', { count: minutes })} ${t('ui.others.secondCount', {
              count: seconds,
            })}`}
          </div>
          <div>
            <strong className={styles.title}>
              {`${targetSchedule.year} ${getSemesterName(targetSchedule.semester)} ${t(
                `ui.schedule.${targetSchedule.type}`,
              )}`}
            </strong>
            <span>
              {`${targetScheduleTime.getFullYear()}.${
                targetScheduleTime.getMonth() + 1
              }.${targetScheduleTime.getDate()}`}
            </span>
          </div>
        </div>
      );
    };

    return (
      <div className={classNames('section', 'section--feed')}>
        <div className={classNames('subsection', 'subsection--feed')}>
          {getAcademicScheduleContent()}
          <div className={classNames('buttons')}>
            <a
              href={PORTAL}
              className={classNames('text-button')}
              target="_blank"
              rel="noopener noreferrer">
              {t('ui.button.goToAcademicSystem')}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  semesters: state.common.semester.semesters,
});

const mapDispatchToProps = (dispatch) => ({});

AcademicScheduleSection.propTypes = {
  semesters: PropTypes.arrayOf(semesterShape),
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AcademicScheduleSection),
);
