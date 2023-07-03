import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

const PlannerOverlay = ({
  t,
  yearIndex,
  semesterIndex,
  tableSize,
  cellWidth,
  cellHeight,
  isPlannerWithSummer,
  isPlannerWithWinter,
  options,
}) => {
  const getTop = () => {
    const base = 17 + (isPlannerWithSummer ? 15 : 0) + cellHeight * tableSize;
    if (semesterIndex === 0) {
      return base - cellHeight * tableSize + 2;
    }
    if (semesterIndex === 1) {
      return base + cellHeight * 2 + 11 + 1;
    }
    if (semesterIndex === -1) {
      return base + 2;
    }
    return base;
  };

  return (
    <div
      className={classNames('planner-overlay')}
      style={{
        left: yearIndex !== -1 ? 26 + (cellWidth + 15) * yearIndex - 1 : 26 - 1,
        top: getTop(),
        width: yearIndex !== -1 ? cellWidth + 2 : (cellWidth + 15) * 4 - 13,
        height: semesterIndex !== -1 ? cellHeight * tableSize - 3 : 20,
      }}>
      {options.map((o) => (
        <div
          className={classNames(
            'planner-overlay__button',
            o.isSmall && 'planner-overlay__button--small',
            o.isDisabled && 'planner-overlay__button--disabled',
          )}
          onClick={o.onClick}>
          {o.label}
        </div>
      ))}
    </div>
  );
};

PlannerOverlay.propTypes = {
  yearIndex: PropTypes.number.isRequired,
  semesterIndex: PropTypes.oneOf([0, 1]).isRequired,
  tableSize: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  isPlannerWithSummer: PropTypes.bool.isRequired,
  isPlannerWithWinter: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      isSmall: PropTypes.bool,
      isDisabled: PropTypes.bool,
    }),
  ).isRequired,
};

export default withTranslation()(React.memo(PlannerOverlay));
