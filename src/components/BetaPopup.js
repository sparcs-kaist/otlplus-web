import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

import CloseButton from './CloseButton';


class BetaPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
    };
  }


  close = () => {
    this.setState({
      isOpen: false,
    });
  }


  render() {
    const { isOpen } = this.state;
    const { title, content, link } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div className={classNames('section', 'section--popup')}>
        <CloseButton onClick={this.close} />
        <div className={classNames('title')}>
          { title }
        </div>
        <div className={classNames('subsection', 'subsection--beta-popup')}>
          <div>
            {
              content.map((l) => (
                <div>{ l }</div>
              ))
            }
          </div>
          <div>
            <Link to={link} className={classNames('text-button')}>
              피드백 제출하기
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

BetaPopup.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string.isRequired,
};

export default withTranslation()(
  BetaPopup
);
