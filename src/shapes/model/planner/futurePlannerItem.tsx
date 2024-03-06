import course from '../subject/course';

export default interface futurePlannerItem {
  id: number;
  item_type: 'FUTURE';
  is_excluded: boolean;
  year: number;
  semester: 1 | 2 | 3 | 4;
  course: course;
}
