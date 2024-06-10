import { Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReactGA from 'react-ga4';
import { motion, Reorder } from 'framer-motion';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import {
  setMyTimetableLectures,
  setSelectedTimetable,
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

import styles from './TimetableTabs.module.scss';
import TimetableTab from './TimetableTab';

const TimetableTabsInner = () => {
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

  /**
   * `timetableIDs` exists to keep track of the order of timetables.
   * It is used to optimize the update depend on the creation, reordering, and deletion of timetables.
   * With this, we can avoid waiting for the server response to update the order of timetables.
   * If the API call fails, the order of timetables will be updated by query invalidation of react-query.
   */
  const [timetableIDs, setTimetableIDs] = useState([]);

  const isNewTimetableGenerated = useRef(false);
  const isJustReordered = useRef(false);

  useEffect(() => {
    if (user) {
      setMyTimetable();
    }
  }, [year, semester, user]);

  useEffect(() => {
    if (timetables) {
      if (!selectedTimetable) {
        dispatch(setSelectedTimetable(timetables[0]));
      }

      if (isNewTimetableGenerated.current) {
        dispatch(setSelectedTimetable(timetables[timetables.length - 1]));
        isNewTimetableGenerated.current = false;
      }

      setTimetableIDs(timetables.map((tt) => tt.id));
    }
  }, [timetables]);

  const createRandomTimetableId = () => {
    return Math.floor(Math.random() * 100000000);
  };

  const setMyTimetable = () => {
    const lectures = user.my_timetable_lectures.filter(
      (l) => l.year === year && l.semester === semester,
    );
    dispatch(setMyTimetableLectures(lectures));
  };

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
      createTimetable(
        {
          userID: user?.id,
          year,
          semester,
        },
        {
          onSuccess: () => (isNewTimetableGenerated.current = true),
        },
      );
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
      duplicateTimetable(
        {
          userID: user.id,
          year: year,
          semester: semester,
          lecturesInOriginalTimetable: timetable.lectures,
        },
        {
          onSuccess: () => (isNewTimetableGenerated.current = true),
        },
      );
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
      const index = timetables.findIndex((t) => t.id === timetable.id);
      const newIndex = index === timetables.length - 1 ? index - 1 : index + 1;
      dispatch(setSelectedTimetable(timetables[newIndex]));

      setTimetableIDs((curr) => curr.filter((id) => id !== timetable.id));
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

  const handleReorder = (newOrder) => {
    const draggedItem = newOrder.find((item, index) => item !== timetableIDs[index]);
    const newArrangeOrder = newOrder.findIndex((elem) => elem === draggedItem);
    if (newArrangeOrder === -1) {
      return;
    }

    setTimetableIDs(newOrder);
    reorderTimetable({
      userID: user.id,
      draggingTimetableID: draggedItem,
      newArrangeOrder: newArrangeOrder,
    });
  };

  if (!timetables) {
    return null;
  }

  return (
    <>
      <motion.div className={classNames(styles.tabsWrapper)}>
        {user && (
          <div
            className={classNames(
              'tabs__elem',
              isSelected(myTimetable) ? 'tabs__elem--selected' : null,
            )}
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
            <button className={classNames('disabled')}>
              <i className={classNames('icon', 'icon--drag-table')} />
            </button>
          </div>
        )}
        <Reorder.Group
          className={classNames(styles.tabs)}
          style={{
            gridTemplateColumns: !isPortrait && `repeat(${timetables.length}, auto)`,
          }}
          layoutScroll
          axis={!isPortrait ? 'x' : 'y'}
          values={timetableIDs}
          onReorder={handleReorder}>
          {timetables &&
            timetables.length &&
            timetableIDs.map((tid, i) => {
              const timetable = timetables.find((t) => t.id === tid) ?? timetables[0];
              return (
                <TimetableTab
                  key={tid}
                  timetable={timetable}
                  tid={tid}
                  index={i}
                  isSelected={isSelected(timetable)}
                  isJustReordered={isJustReordered}
                  changeTab={changeTab}
                  duplicateTable={duplicateTable}
                  deleteTable={deleteTable}
                />
              );
            })}
        </Reorder.Group>
      </motion.div>
      {timetables && timetables.length && (
        <div
          className={classNames('tabs__elem', 'tabs__elem--add-button')}
          onClick={() => createTable()}>
          <i className={classNames('icon', 'icon--add-table')} />
        </div>
      )}
    </>
  );
};

const LoadingTab = () => {
  const { t } = useTranslation();
  return (
    <div className={classNames('tabs__elem')} style={{ pointerEvents: 'none' }}>
      <span>{t('ui.placeholder.loading')}</span>
    </div>
  );
};

const TimetableTabs = () => (
  <div className={classNames('tabs', 'tabs--timetable')}>
    <Suspense fallback={<LoadingTab />}>
      <TimetableTabsInner />
    </Suspense>
  </div>
);
export default TimetableTabs;
