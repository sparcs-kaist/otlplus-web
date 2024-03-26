import Review from '@/shapes/model/review/Review';

const BASE_STRING = 'WR_LkR_';

/* eslint-disable prefer-template */
export const RESET = `${BASE_STRING}RESET` as const;
export const SET_REVIEWS = `${BASE_STRING}SET_REVIEWS` as const;
export const UPDATE_REVIEW = `${BASE_STRING}UPDATE_REVIEW` as const;
/* eslint-enable prefer-template */

export function reset() {
  return {
    type: RESET,
  };
}

export function setReviews(reviews: Review[]) {
  return {
    type: SET_REVIEWS,
    reviews: reviews,
  };
}

export function updateReview(review: Review, isNew: boolean) {
  return {
    type: UPDATE_REVIEW,
    review: review,
    isNew: isNew,
  };
}

export type LikedReviewsAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof setReviews>
  | ReturnType<typeof updateReview>;
