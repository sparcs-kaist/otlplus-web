import type Department from '../subject/Department';
import type { SemesterType } from '@/shapes/enum';

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
