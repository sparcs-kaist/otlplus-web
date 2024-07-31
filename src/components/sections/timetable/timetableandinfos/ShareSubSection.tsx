import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';

import Timetable, { MyPseudoTimetable } from '@/shapes/model/timetable/Timetable';
import User from '@/shapes/model/session/User';
import { RootState } from '@/redux';

import Divider from '../../../Divider';
import { useTranslation } from 'react-i18next';
import { setIsLectureListOpenOnMobile } from '@/redux/actions/timetable/list';
import { setIsTimetableTabsOpenOnMobile } from '@/redux/actions/timetable/timetable';
import { SemesterType } from '@/shapes/enum';

interface ShareSubSectionProps {
  selectedTimetable?: Timetable | MyPseudoTimetable;
  isLectureListOpenOnMobile: boolean;
  year?: number;
  semester?: SemesterType;
  user?: User;
}

const ShareSubSection: React.FC<ShareSubSectionProps> = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { selectedTimetable, year, semester, user, isLectureListOpenOnMobile } = useSelector(
    (state: RootState) => ({
      selectedTimetable: state.timetable.timetable.selectedTimetable,
      isLectureListOpenOnMobile: state.timetable.list.isLectureListOpenOnMobile,
      year: state.timetable.semester.year,
      semester: state.timetable.semester.semester,
      user: state.common.user.user,
    }),
  );

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
                <span>{t('ui.button.shareImage')}</span>
              </a>
            </div>
            {/* <a
                style={{ display: 'none' }}
                href={`/api/share/timetable/calendar?${apiParameter}`}
                target="_blank"
                rel="noopener noreferrer">
                <i className={classNames('icon', 'icon--share-googlecalendar')} />
              </a> */}
            <div className={classNames('subsection--share__item')}>
              <a href={`/api/share/timetable/ical?${apiParameter}`} download>
                <i className={classNames('icon', 'icon--share-icalendar')} />
                <span>{t('ui.button.shareCalendar')}</span>
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
                <span>{t('ui.button.openSyllabus')}</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={classNames('subsection--share__item')}>
              <span className={classNames('disabled')}>
                <i className={classNames('icon', 'icon--share-image')} />
                <span>{t('ui.button.shareImage')}</span>
              </span>
            </div>
            {/* <span style={{ display: 'none' }} className={classNames('disabled')}>
                <i className={classNames('icon', 'icon--share-googlecalendar')} />
              </span> */}
            <div className={classNames('subsection--share__item')}>
              <span className={classNames('disabled')}>
                <i className={classNames('icon', 'icon--share-icalendar')} />
                <span>{t('ui.button.shareCalendar')}</span>
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
                <span>{t('ui.button.openSyllabus')}</span>
              </span>
            </div>
          </>
        )}
      </div>
      <div>
        <button
          onClick={() => dispatch(setIsTimetableTabsOpenOnMobile(true))}
          className={classNames('text-button', 'text-button--black')}>
          <i className={classNames('icon', 'icon--switch-table')} />
          <span>{t('ui.button.switchTable')}</span>
        </button>
        <button
          onClick={() => dispatch(setIsLectureListOpenOnMobile(true))}
          className={classNames('text-button', 'text-button--black')}>
          <i className={classNames('icon', 'icon--show-lectures')} />
          <span>{t('ui.button.showLectures')}</span>
        </button>
      </div>
      <div />
    </div>
  );
};

export default React.memo(ShareSubSection);
