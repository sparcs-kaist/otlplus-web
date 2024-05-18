import {
  RESET,
  ADD_SEMESTER_REVIEWS,
  SET_SEMESTER_REVIEW_COUNT,
  RankedReviewsAction,
} from '@/redux/actions/write-reviews/rankedReviews';
import Review from '@/shapes/model/review/Review';

interface RankedReviewState {
  reviewsBySemester: {
    [semester: string]: Review[];
  };
  reviewCountBySemester: {
    [semester: string]: number;
  };
}

const initialState: RankedReviewState = {
  reviewsBySemester: {},
  reviewCountBySemester: {},
};

const latestReviews = (state = initialState, action: RankedReviewsAction): RankedReviewState => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case ADD_SEMESTER_REVIEWS: {
      const prevReviewsOfSemester = state.reviewsBySemester[action.semester] || [];
      return {
        ...state,
        reviewsBySemester: {
          ...state.reviewsBySemester,
          [action.semester]: prevReviewsOfSemester.concat(action.reviews),
        },
      };
    }
    case SET_SEMESTER_REVIEW_COUNT: {
      return {
        ...state,
        reviewCountBySemester: {
          ...state.reviewCountBySemester,
          [action.semester]: action.count,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default latestReviews;
