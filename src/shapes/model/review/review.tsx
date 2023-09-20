import nestedCourse from '../subject/nestedCourse';
import nestedLecture from '../subject/nestedLecture';

interface review {
  id: number;
  course: nestedCourse;
  lecture: nestedLecture;
  content: string;
  like: number;
  is_deleted: number;
  grade: number;
  load: number;
  speech: number;
  userspecific_is_liked: boolean;
}

export default review;
