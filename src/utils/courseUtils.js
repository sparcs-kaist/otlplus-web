import i18n from 'i18next';

export const isFocused = (course, courseFocus) =>
  Boolean(courseFocus.course) && courseFocus.course.id === course.id;

export const isDimmedCourse = (course, courseFocus) =>
  Boolean(courseFocus.course) && courseFocus.course.id !== course.id;

export const isTaken = (courseId, user) =>
  user.review_writable_lectures.some((l) => l.course === courseId);

export const getProfessorsFullStr = (course) => {
  const professors = course.professors.slice().sort((a, b) => (a.name < b.name ? -1 : 1));
  const professorNames = professors.map((p) => p[i18n.t('js.property.name')]);
  return professorNames.join(', ');
};

export const isSpecialLectureCourse = (course) =>
  course.title.includes('특강') ||
  course.title_en.includes('Special Lectures') ||
  course.title_en.includes('Special Topics');
