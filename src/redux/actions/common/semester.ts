const BASE_STRING = 'C_S_';

export const SET_SEMESTERS = `${BASE_STRING}SET_SEMESTERS` as const;
export const SET_CURRENT_SEMESTER = `${BASE_STRING}SET_CURRENT_SEMESTER` as const;

import Semester from '@/shapes/model/subject/Semester';

export function setSemesters(semesters: Semester[]) {
  return {
    type: SET_SEMESTERS,
    semesters: semesters,
  };
}

export function setCurrentSemester(semester: Semester) {
  return {
    type: SET_CURRENT_SEMESTER,
    semester,
  };
}

export type SemesterAction =
  | ReturnType<typeof setSemesters>
  | ReturnType<typeof setCurrentSemester>;
