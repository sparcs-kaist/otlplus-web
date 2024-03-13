import type Lecture from '../subject/Lecture';
import type Review from '../review/Review';
import type Department from '../subject/Department';

export default interface User {
  id: number;
  email: string;
  student_id: string;
  firstName: string;
  lastName: string;
  majors: Department[];
  department?: Department;
  departments: Department[];
  favorite_departments?: Department[];
  review_writable_lectures: Lecture[];
  my_timetable_lectures: Lecture[];
  reviews: Review[];
}
