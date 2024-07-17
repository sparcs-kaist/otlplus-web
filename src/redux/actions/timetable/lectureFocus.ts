import { LectureFocusFrom } from '@/shapes/enum';
import Review from '@/shapes/model/review/Review';
import Lecture from '@/shapes/model/subject/Lecture';
import { Detail } from '@/shapes/state/timetable/LectureFocus';

const BASE_STRING = 'T_LA_';

export const RESET = `${BASE_STRING}RESET` as const;
export const SET_LECTURE_FOCUS = `${BASE_STRING}SET_LECTURE_FOCUS` as const;
export const CLEAR_LECTURE_FOCUS = `${BASE_STRING}CLEAR_LECTURE_FOCUS` as const;
export const SET_REVIEWS = `${BASE_STRING}SET_REVIEWS` as const;
export const SET_MULTIPLE_FOCUS = `${BASE_STRING}SET_MULTIPLE_FOCUS` as const;
export const CLEAR_MULTIPLE_FOCUS = `${BASE_STRING}CLEAR_MULTIPLE_FOCUS` as const;

type LectureFocusFromListOrTable = LectureFocusFrom.LIST | LectureFocusFrom.TABLE;

export function reset() {
  return {
    type: RESET,
  };
}

export function setLectureFocus(
  lecture: Lecture,
  from: LectureFocusFromListOrTable,
  clicked: boolean,
) {
  return {
    type: SET_LECTURE_FOCUS,
    lecture: lecture,
    from: from,
    clicked: clicked,
  };
}

export function clearLectureFocus() {
  return {
    type: CLEAR_LECTURE_FOCUS,
  };
}

export function setReviews(reviews: Review[]) {
  return {
    type: SET_REVIEWS,
    reviews: reviews,
  };
}

export function setMultipleFocus(multipleTitle: string, multipleDetails: Detail[]) {
  return {
    type: SET_MULTIPLE_FOCUS,
    multipleTitle: multipleTitle,
    multipleDetails: multipleDetails,
  };
}

export function clearMultipleFocus() {
  return {
    type: CLEAR_MULTIPLE_FOCUS,
  };
}

export type LectureFocusAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof setLectureFocus>
  | ReturnType<typeof clearLectureFocus>
  | ReturnType<typeof setReviews>
  | ReturnType<typeof setMultipleFocus>
  | ReturnType<typeof clearMultipleFocus>;
