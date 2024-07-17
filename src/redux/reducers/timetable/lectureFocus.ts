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
import LectureFocus, {
  FromNone,
  FromListOrTable,
  FromMutliple,
} from '@/shapes/state/timetable/LectureFocus';

const initialState: LectureFocus = {
  from: LectureFocusFrom.NONE,
  clicked: false,
  lecture: null,
  reviews: null,
  multipleTitle: '',
  multipleDetails: [],
};

const lectureFocus = (state = initialState, action: LectureFocusAction): LectureFocus => {
  switch (action.type) {
    case RESET: {
      return initialState as FromNone;
    }
    case SET_LECTURE_FOCUS: {
      const lectureChanged = !state.lecture || state.lecture.id !== action.lecture.id;
      return {
        ...state,
        from: action.from,
        clicked: action.clicked,
        lecture: action.lecture,
        reviews: lectureChanged ? null : state.reviews,
      } as FromListOrTable;
    }
    case CLEAR_LECTURE_FOCUS: {
      return {
        ...state,
        from: LectureFocusFrom.NONE,
        clicked: false,
        lecture: null,
        reviews: null,
      } as FromNone;
    }
    case SET_REVIEWS: {
      return { ...state, reviews: action.reviews } as FromListOrTable;
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
      return {
        ...state,
        from: LectureFocusFrom.NONE,
        multipleTitle: '',
        multipleDetails: [],
      } as FromMutliple;
    }
    default: {
      return state;
    }
  }
};

export default lectureFocus;
