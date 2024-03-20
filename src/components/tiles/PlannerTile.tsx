import React from 'react';
import { withTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '@/common/boundClassNames';
import TakenPlannerItem from '@/shapes/model/planner/TakenPlannerItem';
import FuturePlannerItem from '@/shapes/model/planner/FuturePlannerItem';
import ArbitraryPlannerItem from '@/shapes/model/planner/ArbitraryPlannerItem';
import { useTranslatedString } from '@/hooks/useTranslatedString';
import { getCourseOfItem, getSemesterOfItem } from '@/utils/itemUtils';
import { PlannerItemType } from '@/shapes/enum';

export type ItemType = TakenPlannerItem | FuturePlannerItem | ArbitraryPlannerItem;

interface Props {
  item: ItemType;
  yearIndex: number;
  //
  semesterIndex: 0 | 1;
  beginIndex: number;
  endIndex: number;
  color: number;
  tableSize: number;
  cellWidth: number;
  cellHeight: number;
  isPlannerWithSummer: boolean;
  isPlannerWithWinter: boolean;
  isDuplicate: boolean;
  isRaised: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  isSimple: boolean;
  onMouseOver?: (item: ItemType) => void;
  onMouseOut?: (item: ItemType) => void;
  onClick?: (item: ItemType) => void;
  deleteLecture: (item: ItemType) => void;
}

/**
 * 졸업플래너의 타일
 */
const PlannerTile: React.FC<Props> = ({
  item,
  yearIndex,
  semesterIndex,
  beginIndex,
  endIndex,
  color,
  tableSize,
  cellWidth,
  cellHeight,
  isPlannerWithSummer,
  isDuplicate,
  isRaised,
  isHighlighted,
  isDimmed,
  isSimple,
  onMouseOver,
  onMouseOut,
  onClick,
  deleteLecture,
}) => {
  const translate = useTranslatedString();

  const handleMouseOver = onMouseOver
    ? () => {
        onMouseOver(item);
      }
    : undefined;
  const handleMouseOut = onMouseOut
    ? () => {
        onMouseOut(item);
      }
    : undefined;
  const handleClick = onClick
    ? () => {
        onClick(item);
      }
    : undefined;
  const handleDeleteFromTableClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteLecture(item);
  };

  const getTop = () => {
    const base = 17 + (isPlannerWithSummer ? 15 : 0) + cellHeight * tableSize;
    if (semesterIndex === 0) {
      return base - cellHeight * endIndex + 2;
    }
    if (semesterIndex === 1) {
      return base + cellHeight * 2 + 11 + cellHeight * beginIndex + 1;
    }
    return base;
  };

  return (
    <div
      className={classNames(
        'tile',
        'tile--planner',
        `background-color--${color}`,
        item.item_type === PlannerItemType.TAKEN ? null : 'background-color--stripe',
        isRaised ? 'tile--raised' : null,
        isHighlighted ? 'tile--highlighted' : null,
        isDimmed ? 'tile--dimmed' : null,
        item.is_excluded ? 'tile--planner--excluded' : null,
      )}
      style={{
        left: 26 + (cellWidth + 15) * yearIndex - 1,
        top: getTop(),
        width: cellWidth + 2,
        height: cellHeight * (endIndex - beginIndex) - 3,
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}>
      {item.item_type !== PlannerItemType.TAKEN ? (
        <button
          className={classNames('tile--planner__button')}
          onClick={handleDeleteFromTableClick}>
          <i className={classNames('icon', 'icon--delete-lecture')} />
        </button>
      ) : null}
      <div className={classNames('tile--planner__content')}>
        <p
          className={classNames(
            'tile--planner__content__title',
            isSimple ? 'mobile-hidden' : null,
          )}>
          {translate(getCourseOfItem(item), 'title')}
        </p>
        {getSemesterOfItem(item) % 2 === 0 && (
          <p
            className={classNames(
              'tile--planner__content__label',
              isSimple ? 'mobile-hidden' : null,
              `background-color--${color}`,
              'background-color--dark',
            )}>
            S
          </p>
        )}
        {item.item_type === PlannerItemType.ARBITRARY && (
          <p
            className={classNames(
              'tile--planner__content__label',
              isSimple ? 'mobile-hidden' : null,
              `background-color--${color}`,
              'background-color--dark',
            )}>
            ?
          </p>
        )}
        {item.is_excluded && (
          <p
            className={classNames(
              'tile--planner__content__label',
              isSimple ? 'mobile-hidden' : null,
              `background-color--${color}`,
              'background-color--dark',
            )}>
            X
          </p>
        )}
        {isDuplicate && (
          <p
            className={classNames(
              'tile--planner__content__label',
              isSimple ? 'mobile-hidden' : null,
              `background-color--${color}`,
              'background-color--dark',
            )}>
            !
          </p>
        )}
      </div>
    </div>
  );
};

export default withTranslation()(React.memo(PlannerTile));
