import {
  RESET,
  OPEN_SEARCH,
  CLOSE_SEARCH,
  SET_LAST_SEARCH_OPTION,
  SearchAction,
} from '@/actions/planner/search';
import LectureLastSearchOption from '@/shapes/state/timetable/LectureLastSearchOption';

interface SearchState {
  open: boolean;
  lastSearchOption: LectureLastSearchOption;
}

const initialState: SearchState = {
  open: true,
  lastSearchOption: {},
};

const search = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case OPEN_SEARCH: {
      return {
        ...state,
        open: true,
      };
    }
    case CLOSE_SEARCH: {
      return {
        ...state,
        open: false,
      };
    }
    case SET_LAST_SEARCH_OPTION: {
      return {
        ...state,
        lastSearchOption: action.lastSearchOption,
      };
    }
    default: {
      return state;
    }
  }
};

export default search;
