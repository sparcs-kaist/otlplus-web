import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

class CloseButton extends Component {
  render() {
    const { onClick, className } = this.props;

    return (
      <div className={classNames('close-button-wrap', className)}>
        <button onClick={onClick}>
          <i className={classNames('icon', 'icon--close-section')} />
        </button>
      </div>
    );
  }
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CloseButton;
