import { useTranslatedString } from './../hooks/useTranslatedString';
import i18n from 'i18next';
import Course from '@/shapes/model/subject/Course';
import { FullCourseFocus } from '@/shapes/state/dictionary/CourseFocus';
import User from '@/shapes/model/session/User';

export const isFocused = (course: Course, courseFocus: FullCourseFocus) =>
  Boolean(courseFocus.course) && courseFocus.course.id === course.id;

export const isDimmedCourse = (course: Course, courseFocus: FullCourseFocus) =>
  Boolean(courseFocus.course) && courseFocus.course.id !== course.id;

export const isTaken = (courseId: number, user: User) =>
  user.review_writable_lectures.some((l) => l.course === courseId);

export const getProfessorsFullStr = (course: Course) => {
  const translate = useTranslatedString();
  const professors = course.professors.slice().sort((a, b) => (a.name < b.name ? -1 : 1));
  const professorNames = professors.map((p) => translate(p, 'name'));
  return professorNames.join(', ');
};

export const isSpecialLectureCourse = (course: Course) =>
  course.title.includes('특강') ||
  course.title_en.includes('Special Lectures') ||
  course.title_en.includes('Special Topics');
