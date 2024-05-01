import Course from '@/shapes/model/subject/Course';
import {
  RESET,
  SET_COURSE_FOCUS,
  CLEAR_COURSE_FOCUS,
  SET_REVIEWS,
  UPDATE_REVIEW,
  SET_LECTURES,
  DictionaryAction,
} from '@/actions/dictionary/courseFocus';
import Lecture from '@/shapes/model/subject/Lecture';
import Review from '@/shapes/model/review/Review';

interface CourseFocusState {
  course: Course | null;
  lectures: Lecture[] | null;
  reviews: Review[] | null;
}

const initialState: CourseFocusState = {
  course: null,
  reviews: null,
  lectures: null,
};

const courseFocus = (state = initialState, action: DictionaryAction) => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_COURSE_FOCUS: {
      const courseChanged = !state.course || state.course.id !== action.course.id;

      return {
        ...state,
        course: action.course,
        reviews: courseChanged ? null : state.reviews,
        lectures: courseChanged ? null : state.lectures,
      };
    }
    case CLEAR_COURSE_FOCUS: {
      return { ...state, course: null, reviews: null, lectures: null };
    }
    case SET_REVIEWS: {
      return { ...state, reviews: action.reviews };
    }
    case UPDATE_REVIEW: {
      const originalReviews = state.reviews;
      const { review, isNew } = action;
      const foundIndex = originalReviews?.findIndex((r) => r.id === review.id) ?? -1;
      const newReviews =
        foundIndex !== -1
          ? [
              ...originalReviews!.slice(0, foundIndex),
              review,
              ...originalReviews!.slice(foundIndex + 1, originalReviews!.length),
            ]
          : isNew
          ? [review, ...(originalReviews?.slice() ?? [])]
          : [...(originalReviews?.slice() ?? [])];
      return { ...state, reviews: newReviews };
    }
    case SET_LECTURES: {
      return { ...state, lectures: action.lectures };
    }
    default: {
      return state;
    }
  }
};

export default courseFocus;
