import Review from '@/shapes/model/review/Review';

const BASE_STRING = 'WR_LkR_';

export const RESET = `${BASE_STRING}RESET` as const;
export const SET_REVIEWS = `${BASE_STRING}SET_REVIEWS` as const;

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

export type LikedReviewsAction = ReturnType<typeof reset> | ReturnType<typeof setReviews>;
