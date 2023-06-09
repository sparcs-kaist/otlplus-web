import PropTypes from 'prop-types';

import departmentShape from './DepartmentShape';

const nestedCourseShape = PropTypes.exact({
  id: PropTypes.number.isRequired,
  old_code: PropTypes.string.isRequired,
  department: departmentShape,
  type: PropTypes.string.isRequired,
  type_en: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  title_en: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  review_total_weight: PropTypes.number.isRequired,
  credit: PropTypes.number.isRequired,
  credit_au: PropTypes.number.isRequired,
  num_classes: PropTypes.number.isRequired,
  num_labs: PropTypes.number.isRequired,
});

export default nestedCourseShape;
