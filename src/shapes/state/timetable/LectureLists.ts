import type Lecture from '@/shapes/model/subject/Lecture';

export default interface LectureLists {
  search: {
    lectureGroups: Lecture[][];
  };
  basic: {
    lectureGroups: Lecture[][];
  };
  humanity: {
    lectureGroups: Lecture[][];
  };
  cart: {
    lectureGroups: Lecture[][];
  };
}
