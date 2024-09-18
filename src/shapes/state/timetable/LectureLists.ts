import type Lecture from '@/shapes/model/subject/Lecture';

interface LectureGroups {
  lectureGroups: Lecture[][];
}
export default interface LectureLists {
  search: LectureGroups;
  basic: LectureGroups;
  humanity: LectureGroups;
  cart: LectureGroups;
}
