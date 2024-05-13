import {
  RESET,
  OPEN_SEARCH,
  CLOSE_SEARCH,
  SET_LAST_SEARCH_OPTION,
  CourseAction,
} from '@/actions/dictionary/search';
import CourseLastSearchOption from '@/shapes/state/dictionary/CourseLastSearchOption';

interface SearchState {
  open: boolean;
  lastSearchOption: CourseLastSearchOption;
}

const initialState: SearchState = {
  open: true,
  lastSearchOption: {},
};

const search = (state = initialState, action: CourseAction) => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case OPEN_SEARCH: {
      return { ...state, open: true };
    }
    case CLOSE_SEARCH: {
      return { ...state, open: false };
    }
    case SET_LAST_SEARCH_OPTION: {
      return { ...state, lastSearchOption: action.lastSearchOption };
    }
    default: {
      return state;
    }
  }
};

export default search;
