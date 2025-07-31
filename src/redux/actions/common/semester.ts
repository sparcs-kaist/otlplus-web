const BASE_STRING = 'C_S_';

export const SET_SEMESTERS = `${BASE_STRING}SET_SEMESTERS` as const;
export const SET_CURRENT_SEMESTER = `${BASE_STRING}SET_CURRENT_SEMESTER` as const;

import Semester from '@/shapes/model/subject/Semester';

/**
 * Creates an action to set the list of semesters in the state.
 *
 * @param semesters - The array of Semester objects to set
 * @returns An action object with type SET_SEMESTERS and the semesters payload
 */
export function setSemesters(semesters: Semester[]) {
  return {
    type: SET_SEMESTERS,
    semesters: semesters,
  };
}

/**
 * Creates an action to set the current semester in the state.
 *
 * @param semester - The semester to be set as current
 * @returns An action object with type `SET_CURRENT_SEMESTER` and the specified semester
 */
export function setCurrentSemester(semester: Semester) {
  return {
    type: SET_CURRENT_SEMESTER,
    semester,
  };
}

export type SemesterAction =
  | ReturnType<typeof setSemesters>
  | ReturnType<typeof setCurrentSemester>;
