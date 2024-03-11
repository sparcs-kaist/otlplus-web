import course from '../subject/course';
import lecture from '../subject/lecture';

export default interface takenPlannerItem {
  id: number;
  item_type: 'TAKEN';
  is_excluded: boolean;
  lecture: lecture;
  course: course;
}
