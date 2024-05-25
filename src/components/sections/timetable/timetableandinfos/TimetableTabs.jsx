import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';
import ReactGA from 'react-ga4';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';

import {
  setTimetables,
  setMyTimetableLectures,
  setSelectedTimetable,
  // reorderTimetable,
  setIsTimetableTabsOpenOnMobile,
} from '@/redux/actions/timetable/timetable';
import { useSessionInfo } from '@/queries/account';
import {
  useCreateTimetable,
  useDeleteTimetable,
  useDuplicateTimetable,
  useReorderTimetable,
  useTimetables,
} from '@/queries/timetable';

const TimetableTabs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isPortrait, selectedTimetable, myTimetable, year, semester } = useSelector((state) => ({
    isPortrait: state.common.media.isPortrait,
    selectedTimetable: state.timetable.timetable.selectedTimetable,
    myTimetable: state.timetable.timetable.myTimetable,
    year: state.timetable.semester.year,
    semester: state.timetable.semester.semester,
  }));

  const { data: user } = useSessionInfo();
  const { data: timetables } = useTimetables({ year, semester });
  const { mutate: createTimetable } = useCreateTimetable();
  const { mutate: duplicateTimetable } = useDuplicateTimetable();
  const { mutate: deleteTimetable } = useDeleteTimetable();
  const { mutate: reorderTimetable } = useReorderTimetable();

  const createRandomTimetableId = () => {
    return Math.floor(Math.random() * 100000000);
  };

  const setMyTimetable = () => {
    const lectures = user.my_timetable_lectures.filter(
      (l) => l.year === year && l.semester === semester,
    );
    dispatch(setMyTimetableLectures(lectures));
  };

  useEffect(() => {
    if (user) {
      setMyTimetable();
    }
  }, [year, semester, user]);

  useEffect(() => {
    if (timetables) {
      dispatch(setTimetables(timetables));
    }
    if (selectedTimetable) {
      dispatch(setSelectedTimetable(timetables[timetables.length - 1]));
    }
  }, [timetables]);

  // if (!user || !timetables || !year || !semester) {
  //   return null;
  // }

  const changeTab = (timetable) => {
    dispatch(setSelectedTimetable(timetable));
    dispatch(setIsTimetableTabsOpenOnMobile(false));

    ReactGA.event({
      category: 'Timetable - Timetable',
      action: 'Switched Timetable',
    });
  };

  const createTable = () => {
    if (!user) {
      // TODO: 로그인 한 사용자가 없으면 state로 관리
      dispatch(createTimetable(createRandomTimetableId()));
    } else {
      createTimetable({
        userID: user?.id,
        year,
        semester,
      });
    }
    ReactGA.event({
      category: 'Timetable - Timetable',
      action: 'Created Timetable',
    });
  };

  const duplicateTable = (event, timetable) => {
    event.stopPropagation();

    if (!user) {
      dispatch(duplicateTimetable(createRandomTimetableId(), timetable));
    } else {
      duplicateTimetable({
        userID: user.id,
        year: year,
        semester: semester,
        lecturesInOriginalTimetable: timetable.lectures,
      });
    }

    ReactGA.event({
      category: 'Timetable - Timetable',
      action: 'Duplicated Timetable',
    });
  };

  const deleteTable = (event, timetable) => {
    event.stopPropagation();

    if (timetables.length === 1) {
      // eslint-disable-next-line no-alert
      alert(t('ui.message.lastTimetable'));
      return;
    }
    // eslint-disable-next-line no-alert
    if (timetable.lectures.length > 0 && !window.confirm(t('ui.message.timetableDelete'))) {
      return;
    }

    if (!user) {
      dispatch(deleteTimetable(timetable));
    } else {
      deleteTimetable({ userID: user.id, timetableID: timetable.id });
    }

    ReactGA.event({
      category: 'Timetable - Timetable',
      action: 'Deleted Timetable',
    });
  };

  const isSelected = (timetable) => {
    return selectedTimetable && timetable.id === selectedTimetable.id;
  };

  const myTimetableTab = user ? (
    <div
      className={classNames('tabs__elem', isSelected(myTimetable) ? 'tabs__elem--selected' : null)}
      key={myTimetable.id}
      onClick={() => changeTab(myTimetable)}>
      <span>{`${t('ui.others.myTable')}`}</span>
      <button onClick={(event) => duplicateTable(event, myTimetable)}>
        <i className={classNames('icon', 'icon--duplicate-table')} />
        <span>{t('ui.button.duplicateTable')}</span>
      </button>
      <button className={classNames('disabled')}>
        <i className={classNames('icon', 'icon--delete-table')} />
        <span>{t('ui.button.deleteTable')}</span>
      </button>
    </div>
  ) : null;

  const normalTimetableTabs =
    timetables && timetables.length ? (
      timetables.map((tt, i) => (
        <div
          className={classNames(
            'tabs__elem',
            'tabs__elem--draggable',
            isSelected(tt) ? 'tabs__elem--selected' : null,
          )}
          key={tt.id}
          onClick={() => changeTab(tt)}
          data-id={tt.id}>
          <span>{`${t('ui.others.table')} ${i + 1}`}</span>
          <button onClick={(event) => duplicateTable(event, tt)}>
            <i className={classNames('icon', 'icon--duplicate-table')} />
            <span>{t('ui.button.duplicateTable')}</span>
          </button>
          <button onClick={(event) => deleteTable(event, tt)}>
            <i className={classNames('icon', 'icon--delete-table')} />
            <span>{t('ui.button.deleteTable')}</span>
          </button>
        </div>
      ))
    ) : (
      <div className={classNames('tabs__elem')} style={{ pointerEvents: 'none' }}>
        <span>{t('ui.placeholder.loading')}</span>
      </div>
    );
  const addTabButton =
    timetables && timetables.length ? (
      <div
        className={classNames('tabs__elem', 'tabs__elem--add-button')}
        onClick={() => createTable()}>
        <i className={classNames('icon', 'icon--add-table')} />
      </div>
    ) : null;

  return (
    <div className={classNames('tabs', 'tabs--timetable')}>
      {myTimetableTab}
      {normalTimetableTabs}
      {addTabButton}
    </div>
  );
};

export default TimetableTabs;
