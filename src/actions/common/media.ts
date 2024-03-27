const BASE_STRING = 'C_M_';

/* eslint-disable prefer-template */
export const SET_IS_PORTRAIT = `${BASE_STRING}SET_IS_PORTRAIT` as const;
/* eslint-enable prefer-template */

export function setIsPortrait(isPortrait: boolean) {
  return {
    type: SET_IS_PORTRAIT,
    isPortrait: isPortrait,
  };
}

export type MediaAction = ReturnType<typeof setIsPortrait>;
