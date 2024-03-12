import course from '../subject/course';
import { SemesterType } from '@/shapes/enum';
export default interface futurePlannerItem {
  id: number;
  item_type: 'FUTURE';
  is_excluded: boolean;
  year: number;
  semester: SemesterType;
  course: course;
}
