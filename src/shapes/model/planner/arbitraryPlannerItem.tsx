import department from '../subject/department';
import { SemesterType } from '@/shapes/enum';
export default interface arbitraryPlannerItem {
  id: number;
  item_type: 'ARBITRARY';
  is_excluded: boolean;
  year: number;
  semester: SemesterType;
  department?: department;
  type: string;
  type_en: string;
  credit: number;
  credit_au: number;
}
