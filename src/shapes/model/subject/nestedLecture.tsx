import nestedProfessor from './nestedProfessor';
import { SemesterType } from '@/shapes/enum';
interface nestedLecture {
  id: number;
  title: string;
  title_en: string;
  course: number;
  old_code: string;
  class_no: string;
  year: number;
  semester: SemesterType;
  code: string;
  department: number;
  department_code: string;
  department_name: string;
  department_name_en: string;
  type: string;
  type_en: string;
  limit: number;
  num_people: number;
  is_english: boolean;
  num_classes: number;
  num_labs: number;
  credit: number;
  credit_au: number;
  common_title: string;
  common_title_en: string;
  class_title: string;
  class_title_en: string;
  review_total_weight: number;
  professors: nestedProfessor[];
}

export default nestedLecture;
