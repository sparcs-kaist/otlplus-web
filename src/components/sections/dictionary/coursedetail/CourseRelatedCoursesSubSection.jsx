import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../../../../common/boundClassNames';

import Scroller from '../../../Scroller';
import CourseSimpleBlock from '../../../blocks/CourseSimpleBlock';

import courseFocusShape from '../../../../shapes/state/dictionary/CourseFocusShape';

import styles from './CourseRelatedCoursesSubSection.module.scss';

class CourseRelatedCoursesSubSection extends Component {
  render() {
    const { t } = this.props;
    const { courseFocus } = this.props;

    if (!courseFocus.course) {
      return null;
    }

    const getBlocksOrPlaceholder = (courses) => {
      if (!courses.length) {
        return (
          <div className={classNames('list-placeholder', styles.placeholder)}>
            {t('ui.placeholder.unknown')}
          </div>
        );
      }
      return courses.map((c) => <CourseSimpleBlock course={c} key={c.id} />);
    };

    return (
      <section>
        <div className={classNames('small-title')}>{t('ui.title.relatedCourses')}</div>
        <div>
          <Scroller noScrollX={false} noScrollY={true}>
            <div className={styles.courses}>
              <div>{getBlocksOrPlaceholder(courseFocus.course.related_courses_prior)}</div>
              <div>
                <i className={styles.arrowIcon} />
              </div>
              <div>
                <CourseSimpleBlock course={courseFocus.course} />
              </div>
              <div>
                <i className={styles.arrowIcon} />
              </div>
              <div>{getBlocksOrPlaceholder(courseFocus.course.related_courses_posterior)}</div>
            </div>
          </Scroller>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  courseFocus: state.dictionary.courseFocus,
});

const mapDispatchToProps = (dispatch) => ({});

CourseRelatedCoursesSubSection.propTypes = {
  courseFocus: courseFocusShape.isRequired,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CourseRelatedCoursesSubSection),
);
