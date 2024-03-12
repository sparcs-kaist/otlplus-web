import type Course from '../subject/Course';
import type Lecture from '../subject/Lecture';

export default interface TakenPlannerItem {
  id: number;
  item_type: 'TAKEN';
  is_excluded: boolean;
  lecture: Lecture;
  course: Course;
}
