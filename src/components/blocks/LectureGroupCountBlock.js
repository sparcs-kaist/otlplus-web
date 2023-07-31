import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';

import { appBoundClassNames as classNames } from '../../common/boundClassNames';

import lectureShape from '../../shapes/model/subject/LectureShape';

const LectureGroupCountBlock = ({ t, lectures }) => {
  return (
    <div className={classNames('block', 'block--lecture-group-count')}>
      <Trans t={t} i18nKey="ui.others.sectionCount" values={{ count: lectures.length }} />
    </div>
  );
};

LectureGroupCountBlock.propTypes = {
  lectures: PropTypes.arrayOf(lectureShape).isRequired,
};

export default withTranslation()(React.memo(LectureGroupCountBlock));
