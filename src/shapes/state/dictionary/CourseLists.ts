import Course from '@/shapes/model/subject/Course';

export default interface CourseLists {
  search: {
    courses: Course[];
  };
  basic: {
    courses: Course[];
  };
  humanity: {
    courses: Course[];
  };
  taken: {
    courses: Course[];
  };
}
