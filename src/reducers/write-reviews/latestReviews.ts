import {
  RESET,
  ADD_REVIEWS,
  UPDATE_REVIEW,
  LatestReviewsAction,
} from '@/actions/write-reviews/latestReviews';
import Review from '@/shapes/model/review/Review';

interface LatestReviewsState {
  reviews: Review[] | null;
}

const initialState: LatestReviewsState = {
  reviews: null,
};

const latestReviews = (state = initialState, action: LatestReviewsAction): LatestReviewsState => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case ADD_REVIEWS: {
      const newReviews = [...(state.reviews !== null ? state.reviews : []), ...action.reviews];
      return {
        ...state,
        reviews: newReviews,
      };
    }
    case UPDATE_REVIEW: {
      if (!state.reviews) {
        return state;
      }
      const originalReviews = state.reviews;
      const { review, isNew } = action;
      const foundIndex = originalReviews.findIndex((r) => r.id === review.id);
      const newReviews =
        foundIndex !== -1
          ? [
              ...originalReviews.slice(0, foundIndex),
              review,
              ...originalReviews.slice(foundIndex + 1, originalReviews.length),
            ]
          : isNew
          ? [review, ...originalReviews.slice()]
          : [...originalReviews.slice()];
      return {
        ...state,
        reviews: newReviews,
      };
    }
    default: {
      return state;
    }
  }
};

export default latestReviews;
