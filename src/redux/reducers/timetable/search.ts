import {
  RESET,
  OPEN_SEARCH,
  CLOSE_SEARCH,
  SET_LAST_SEARCH_OPTION,
  SET_CLASSTIME_OPTIONS,
  CLEAR_CLASSTIME_OPTIONS,
  SearchAction,
} from '@/redux/actions/timetable/search';
import { Day } from '@/shapes/enum';
import LectureLastSearchOption from '@/shapes/state/timetable/LectureLastSearchOption';

interface SearchState {
  open: boolean;
  lastSearchOption: LectureLastSearchOption;
  classtimeBegin: number | null;
  classtimeEnd: number | null;
  classtimeDay: Day | null;
}

const initialState: SearchState = {
  open: true,
  lastSearchOption: {},
  classtimeBegin: null,
  classtimeEnd: null,
  classtimeDay: null,
};

const search = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case OPEN_SEARCH: {
      return { ...state, open: true };
    }
    case CLOSE_SEARCH: {
      return {
        ...state,
        open: false,
        classtimeBegin: null,
        classtimeEnd: null,
        classtimeDay: null,
      };
    }
    case SET_LAST_SEARCH_OPTION: {
      return { ...state, lastSearchOption: action.lastSearchOption };
    }
    case SET_CLASSTIME_OPTIONS: {
      return {
        ...state,
        classtimeBegin: action.classtimeBegin,
        classtimeEnd: action.classtimeEnd,
        classtimeDay: action.classtimeDay,
      };
    }
    case CLEAR_CLASSTIME_OPTIONS: {
      return { ...state, classtimeBegin: null, classtimeEnd: null, classtimeDay: null };
    }
    default: {
      return state;
    }
  }
};

export default search;
