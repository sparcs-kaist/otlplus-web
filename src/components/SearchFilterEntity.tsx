import React from 'react';
import { appBoundClassNames as classNames } from '../common/boundClassNames';

interface SearchFilterEntityProps {
  value: string;
  name: string;
  label: string;
  isRadio?: boolean;
  isDimmed?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

const SearchFilterEntity: React.FC<SearchFilterEntityProps> = ({
  value,
  name,
  label,
  isRadio = false,
  isDimmed = false,
  onChange,
  isChecked,
}) => {
  const isAll = value === 'ALL';
  const inputId = `${name}-${value}`;

  return (
    <label
      className={classNames('search-fields__label', isDimmed ? 'search-fields__label--dimmed' : '')}
      htmlFor={inputId}>
      <input
        id={inputId}
        className={isAll ? 'chkall' : 'chkelem'}
        type={isRadio ? 'radio' : 'checkbox'}
        autoComplete="off"
        name={name}
        value={value}
        onChange={onChange}
        checked={isChecked}
      />
      {label}
      <i className={classNames('icon', isRadio ? 'icon--radio' : 'icon--checkbox')} />
    </label>
  );
};

export default SearchFilterEntity;
