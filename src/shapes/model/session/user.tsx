import lecture from '../subject/lecture';
import review from '../review/review';
import department from '../subject/department';

interface user {
  id: number;
  email: string;
  student_id: string;
  firstName: string;
  lastName: string;
  majors: Array<department>;
  department?: department;
  departments: Array<department>;
  favorite_departments?: Array<department>;
  review_writable_lectures: Array<lecture>;
  my_timetable_lectures: Array<lecture>;
  reviews: Array<review>;
}

export default user;
