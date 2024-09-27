import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import { unique } from '../../utils/commonUtils';

// import { appBoundClassNames as classNames } from '../../common/boundClassNames';

export const VALUES_INDEX = 0;
export const LABELS_INDEX = 1;

class SerialDropdown extends Component {
  _getCurrentSelectedOption = () => {
    const { options, selectedValue } = this.props;

    return options.find((o) => {
      const values = o[VALUES_INDEX];
      return values[values.length - 1] === selectedValue;
    });
  };

  _handleValueSelectedChange = (index, value) => {
    const { updateSelectedValue, options } = this.props;

    const prevSelectedOption = this._getCurrentSelectedOption();

    const newSelectedOption = options.find((o) =>
      o[VALUES_INDEX].every((v, i) => {
        if (i > index) {
          return true;
        }
        if (i === index) {
          return v === value;
        }
        return v === prevSelectedOption[VALUES_INDEX][i];
      }),
    );

    const valuesOfNewSelectedOption = newSelectedOption[VALUES_INDEX];
    updateSelectedValue(valuesOfNewSelectedOption[valuesOfNewSelectedOption.length - 1]);
  };

  render() {
    const { inputName, options } = this.props;

    const selectedOption = this._getCurrentSelectedOption();

    return (
      <span>
        {selectedOption[VALUES_INDEX].map((v1, i1) => (
          <Dropdown
            updateSelectedValue={(value) => {
              this._handleValueSelectedChange(i1, value);
            }}
            inputName={`${inputName}:${i1}`}
            // eslint-disable-next-line react/no-array-index-key
            key={`${inputName}:${i1}`}
            options={unique(
              options
                .filter((o) =>
                  o[VALUES_INDEX].every(
                    (v2, i2) =>
                      i2 >= i1 || o[VALUES_INDEX][i2] === selectedOption[VALUES_INDEX][i2],
                  ),
                )
                .map((o) => [o[VALUES_INDEX][i1], o[LABELS_INDEX][i1]]),
              (o1, o2) => o1[VALUES_INDEX] === o2[VALUES_INDEX],
            )}
            selectedValue={v1}
          />
        ))}
      </span>
    );
  }
}

SerialDropdown.propTypes = {
  updateSelectedValue: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))).isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default SerialDropdown;
