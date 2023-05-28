import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import qs from 'qs';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';

import { setIsLectureListOpenOnMobile } from '../../../../actions/timetable/list';
import { setIsTimetableTabsOpenOnMobile } from '../../../../actions/timetable/timetable';

import timetableShape, {
  myPseudoTimetableShape,
} from '../../../../shapes/model/timetable/TimetableShape';
import userShape from '../../../../shapes/model/session/UserShape';

import Divider from '../../../Divider';

class ShareSubSection extends Component {
  render() {
    const { t, i18n } = this.props;
    const {
      selectedTimetable,
      year,
      semester,
      user,
      isLectureListOpenOnMobile,
      setIsTimetableTabsOpenOnMobileDispatch,
      setIsLectureListOpenOnMobileDispatch,
    } = this.props;

    const apiParameter = selectedTimetable
      ? `timetable=${selectedTimetable.id}&year=${year}&semester=${semester}&language=${i18n.language}`
      : '';

    return (
      <div
        className={classNames(
          'subsection--share',
          isLectureListOpenOnMobile ? 'mobile-hidden' : null,
        )}>
        <div>
          {user && selectedTimetable && year && semester ? (
            <>
              <div className={classNames('subsection--share__item')}>
                <a href={`/api/share/timetable/image?${apiParameter}`} download>
                  <i className={classNames('icon', 'icon--share-image')} />
                  <span className={classNames('mobile-hidden')}>{t('ui.button.shareImage')}</span>
                </a>
              </div>
              <a
                style={{ display: 'none' }}
                href={`/api/share/timetable/calendar?${apiParameter}`}
                target="_blank"
                rel="noopener noreferrer">
                <i className={classNames('icon', 'icon--share-googlecalendar')} />
              </a>
              <div className={classNames('subsection--share__item')}>
                <a href={`/api/share/timetable/ical?${apiParameter}`} download>
                  <i className={classNames('icon', 'icon--share-icalendar')} />
                  <span className={classNames('mobile-hidden')}>
                    {t('ui.button.shareCalendar')}
                  </span>
                </a>
              </div>
              <Divider
                className={classNames('divider')}
                orientation={Divider.Orientation.HORIZONTAL}
                isVisible={{ desktop: true, mobile: false }}
              />
              <div className={classNames('subsection--share__item')}>
                <Link
                  to={{
                    pathname: '/timetable/syllabus',
                    search: qs.stringify({
                      timetable: selectedTimetable.id,
                      year: year,
                      semester: semester,
                    }),
                  }}
                  target="_blank"
                  rel="noopener noreferrer">
                  <i className={classNames('icon', 'icon--share-syllabus')} />
                  <span className={classNames('mobile-hidden')}>{t('ui.button.openSyllabus')}</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className={classNames('subsection--share__item')}>
                <span className={classNames('disabled')}>
                  <i className={classNames('icon', 'icon--share-image')} />
                  <span className={classNames('mobile-hidden')}>{t('ui.button.shareImage')}</span>
                </span>
              </div>
              <span style={{ display: 'none' }} className={classNames('disabled')}>
                <i className={classNames('icon', 'icon--share-googlecalendar')} />
              </span>
              <div className={classNames('subsection--share__item')}>
                <span className={classNames('disabled')}>
                  <i className={classNames('icon', 'icon--share-icalendar')} />
                  <span className={classNames('mobile-hidden')}>
                    {t('ui.button.shareCalendar')}
                  </span>
                </span>
              </div>
              <Divider
                className={classNames('divider')}
                orientation={Divider.Orientation.HORIZONTAL}
                isVisible={{ desktop: true, mobile: false }}
              />
              <div className={classNames('subsection--share__item')}>
                <span className={classNames('disabled')}>
                  <i className={classNames('icon', 'icon--share-syllabus')} />
                  <span className={classNames('mobile-hidden')}>{t('ui.button.openSyllabus')}</span>
                </span>
              </div>
            </>
          )}
        </div>
        <div>
          <button
            onClick={() => setIsTimetableTabsOpenOnMobileDispatch(true)}
            className={classNames('text-button', 'text-button--black')}>
            <i className={classNames('icon', 'icon--switch-table')} />
            <span>{t('ui.button.switchTable')}</span>
          </button>
          <button
            onClick={() => setIsLectureListOpenOnMobileDispatch(true)}
            className={classNames('text-button', 'text-button--black')}>
            <i className={classNames('icon', 'icon--show-lectures')} />
            <span>{t('ui.button.showLectures')}</span>
          </button>
        </div>
        <div />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedTimetable: state.timetable.timetable.selectedTimetable,
  isLectureListOpenOnMobile: state.timetable.list.isLectureListOpenOnMobile,
  year: state.timetable.semester.year,
  semester: state.timetable.semester.semester,
  user: state.common.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  setIsTimetableTabsOpenOnMobileDispatch: (isTimetableTabsOpenOnMobile) => {
    dispatch(setIsTimetableTabsOpenOnMobile(isTimetableTabsOpenOnMobile));
  },
  setIsLectureListOpenOnMobileDispatch: (isLectureListOpenOnMobile) => {
    dispatch(setIsLectureListOpenOnMobile(isLectureListOpenOnMobile));
  },
});

ShareSubSection.propTypes = {
  selectedTimetable: PropTypes.oneOfType([timetableShape, myPseudoTimetableShape]),
  isLectureListOpenOnMobile: PropTypes.bool.isRequired,
  year: PropTypes.number,
  semester: PropTypes.oneOf([1, 2, 3, 4]),
  user: userShape,

  setIsTimetableTabsOpenOnMobileDispatch: PropTypes.func.isRequired,
  setIsLectureListOpenOnMobileDispatch: PropTypes.func.isRequired,
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ShareSubSection));
