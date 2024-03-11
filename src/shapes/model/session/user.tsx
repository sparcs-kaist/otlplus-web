import lecture from '../subject/lecture';
import review from '../review/review';
import department from '../subject/department';

interface user {
  id: number;
  email: string;
  student_id: string;
  firstName: string;
  lastName: string;
  majors: department[];
  department?: department;
  departments: department[];
  favorite_departments?: department[];
  review_writable_lectures: lecture[];
  my_timetable_lectures: lecture[];
  reviews: review[];
}

export default user;
