import {
  RESET,
  SET_SELECTED_LIST_CODE,
  SET_LIST_COURSES,
  CLEAR_SEARCH_LIST_COURSES,
  // ADD_COURSE_READ,
  ListAction,
} from '../../actions/planner/list';

import { CourseListCode, DepartmentCode } from '@/shapes/enum';
import Course from '@/shapes/model/subject/Course';

type CourseDepartmentLists = {
  [K in CourseListCode]: {
    courses: Course[] | null;
  };
} & {
  [K in DepartmentCode]?: {
    courses: Course[] | null;
  };
};

interface ListState {
  selectedListCode: CourseListCode | DepartmentCode;
  lists: CourseDepartmentLists;
  // readCourses: Course[];
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
  // readCourses: [], // <-- 이부분은 제거해도 괜찮을 것 같음.
};

const list = (state = initialState, action: ListAction) => {
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
          [action.code]: { courses: action.courses },
        },
      };
    }
    case CLEAR_SEARCH_LIST_COURSES:
      return {
        ...state,
        lists: {
          ...state.lists,
          [CourseListCode.SEARCH]: { courses: null },
        },
      };
    // case ADD_COURSE_READ: {
    //   const newState = {
    //     readCourses: [...state.readCourses, action.course],
    //   };
    //   return Object.assign({}, state, newState);
    // }
    default: {
      return state;
    }
  }
};

export default list;
