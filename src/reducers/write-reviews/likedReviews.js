import { RESET, SET_REVIEWS } from '../../actions/write-reviews/likedReviews';

const initialState = {
  reviews: null,
};

const likedReviews = (state = initialState, action) => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_REVIEWS: {
      return Object.assign({}, state, {
        reviews: action.reviews,
      });
    }
    default: {
      return state;
    }
  }
};

export default likedReviews;
