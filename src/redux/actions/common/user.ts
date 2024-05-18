const BASE_STRING = 'C_U_';

export const SET_USER = `${BASE_STRING}SET_USER` as const;
export const UPDATE_USER_REVIEW = `${BASE_STRING}UPDATE_USER_REVIEW` as const;

import User from '@/shapes/model/session/User';
import Review from '@/shapes/model/review/Review';

export function setUser(user: User) {
  return {
    type: SET_USER,
    user: user,
  };
}

export function updateUserReview(review: Review) {
  return {
    type: UPDATE_USER_REVIEW,
    review: review,
  };
}

export type UserAction = ReturnType<typeof setUser> | ReturnType<typeof updateUserReview>;
