import {
  RESET,
  SET_SELECTED_LIST_CODE,
  SET_LIST_COURSES,
  CLEAR_SEARCH_LIST_COURSES,
  ADD_COURSE_READ,
  DictionaryAction,
} from '@/actions/dictionary/list';

import { CourseListCode } from '@/shapes/enum';
import Course from '@/shapes/model/subject/Course';

interface ListState {
  selectedListCode: CourseListCode;
  lists: {
    [key in CourseListCode]: {
      courses: Course[] | null;
    };
  };
  readCourses: Course[];
}

const initialState: ListState = {
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

const list = (state = initialState, action: DictionaryAction): ListState => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_SELECTED_LIST_CODE: {
      return { ...state, selectedListCode: action.listCode };
    }
    case SET_LIST_COURSES: {
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.code]: {
            ...state.lists[action.code],
            courses: action.courses,
          },
        },
      };
    }
    case CLEAR_SEARCH_LIST_COURSES: {
      return {
        ...state,
        lists: {
          ...state.lists,
          [CourseListCode.SEARCH]: {
            ...state.lists[CourseListCode.SEARCH],
            courses: null,
          },
        },
      };
    }
    case ADD_COURSE_READ: {
      return {
        ...state,
        readCourses: [...state.readCourses, action.course],
      };
    }
    default: {
      return state;
    }
  }
};

export default list;
