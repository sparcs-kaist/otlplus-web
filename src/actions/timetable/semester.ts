import { SemesterType } from '@/shapes/enum';

const BASE_STRING = 'T_SM_';

export const RESET = `${BASE_STRING}RESET` as const;
export const SET_SEMESTER = `${BASE_STRING}SET_SEMESTER` as const;

export function reset() {
  return {
    type: RESET,
  };
}

export function setSemester(year: number, semester: SemesterType) {
  return {
    type: SET_SEMESTER,
    year: year,
    semester: semester,
  };
}

export type SemesterAction = ReturnType<typeof reset> | ReturnType<typeof setSemester>;
