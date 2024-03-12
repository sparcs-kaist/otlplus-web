import Department from '../subject/Department';
import { SemesterType } from '@/shapes/enum';

export default interface ArbitraryPlannerItem {
  id: number;
  item_type: 'ARBITRARY';
  is_excluded: boolean;
  year: number;
  semester: SemesterType;
  department?: Department;
  type: string;
  type_en: string;
  credit: number;
  credit_au: number;
}
