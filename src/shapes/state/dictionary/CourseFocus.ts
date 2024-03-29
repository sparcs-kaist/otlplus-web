import type Course from '@/shapes/model/subject/Course';
import type Lecture from '@/shapes/model/subject/Lecture';
import type Review from '@/shapes/model/review/Review';

interface NullCourseFocus {
  course: null;
  reviews: null;
  lectures: null;
}

interface FullCourseFocus {
  course: Course;
  reviews: Review[];
  lectures: Lecture[];
}

type CourseFocus = NullCourseFocus | FullCourseFocus;

export default CourseFocus;
