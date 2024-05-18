import { LikedReviewsAction, RESET, SET_REVIEWS } from '@/actions/write-reviews/likedReviews';
import Review from '@/shapes/model/review/Review';
interface LikedReviewsState {
  reviews: Review[] | null;
}

const initialState: LikedReviewsState = {
  reviews: null,
};

const likedReviews = (state = initialState, action: LikedReviewsAction): LikedReviewsState => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_REVIEWS: {
      return { ...state, reviews: action.reviews };
    }
    default: {
      return state;
    }
  }
};

export default likedReviews;
