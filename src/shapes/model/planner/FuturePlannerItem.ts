import type Course from '../subject/Course';
import type { SemesterType, PlannerItemType } from '@/shapes/enum';

export default interface FuturePlannerItem {
  id: number;
  item_type: PlannerItemType.FUTURE;
  is_excluded: boolean;
  year: number;
  semester: SemesterType;
  course: Course;
}
