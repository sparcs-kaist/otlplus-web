import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

import CloseButton from './CloseButton';

import styles from './BetaPopup.module.scss';

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
  };

  render() {
    const { isOpen } = this.state;
    const { title, content, link } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div className={classNames('section', styles.popup)}>
        <CloseButton className={styles.closeButton} onClick={this.close} />
        <div className={classNames('title')}>{title}</div>
        <div className={styles.contents}>
          {content.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
        <div className={classNames('buttons')}>
          <a
            href={link}
            className={classNames('text-button')}
            target="_blank"
            rel="noopener noreferrer">
            피드백 제출하기
          </a>
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

export default withTranslation()(BetaPopup);
