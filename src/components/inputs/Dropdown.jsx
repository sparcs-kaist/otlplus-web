import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { appBoundClassNames as classNames } from '../../common/boundClassNames';

const VALUE_INDEX = 0;
const LABEL_INDEX = 1;

class Dropdown extends Component {
  render() {
    const { updateSelectedValue, inputName, options, selectedValue } = this.props;

    return (
      <select
        name={inputName}
        value={selectedValue}
        onChange={(e) => updateSelectedValue(e.target.value)}>
        {options.map((o) => (
          <option key={o[VALUE_INDEX]} value={o[VALUE_INDEX]}>
            {o[LABEL_INDEX]}
          </option>
        ))}
      </select>
    );
  }
}

Dropdown.propTypes = {
  updateSelectedValue: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default Dropdown;
