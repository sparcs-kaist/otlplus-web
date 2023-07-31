import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../../common/boundClassNames';

import lectureShape from '../../shapes/model/subject/LectureShape';

const LectureGroupCountBlock = ({ t, lectures }) => {
  return (
    <div className={classNames('block', 'block--lecture-group-count')}>
      {t('ui.others.sectionCount', { count: lectures.length })}
    </div>
  );
};

LectureGroupCountBlock.propTypes = {
  lectures: PropTypes.arrayOf(lectureShape).isRequired,
};

export default withTranslation()(React.memo(LectureGroupCountBlock));
