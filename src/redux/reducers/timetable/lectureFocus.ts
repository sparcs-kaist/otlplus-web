import Review from '@/shapes/model/review/Review';
import {
  RESET,
  SET_LECTURE_FOCUS,
  CLEAR_LECTURE_FOCUS,
  SET_REVIEWS,
  SET_MULTIPLE_FOCUS,
  CLEAR_MULTIPLE_FOCUS,
  LectureFocusAction,
} from '../../actions/timetable/lectureFocus';

import { LectureFocusFrom } from '@/shapes/enum';
import Lecture from '@/shapes/model/subject/Lecture';
import { Detail } from '@/shapes/state/timetable/LectureFocus';

interface LectureFocusState {
  from: LectureFocusFrom;
  clicked: boolean;
  lecture: Lecture | null;
  reviews: Review[] | null;
  multipleTitle: string;
  multipleDetails: Detail[];
}

const initialState: LectureFocusState = {
  from: LectureFocusFrom.NONE,
  clicked: false,
  lecture: null,
  reviews: null,
  multipleTitle: '',
  multipleDetails: [],
};

const lectureFocus = (state = initialState, action: LectureFocusAction): LectureFocusState => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_LECTURE_FOCUS: {
      const lectureChanged = !state.lecture || state.lecture.id !== action.lecture.id;
      return {
        ...state,
        from: action.from,
        clicked: action.clicked,
        lecture: action.lecture,
        reviews: lectureChanged ? null : state.reviews,
      };
    }
    case CLEAR_LECTURE_FOCUS: {
      return {
        ...state,
        from: LectureFocusFrom.NONE,
        clicked: false,
        lecture: null,
        reviews: null,
      };
    }
    case SET_REVIEWS: {
      return { ...state, reviews: action.reviews };
    }
    case SET_MULTIPLE_FOCUS: {
      return {
        ...state,
        from: LectureFocusFrom.MULTIPLE,
        multipleTitle: action.multipleTitle,
        multipleDetails: action.multipleDetails,
      };
    }
    case CLEAR_MULTIPLE_FOCUS: {
      return { ...state, from: LectureFocusFrom.NONE, multipleTitle: '', multipleDetails: [] };
    }
    default: {
      return state;
    }
  }
};

export default lectureFocus;
