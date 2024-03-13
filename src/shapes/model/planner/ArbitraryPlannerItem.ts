import type Department from '../subject/Department';
import type { SemesterType, PlannerItemType } from '@/shapes/enum';

export default interface ArbitraryPlannerItem {
  id: number;
  item_type: PlannerItemType.ARBITRARY;
  is_excluded: boolean;
  year: number;
  semester: SemesterType;
  department?: Department;
  type: string;
  type_en: string;
  credit: number;
  credit_au: number;
}
