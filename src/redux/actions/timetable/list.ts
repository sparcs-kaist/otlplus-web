import { LectureListCode } from '@/shapes/enum';
import Lecture from '@/shapes/model/subject/Lecture';

const BASE_STRING = 'T_L_';

export const RESET = `${BASE_STRING}RESET` as const;
export const SET_SELECTED_LIST_CODE = `${BASE_STRING}SET_SELECTED_LIST_CODE` as const;
export const SET_LIST_LECTURES = `${BASE_STRING}SET_LIST_LECTURES` as const;
export const CLEAR_ALL_LISTS_LECTURES = `${BASE_STRING}CLEAR_ALL_LISTS_LECTURES` as const;
export const CLEAR_SEARCH_LIST_LECTURES = `${BASE_STRING}CLEAR_SEARCH_LIST_LECTURES` as const;
export const ADD_LECTURE_TO_CART = `${BASE_STRING}ADD_LECTURE_TO_CART` as const;
export const DELETE_LECTURE_FROM_CART = `${BASE_STRING}DELETE_LECTURE_FROM_CART` as const;
export const SET_MOBILE_IS_LECTURE_LIST_OPEN =
  `${BASE_STRING}SET_MOBILE_IS_LECTURE_LIST_OPEN` as const;

export function reset() {
  return {
    type: RESET,
  };
}

export function setSelectedListCode(listCode: LectureListCode) {
  return {
    type: SET_SELECTED_LIST_CODE,
    listCode: listCode,
  };
}

export function setListLectures(code: LectureListCode, lectures: Lecture[]) {
  return {
    type: SET_LIST_LECTURES,
    code: code,
    lectures: lectures,
  };
}

export function clearAllListsLectures() {
  return {
    type: CLEAR_ALL_LISTS_LECTURES,
  };
}

export function clearSearchListLectures() {
  return {
    type: CLEAR_SEARCH_LIST_LECTURES,
  };
}

export function addLectureToCart(lecture: Lecture) {
  return {
    type: ADD_LECTURE_TO_CART,
    lecture: lecture,
  };
}

export function deleteLectureFromCart(lecture: Lecture) {
  return {
    type: DELETE_LECTURE_FROM_CART,
    lecture: lecture,
  };
}

export function setIsLectureListOpenOnMobile(isLectureListOpenOnMobile: boolean) {
  return {
    type: SET_MOBILE_IS_LECTURE_LIST_OPEN,
    isLectureListOpenOnMobile: isLectureListOpenOnMobile,
  };
}

export type LectureListAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof setSelectedListCode>
  | ReturnType<typeof setListLectures>
  | ReturnType<typeof clearAllListsLectures>
  | ReturnType<typeof clearSearchListLectures>
  | ReturnType<typeof addLectureToCart>
  | ReturnType<typeof deleteLectureFromCart>
  | ReturnType<typeof setIsLectureListOpenOnMobile>;
