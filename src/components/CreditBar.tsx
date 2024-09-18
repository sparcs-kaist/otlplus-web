import React from 'react';
import { appBoundClassNames as classNames } from '../common/boundClassNames';
import { ItemFocusFrom } from '@/shapes/enum';

interface CreditBarProps {
  takenCredit: number;
  plannedCredit: number;
  totalCredit: number;
  focusedCredit: number;
  colorIndex: number;
  isCategoryFocused: boolean;
  focusFrom: ItemFocusFrom;
}

const CreditBar: React.FC<CreditBarProps> = ({
  takenCredit,
  plannedCredit,
  totalCredit,
  focusedCredit,
  colorIndex,
  isCategoryFocused,
  focusFrom,
}) => {
  const getWidth = (credit: number) => {
    if (totalCredit === 0) {
      return 100;
    }
    return (credit / totalCredit) * 100;
  };

  const focusPosition =
    focusedCredit === 0
      ? 0
      : focusFrom === ItemFocusFrom.LIST || focusFrom === ItemFocusFrom.ADDING
      ? 3
      : focusFrom === ItemFocusFrom.TABLE_TAKEN
      ? 1
      : 2;

  const Tag = isCategoryFocused ? 'span' : React.Fragment;
  const text = (
    <>
      <Tag>{takenCredit}</Tag>
      {focusPosition === 1 && <span>{`(${focusedCredit})`}</span>}
      {' \u2192 '}
      <Tag>{takenCredit + plannedCredit}</Tag>
      {focusPosition === 2 && <span>{`(${focusedCredit})`}</span>}
      {focusPosition === 3 && <span>{`+${focusedCredit}`}</span>}
      {' / '}
      {totalCredit}
    </>
  );

  const widths = [
    getWidth(takenCredit - (focusPosition === 1 ? focusedCredit : 0)),
    getWidth(focusPosition === 1 ? focusedCredit : 0),
    getWidth(plannedCredit - (focusPosition === 2 ? focusedCredit : 0)),
    getWidth(focusPosition === 2 || focusPosition === 3 ? focusedCredit : 0),
  ];

  return (
    <div className={classNames('credit-bar')}>
      <div className={classNames('credit-bar__text')}>{text}</div>
      <div className={classNames('credit-bar__body')}>
        <div
          className={classNames(
            'credit-bar__body__bar',
            'credit-bar__body__bar--taken',
            `background-color--${isCategoryFocused ? 19 : colorIndex}`,
            'background-color--dark',
          )}
          style={{ width: `${widths[0]}%` }}
        />
        <div
          className={classNames(
            'credit-bar__body__bar',
            'credit-bar__body__bar--focused',
            'background-color--19',
            'background-color--dark',
          )}
          style={{ width: `${widths[1]}%` }}
        />
        <div
          className={classNames(
            'credit-bar__body__bar',
            'credit-bar__body__bar--planned',
            `background-color--${isCategoryFocused ? 19 : colorIndex}`,
            'background-color--dark',
            'background-color--stripe',
          )}
          style={{ width: `${widths[2]}%` }}
        />
        <div
          className={classNames(
            'credit-bar__body__bar',
            'credit-bar__body__bar--focused',
            'background-color--19',
            'background-color--dark',
            'background-color--stripe',
          )}
          style={{ width: `${widths[3]}%` }}
        />
      </div>
    </div>
  );
};

export default CreditBar;
