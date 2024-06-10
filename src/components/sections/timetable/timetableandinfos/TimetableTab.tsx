import Timetable from '@/shapes/model/timetable/Timetable';
import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import { Reorder, useDragControls } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TimetableTabProps {
  timetable: Timetable;
  tid: string;
  index: number;
  isSelected: boolean;
  isJustReordered: React.MutableRefObject<boolean>;
  changeTab: (timetable: Timetable) => void;
  duplicateTable: (event: React.MouseEvent, timetable: Timetable) => void;
  deleteTable: (event: React.MouseEvent, timetable: Timetable) => void;
}

const TimetableTab: React.FC<TimetableTabProps> = ({
  timetable,
  tid,
  index,
  isSelected,
  isJustReordered,
  changeTab,
  duplicateTable,
  deleteTable,
}) => {
  const { t } = useTranslation();
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      dragListener={false}
      dragControls={dragControls}
      whileDrag={{
        cursor: 'grabbing',
        opacity: 0.7,
        position: 'relative',
      }} // instead of applying css tabs__elem--dragging
      onDragStart={() => {
        isJustReordered.current = true;
      }}
      onDragEnd={() => {
        isJustReordered.current = false;
      }}
      dragElastic={0}
      transition={{ duration: 0 }}
      key={tid}
      value={tid}
      className={classNames(
        'tabs__elem',
        'tabs__elem--draggable',
        isSelected ? 'tabs__elem--selected' : null,
      )}
      style={{ flex: 1 }}
      onClick={() => {
        // FIXME: This is a workaround for the issue where the Reorder component cannot prevent the onClick event from triggering after dragging a later element forward to a former element.
        if (isJustReordered.current) {
          isJustReordered.current = false;
          return;
        }
        changeTab(timetable);
      }}
      data-id={tid}>
      <span>{`${t('ui.others.table')} ${index + 1}`}</span>
      <button onClick={(event) => duplicateTable(event, timetable)}>
        <i className={classNames('icon', 'icon--duplicate-table')} />
        <span>{t('ui.button.duplicateTable')}</span>
      </button>
      <button onClick={(event) => deleteTable(event, timetable)}>
        <i className={classNames('icon', 'icon--delete-table')} />
        <span>{t('ui.button.deleteTable')}</span>
      </button>
      <button onPointerDown={(e) => dragControls.start(e)}>
        <i className={classNames('icon', 'icon--drag-table')} />
      </button>
    </Reorder.Item>
  );
};

export default TimetableTab;
