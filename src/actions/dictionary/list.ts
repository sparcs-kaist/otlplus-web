const BASE_STRING = 'D_L_';

export const RESET = `${BASE_STRING}RESET` as const;
export const SET_SELECTED_LIST_CODE = `${BASE_STRING}SER_SELECTED_LIST_CODE` as const;
export const SET_LIST_COURSES = `${BASE_STRING}SET_LIST_COURSES` as const;
export const CLEAR_SEARCH_LIST_COURSES = `${BASE_STRING}CLEAR_SEARCH_LIST_COURSES` as const;
export const ADD_COURSE_READ = `${BASE_STRING}ADD_COURSE_READ` as const;

import { CourseListCode } from '@/shapes/enum';
import Course from '@/shapes/model/subject/Course';

export function reset() {
  return {
    type: RESET,
  };
}

export function setSelectedListCode(listCode: CourseListCode) {
  return {
    type: SET_SELECTED_LIST_CODE,
    listCode: listCode,
  };
}

export function setListCourses(code: CourseListCode, courses: Course[]) {
  return {
    type: SET_LIST_COURSES,
    code: code,
    courses: courses,
  };
}

export function clearSearchListCourses() {
  return {
    type: CLEAR_SEARCH_LIST_COURSES,
  };
}

export function addCourseRead(course: Course) {
  return {
    type: ADD_COURSE_READ,
    course: course,
  };
}

export type DictionaryAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof setSelectedListCode>
  | ReturnType<typeof setListCourses>
  | ReturnType<typeof clearSearchListCourses>
  | ReturnType<typeof addCourseRead>;
