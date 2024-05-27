import { ReviewsFocusFrom } from '@/shapes/enum';
import Review from '@/shapes/model/review/Review';
import Lecture from '@/shapes/model/subject/Lecture';

const BASE_STRING = 'WR_RF_';

export const RESET = `${BASE_STRING}RESET` as const;
export const SET_REVIEWS_FOCUS = `${BASE_STRING}SET_REVIEWS_FOCUS` as const;
export const CLEAR_REVIEWS_FOCUS = `${BASE_STRING}CLEAR_REVIEWS_FOCUS` as const;
export const SET_REVIEWS = `${BASE_STRING}SET_REVIEWS` as const;

export function reset() {
  return {
    type: RESET,
  };
}

export function setReviewsFocus(from: ReviewsFocusFrom, lecture: Lecture | null) {
  return {
    type: SET_REVIEWS_FOCUS,
    from: from,
    lecture: lecture,
  };
}

export function clearReviewsFocus() {
  return {
    type: CLEAR_REVIEWS_FOCUS,
  };
}

export function setReviews(reviews: Review[]) {
  return {
    type: SET_REVIEWS,
    reviews: reviews,
  };
}

export type ReviewsFocusAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof setReviewsFocus>
  | ReturnType<typeof clearReviewsFocus>
  | ReturnType<typeof setReviews>;
