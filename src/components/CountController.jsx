import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import styles from './CountController.module.scss';

class CountController extends Component {
  render() {
    const { count, updateCount } = this.props;

    return (
      <div className={styles.controller}>
        <i
          className={classNames(styles.icon, styles.iconPlannerMinus)}
          onClick={() => {
            if (count > 0) {
              updateCount(count - 1);
            }
          }}
        />
        <div>{count}</div>
        <i
          className={classNames(styles.icon, styles.iconPlannerPlus)}
          onClick={() => {
            updateCount(count + 1);
          }}
        />
      </div>
    );
  }
}

CountController.propTypes = {
  count: PropTypes.number,
  updateCount: PropTypes.func,
};

export default withTranslation()(CountController);
