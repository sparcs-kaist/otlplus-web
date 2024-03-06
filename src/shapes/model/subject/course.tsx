import department from './department';
import nestedCourse from './nestedCourse';
import nestedProfessor from './nestedProfessor';

interface course {
  id: number;
  old_code: string;
  department?: department;
  type: string;
  type_en: string;
  title: string;
  title_en: string;
  summary: string;
  review_total_weight: number;
  credit: number;
  credit_au: number;
  num_classes: number;
  num_labs: number;
  related_courses_prior: nestedCourse[];
  related_courses_posterior: nestedCourse[];
  professors: nestedProfessor[];
  grade: number;
  load: number;
  speech: number;
  userspecific_is_read: boolean;
}

export default course;
