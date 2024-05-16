import {
  RESET,
  SET_REVIEWS_FOCUS,
  CLEAR_REVIEWS_FOCUS,
  SET_REVIEWS,
  ReviewsFocusAction,
} from '@/actions/write-reviews/reviewsFocus';

import { ReviewsFocusFrom } from '@/shapes/enum';
import Review from '@/shapes/model/review/Review';
import Lecture from '@/shapes/model/subject/Lecture';

interface ReviewsFocusState {
  from: ReviewsFocusFrom;
  lecture: Lecture | null;
  reviews: Review[] | null;
}

const initialState: ReviewsFocusState = {
  from: ReviewsFocusFrom.NONE,
  lecture: null,
  reviews: null,
};

const reviewsFocus = (state = initialState, action: ReviewsFocusAction) => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_REVIEWS_FOCUS: {
      return {
        ...state,
        from: action.from,
        lecture: action.lecture,
        reviews: null,
      };
    }
    case CLEAR_REVIEWS_FOCUS: {
      return {
        ...state,
        from: ReviewsFocusFrom.NONE,
        lecture: null,
        reviews: null,
      };
    }
    case SET_REVIEWS: {
      return {
        ...state,
        reviews: action.reviews,
      };
    }
    default: {
      return state;
    }
  }
};

export default reviewsFocus;
