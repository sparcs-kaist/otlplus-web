import { appBoundClassNames as classNames } from '../common/boundClassNames';
import SearchFilterEntity from './SearchFilterEntity';

const VALUE_INDEX = 0;
const LABEL_INDEX = 1;
const DIMMED_INDEX = 2;

interface Option {
  [VALUE_INDEX]: string;
  [LABEL_INDEX]: string;
  [DIMMED_INDEX]?: boolean;
}

interface SearchFilterProps {
  updateCheckedValues: (values: Set<string>) => void;
  inputName: string;
  titleName: string;
  options: Option[];
  checkedValues: Set<string>;
  isRadio?: boolean;
}

const SearchFilter = ({
  inputName,
  titleName,
  options,
  checkedValues,
  updateCheckedValues,
  isRadio = false,
}: SearchFilterProps) => {
  const isChecked = (value: string) => {
    return checkedValues.has(value);
  };

  const handleValueCheckedChange = (value: string, isChecked: boolean) => {
    if (isRadio) {
      updateCheckedValues(new Set([value]));
    } else if (isChecked) {
      if (value === 'ALL') {
        updateCheckedValues(new Set(['ALL']));
      } else {
        const checkedValuesCopy = new Set(checkedValues);
        checkedValuesCopy.add(value);
        checkedValuesCopy.delete('ALL');
        updateCheckedValues(checkedValuesCopy);
      }
    } else {
      if (value === 'ALL') {
        // Pass
      } else {
        const checkedValuesCopy = new Set(checkedValues);
        checkedValuesCopy.delete(value);
        if (checkedValuesCopy.size === 0 && options.some((o) => o[VALUE_INDEX] === 'ALL')) {
          checkedValuesCopy.add('ALL');
        }
        updateCheckedValues(checkedValuesCopy);
      }
    }
  };

  const mapCircle = (o: Option) => (
    <SearchFilterEntity
      key={o[VALUE_INDEX]}
      value={o[VALUE_INDEX]}
      name={inputName}
      label={o[LABEL_INDEX]}
      isRadio={isRadio}
      isDimmed={o[DIMMED_INDEX]}
      onChange={(e) => handleValueCheckedChange(e.target.value, e.target.checked)}
      isChecked={isChecked(o[VALUE_INDEX])}
    />
  );

  return (
    <div className={classNames('attribute')}>
      <span>{titleName}</span>
      <div className={classNames('search-fields')}>{options.map(mapCircle)}</div>
    </div>
  );
};

export default SearchFilter;
