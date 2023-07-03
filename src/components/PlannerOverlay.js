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

PlannerOverlay.propTypes = {
  yearIndex: PropTypes.number.isRequired,
  semesterIndex: PropTypes.oneOf([-1, 0, 1]).isRequired,
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
