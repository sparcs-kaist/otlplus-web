import Course from '@/shapes/model/subject/Course';
import User from '@/shapes/model/session/User';
import CourseFocus from '@/shapes/state/dictionary/CourseFocus';
import { getTranslatedString } from '@/utils/translationUtils';

//Dictionary Page 에서 사용되는 유틸들입니다.

// Dictionary Page 의 Course List Section 에서 포커싱된 Course가 현재 Course이면 True를 반환합니다.
export const isFocused = (course: Course, courseFocus: CourseFocus) =>
  Boolean(courseFocus.course) && courseFocus.course?.id === course.id;

// Dictionary Page 의 Course List Section 에서 포커싱된 Course가 있고, 포커싱된 Course가 현재 Course가 아니면 True를 반환합니다.
export const isDimmedCourse = (course: Course, courseFocus: CourseFocus) =>
  Boolean(courseFocus.course) && courseFocus.course?.id !== course.id;

// Dictionary Page의  Course List Section에서 이미 수강한 Course 이면 True를 반환합니다.
// isTaken 이 True 이면 리뷰 작성하기 블록이 보여집니다.
export const isTaken = (courseId: number, user: User) =>
  user.review_writable_lectures.some((l) => l.course === courseId);

// Dictionary Page의 Course Block 에서 교수님들의 이름 리스트를 가져오기 위해 사용합니다.
export const getProfessorsFullStr = (course: Course) => {
  const professors = course.professors.slice().sort((a, b) => (a.name < b.name ? -1 : 1));
  const professorNames = professors.map((p) => getTranslatedString(p, 'name'));
  return professorNames.join(', ');
};

export const isSpecialLectureCourse = (course: Course) =>
  course.title.includes('특강') ||
  course.title_en.includes('Special Lectures') ||
  course.title_en.includes('Special Topics');
