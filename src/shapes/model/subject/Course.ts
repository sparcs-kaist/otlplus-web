import type Department from './Department';
import type NestedCourse from './NestedCourse';
import type NestedProfessor from './NestedProfessor';

export default interface Course {
  id: number;
  old_code: string;
  department?: Department;
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
  related_courses_prior: NestedCourse[];
  related_courses_posterior: NestedCourse[];
  professors: NestedProfessor[];
  grade: number;
  load: number;
  speech: number;
  userspecific_is_read: boolean;
}
