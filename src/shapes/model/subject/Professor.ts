import NestedCourse from './NestedCourse';

export default interface Professor {
  name: string;
  name_en: string;
  professor_id: number;
  review_total_weight: number;
  courses: NestedCourse[];
  grade: number;
  load: number;
  speech: number;
}
