import Lecture from '@/shapes/model/subject/Lecture';
import Timetable from '@/shapes/model/timetable/Timetable';

const BASE_STRING = 'T_T_';

export const RESET = `${BASE_STRING}RESET` as const;
export const SET_TIMETABLES = `${BASE_STRING}SET_TIMETABLES` as const;
export const CLEAR_TIMETABLES = `${BASE_STRING}CLEAR_TIMETABLES` as const;
export const SET_MY_TIMETABLE_LECTURES = `${BASE_STRING}SET_MY_TIMETABLE_LECTURES` as const;
export const SET_SELECTED_TIMETABLE = `${BASE_STRING}SET_SELECTED_TIMETABLE` as const;
export const CREATE_TIMETABLE = `${BASE_STRING}CREATE_TIMETABLE` as const;
export const DELETE_TIMETABLE = `${BASE_STRING}DELETE_TIMETABLE` as const;
export const DUPLICATE_TIMETABLE = `${BASE_STRING}DUPLICATE_TIMETABLE` as const;
export const ADD_LECTURE_TO_TIMETABLE = `${BASE_STRING}ADD_LECTURE_TO_TIMETABLE` as const;
export const REMOVE_LECTURE_FROM_TIMETABLE = `${BASE_STRING}REMOVE_LECTURE_FROM_TIMETABLE` as const;
export const REORDER_TIMETABLE = `${BASE_STRING}REORDER_TIMETABLE` as const;
export const UPDATE_CELL_SIZE = `${BASE_STRING}UPDATE_CELL_SIZE` as const;
export const SET_IS_DRAGGING = `${BASE_STRING}SET_IS_DRAGGING` as const;
export const SET_MOBILE_IS_TIMETABLE_TABS_OPEN =
  `${BASE_STRING}SET_MOBILE_IS_TIMETABLE_TABS_OPEN` as const;

export function reset() {
  return {
    type: RESET,
  };
}

export function addLectureToTimetable(lecture: Lecture) {
  return {
    type: ADD_LECTURE_TO_TIMETABLE,
    lecture: lecture,
  };
}

export function removeLectureFromTimetable(lecture: Lecture) {
  return {
    type: REMOVE_LECTURE_FROM_TIMETABLE,
    lecture: lecture,
  };
}

export function setTimetables(timetables: Timetable[]) {
  return {
    type: SET_TIMETABLES,
    timetables: timetables,
  };
}

export function clearTimetables() {
  return {
    type: CLEAR_TIMETABLES,
  };
}

export function setMyTimetableLectures(lectures: Lecture[]) {
  return {
    type: SET_MY_TIMETABLE_LECTURES,
    lectures: lectures,
  };
}

export function setSelectedTimetable(timetable: Timetable) {
  return {
    type: SET_SELECTED_TIMETABLE,
    timetable: timetable,
  };
}

export function createTimetable(id: number) {
  return {
    type: CREATE_TIMETABLE,
    id: id,
  };
}

export function deleteTimetable(timetable: Timetable) {
  return {
    type: DELETE_TIMETABLE,
    timetable: timetable,
  };
}

export function duplicateTimetable(id: number, timetable: Timetable) {
  return {
    type: DUPLICATE_TIMETABLE,
    id: id,
    timetable: timetable,
  };
}

export function reorderTimetable(timetable: Timetable, arrangeOrder: number) {
  return {
    type: REORDER_TIMETABLE,
    timetable: timetable,
    arrangeOrder: arrangeOrder,
  };
}

export function updateCellSize(width: number, height: number) {
  return {
    type: UPDATE_CELL_SIZE,
    width: width,
    height: height,
  };
}

export function setIsDragging(isDragging: boolean) {
  return {
    type: SET_IS_DRAGGING,
    isDragging: isDragging,
  };
}

export function setIsTimetableTabsOpenOnMobile(isTimetableTabsOpenOnMobile: boolean) {
  return {
    type: SET_MOBILE_IS_TIMETABLE_TABS_OPEN,
    isTimetableTabsOpenOnMobile: isTimetableTabsOpenOnMobile,
  };
}

export type TimetableAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof addLectureToTimetable>
  | ReturnType<typeof removeLectureFromTimetable>
  | ReturnType<typeof setTimetables>
  | ReturnType<typeof clearTimetables>
  | ReturnType<typeof setMyTimetableLectures>
  | ReturnType<typeof setSelectedTimetable>
  | ReturnType<typeof createTimetable>
  | ReturnType<typeof deleteTimetable>
  | ReturnType<typeof duplicateTimetable>
  | ReturnType<typeof reorderTimetable>
  | ReturnType<typeof updateCellSize>
  | ReturnType<typeof setIsDragging>
  | ReturnType<typeof setIsTimetableTabsOpenOnMobile>;
