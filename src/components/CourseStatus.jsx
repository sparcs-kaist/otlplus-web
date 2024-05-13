import { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import styles from './CourseStatus.module.scss';

class CourseStatus extends Component {
  render() {
    const { entries } = this.props;

    return (
      <div>
        {entries.map(({ name, info }) => (
          <div className={styles.courseTypes} key={name}>
            <div className={styles.title}>{name}</div>
            <div>
              {info.map((k) => (
                <div
                  className={styles.info}
                  onMouseOver={k.onMouseOver}
                  onMouseOut={k.onMouseOut}
                  key={k.name}>
                  <span className={styles.infoName}>{k.name}</span>
                  {k.controller}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

CourseStatus.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      info: PropTypes.arrayOf(
        PropTypes.exact({
          name: PropTypes.string.isRequired,
          controller: PropTypes.any.isRequired,
          onMouseOver: PropTypes.func,
          onMouseOut: PropTypes.func,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default withTranslation()(CourseStatus);
