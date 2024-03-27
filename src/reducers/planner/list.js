import {
  RESET,
  SET_SELECTED_LIST_CODE,
  SET_LIST_COURSES,
  CLEAR_SEARCH_LIST_COURSES,
  ADD_COURSE_READ,
} from '../../actions/planner/list';

import { CourseListCode } from '@/shapes/enum';

const initialState = {
  selectedListCode: CourseListCode.SEARCH,
  lists: {
    [CourseListCode.SEARCH]: {
      courses: [],
    },
    [CourseListCode.BASIC]: {
      courses: null,
    },
    [CourseListCode.HUMANITY]: {
      courses: null,
    },
    [CourseListCode.TAKEN]: {
      courses: null,
    },
  },
  readCourses: [],
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_SELECTED_LIST_CODE: {
      return Object.assign({}, state, {
        selectedListCode: action.listCode,
      });
    }
    case SET_LIST_COURSES: {
      const newState = { ...state };
      newState.lists = { ...newState.lists };
      newState.lists[action.code] = { ...newState.lists[action.code] };
      newState.lists[action.code].courses = action.courses;
      return Object.assign({}, state, newState);
    }
    case CLEAR_SEARCH_LIST_COURSES: {
      const newState = { ...state };
      newState.lists = { ...newState.lists };
      newState.lists[CourseListCode.SEARCH] = { ...newState.lists[CourseListCode.SEARCH] };
      newState.lists[CourseListCode.SEARCH].courses = null;
      return Object.assign({}, state, newState);
    }
    case ADD_COURSE_READ: {
      const newState = {
        readCourses: [...state.readCourses, action.course],
      };
      return Object.assign({}, state, newState);
    }
    default: {
      return state;
    }
  }
};

export default list;
