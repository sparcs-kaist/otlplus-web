const BASE_STRING = 'D_CA_';

/* eslint-disable prefer-template */
export const RESET = `${BASE_STRING}RESET` as const;
export const OPEN_SEARCH = `${BASE_STRING}OPEN_SEARCH` as const;
export const CLOSE_SEARCH = `${BASE_STRING}CLOSE_SEARCH` as const;
export const SET_LAST_SEARCH_OPTION = `${BASE_STRING}SET_LAST_SEARCH_OPTION` as const;
/* eslint-enable prefer-template */

import CourseLastSearchOption from '@/shapes/state/dictionary/CourseLastSearchOption';

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

export function setLastSearchOption(lastSearchOption: CourseLastSearchOption) {
  return {
    type: SET_LAST_SEARCH_OPTION,
    lastSearchOption: lastSearchOption,
  };
}

export type CourseAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof openSearch>
  | ReturnType<typeof closeSearch>
  | ReturnType<typeof setLastSearchOption>;
