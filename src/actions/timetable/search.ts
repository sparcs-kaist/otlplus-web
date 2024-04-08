import LectureLastSearchOption from '@/shapes/state/timetable/LectureLastSearchOption';

const BASE_STRING = 'T_S_';

export const RESET = `${BASE_STRING}RESET` as const;
export const OPEN_SEARCH = `${BASE_STRING}OPEN_SEARCH` as const;
export const CLOSE_SEARCH = `${BASE_STRING}CLOSE_SEARCH` as const;
export const SET_CLASSTIME_OPTIONS = `${BASE_STRING}SET_CLASSTIME_OPTIONS` as const;
export const CLEAR_CLASSTIME_OPTIONS = `${BASE_STRING}CLEAR_CLASSTIME_OPTIONS` as const;
export const SET_LAST_SEARCH_OPTION = `${BASE_STRING}SET_LAST_SEARCH_OPTION` as const;

export function reset() {
  return {
    type: RESET,
  };
}

export function openSearch() {
  return {
    type: OPEN_SEARCH,
  };
}

export function closeSearch() {
  return {
    type: CLOSE_SEARCH,
  };
}

export function setLastSearchOption(lastSearchOption: LectureLastSearchOption) {
  return {
    type: SET_LAST_SEARCH_OPTION,
    lastSearchOption: lastSearchOption,
  };
}

export function setClasstimeOptions(
  classtimeDay: number,
  classtimeBegin: number,
  classtimeEnd: number,
) {
  return {
    type: SET_CLASSTIME_OPTIONS,
    classtimeDay: classtimeDay,
    classtimeBegin: classtimeBegin,
    classtimeEnd: classtimeEnd,
  };
}

export function clearClasstimeOptions() {
  return {
    type: CLEAR_CLASSTIME_OPTIONS,
  };
}

export type SearchAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof openSearch>
  | ReturnType<typeof closeSearch>
  | ReturnType<typeof setClasstimeOptions>
  | ReturnType<typeof clearClasstimeOptions>
  | ReturnType<typeof setLastSearchOption>;
