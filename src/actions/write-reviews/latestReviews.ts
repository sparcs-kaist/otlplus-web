import Review from '@/shapes/model/review/Review';

const BASE_STRING = 'WR_LR_';

/* eslint-disable prefer-template */
export const RESET = `${BASE_STRING}RESET` as const;
export const ADD_REVIEWS = `${BASE_STRING}ADD_REVIEWS` as const;
export const UPDATE_REVIEW = `${BASE_STRING}UPDATE_REVIEW` as const;
/* eslint-enable prefer-template */

export function reset() {
  return {
    type: RESET,
  };
}

export function addReviews(reviews: Review[]) {
  return {
    type: ADD_REVIEWS,
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

export type LatestReviewsAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof addReviews>
  | ReturnType<typeof updateReview>;
