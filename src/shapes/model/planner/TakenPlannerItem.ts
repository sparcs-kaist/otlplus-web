import type Course from '../subject/Course';
import type Lecture from '../subject/Lecture';
import type { PlannerItemType } from '@/shapes/enum';

export default interface TakenPlannerItem {
  id: number;
  item_type: PlannerItemType.TAKEN;
  is_excluded: boolean;
  lecture: Lecture;
  course: Course;
}
