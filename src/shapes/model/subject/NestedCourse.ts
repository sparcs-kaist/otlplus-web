import Department from './Department';

export default interface NestedCourse {
  id: number;
  old_code: string;
  department: Department;
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
}
