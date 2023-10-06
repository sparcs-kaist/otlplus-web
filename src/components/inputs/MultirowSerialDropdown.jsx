import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SerialDropdown, { VALUES_INDEX } from './SerialDropdown';

// import { appBoundClassNames as classNames } from '../../common/boundClassNames';

class MultirowSerialDropdown extends Component {
  _addRow = () => {
    const { updateSelectedValues, selectedValues, options, isUniqueSelectionRequired } = this.props;

    const candidateOptions = isUniqueSelectionRequired
      ? options.filter((o) => {
          const valuesOfOption = o[VALUES_INDEX];
          const keyOfOption = valuesOfOption[valuesOfOption.length - 1];
          return !selectedValues.includes(keyOfOption);
        })
      : options;
    const optionToAdd = candidateOptions[0];
    const valuesOfOptionToAdd = optionToAdd[VALUES_INDEX];

    updateSelectedValues(
      selectedValues.concat([valuesOfOptionToAdd[valuesOfOptionToAdd.length - 1]]),
    );
  };

  _deleteRow = (index) => {
    const { updateSelectedValues, selectedValues } = this.props;

    updateSelectedValues(selectedValues.filter((v, i) => i !== index));
  };

  _handleValueSelectedChange = (index, value) => {
    const { updateSelectedValues, selectedValues } = this.props;

    updateSelectedValues(selectedValues.map((v, i) => (i === index ? value : v)));
  };

  render() {
    const { inputName, options, selectedValues } = this.props;

    return (
      <span>
        {selectedValues.map((v, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${inputName}:${i}`}>
            <SerialDropdown
              updateSelectedValue={(value) => {
                this._handleValueSelectedChange(i, value);
              }}
              inputName={`${inputName}:${i}`}
              options={options}
              selectedValue={v}
            />
            <button onClick={() => this._deleteRow(i)}>-</button>
          </div>
        ))}
        <div>
          <button onClick={() => this._addRow()}>+</button>
        </div>
      </span>
    );
  }
}

MultirowSerialDropdown.propTypes = {
  updateSelectedValues: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  isUniqueSelectionRequired: PropTypes.bool,
};

export default MultirowSerialDropdown;
