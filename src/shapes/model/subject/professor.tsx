import nestedCourse from './nestedCourse';

interface professor {
  name: string;
  name_en: string;
  professor_id: number;
  review_total_weight: number;
  courses: nestedCourse[];
  grade: number;
  load: number;
  speech: number;
}

export default professor;
