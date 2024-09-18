import React from 'react';
import { appBoundClassNames as classNames } from '../common/boundClassNames';

interface Option {
  label: string;
  onClick: () => void;
  isSmall?: boolean;
  isDisabled?: boolean;
}

interface PlannerOverlayProps {
  yearIndex: number;
  semesterIndex: -1 | 0 | 1;
  tableSize: number;
  cellWidth: number;
  cellHeight: number;
  isPlannerWithSummer: boolean;
  isPlannerWithWinter: boolean;
  options: Option[];
}

const PlannerOverlay = ({
  yearIndex,
  semesterIndex,
  tableSize,
  cellWidth,
  cellHeight,
  isPlannerWithSummer,
  options,
}: PlannerOverlayProps) => {
  const verticalBase = 17 + (isPlannerWithSummer ? 15 : 0) + cellHeight * tableSize;

  const getTop = () => {
    if (semesterIndex === 0) {
      return verticalBase - cellHeight * tableSize + 2;
    }
    if (semesterIndex === 1) {
      return verticalBase + cellHeight * 2 + 11 + 1;
    }
    return verticalBase;
  };

  return (
    <div
      className={classNames('planner-overlay')}
      style={{
        ...(yearIndex !== -1
          ? {
              left: 26 + (cellWidth + 15) * yearIndex - 1,
              width: cellWidth + 2,
            }
          : {
              left: 26 - 1,
              right: 7,
            }),
        ...(semesterIndex !== -1
          ? {
              top: getTop(),
              height: cellHeight * tableSize - 3,
            }
          : {
              top: verticalBase + 2,
              height: 20,
            }),
      }}>
      {options.map((o) => (
        <div
          className={classNames(
            'planner-overlay__button',
            o.isSmall && 'planner-overlay__button--small',
            o.isDisabled && 'planner-overlay__button--disabled',
          )}
          onClick={o.onClick}
          key={`button:${o.label}`}>
          {o.label}
        </div>
      ))}
    </div>
  );
};

export default React.memo(PlannerOverlay);
