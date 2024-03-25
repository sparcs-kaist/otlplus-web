import React from 'react';
import { withTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';

interface Props {
  dayIndex: number;
  beginIndex: number;
  endIndex: number;
  cellWidth: number;
  cellHeight: number;
}

/**
 * 모의시간표에서 시간대를 드래그 할 때 보여지는 드래그 영역 타일
 */
const TimetableDragTile: React.FC<Props> = ({
  dayIndex,
  beginIndex,
  endIndex,
  cellWidth,
  cellHeight,
}) => {
  return (
    <div
      className={classNames('tile', 'tile--timetable-drag')}
      style={{
        left: (cellWidth + 5) * dayIndex + 17,
        width: cellWidth + 2,
        top: cellHeight * beginIndex + 19,
        height: cellHeight * (endIndex - beginIndex) - 3,
      }}
    />
  );
};

export default withTranslation()(React.memo(TimetableDragTile));
