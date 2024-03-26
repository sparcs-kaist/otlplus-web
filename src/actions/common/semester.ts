const BASE_STRING = 'C_S_';

/* eslint-disable prefer-template */
export const SET_SEMESTERS = `${BASE_STRING}SET_SEMESTERS` as const;
/* eslint-enable prefer-template */

import Semester from '@/shapes/model/subject/Semester';

export function setSemesters(semesters: Semester[]) {
  return {
    type: SET_SEMESTERS,
    semesters: semesters,
  };
}

export type SemesterAction = ReturnType<typeof setSemesters>;
