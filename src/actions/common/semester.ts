const BASE_STRING = 'C_S_';

export const SET_SEMESTERS = `${BASE_STRING}SET_SEMESTERS` as const;

import Semester from '@/shapes/model/subject/Semester';

export function setSemesters(semesters: Semester[]) {
  return {
    type: SET_SEMESTERS,
    semesters: semesters,
  };
}

export type SemesterAction = ReturnType<typeof setSemesters>;
