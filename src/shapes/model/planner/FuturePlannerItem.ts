import Course from '../subject/Course';
import { SemesterType } from '@/shapes/enum';

export default interface FuturePlannerItem {
  id: number;
  item_type: 'FUTURE';
  is_excluded: boolean;
  year: number;
  semester: SemesterType;
  course: Course;
}