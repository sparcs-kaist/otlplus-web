import {
  RESET,
  SET_SELECTED_LIST_CODE,
  SET_LIST_LECTURES,
  CLEAR_ALL_LISTS_LECTURES,
  CLEAR_SEARCH_LIST_LECTURES,
  ADD_LECTURE_TO_CART,
  DELETE_LECTURE_FROM_CART,
  SET_MOBILE_IS_LECTURE_LIST_OPEN,
  LectureListAction,
} from '@/actions/timetable/list';
import { unique } from '@/utils/commonUtils';

import { LectureListCode } from '@/shapes/enum';
import Lecture from '@/shapes/model/subject/Lecture';

interface ListState {
  selectedListCode: LectureListCode;
  lists: {
    [key in LectureListCode]: {
      lectureGroups: Lecture[][] | null; // null when not loaded, empty array when loaded but no lectures
    };
  };
  isLectureListOpenOnMobile: boolean;
}

const initialState: ListState = {
  selectedListCode: LectureListCode.SEARCH,
  lists: {
    [LectureListCode.SEARCH]: {
      lectureGroups: [], // show empty array by default for search, instead of null
    },
    [LectureListCode.BASIC]: {
      lectureGroups: null,
    },
    [LectureListCode.HUMANITY]: {
      lectureGroups: null,
    },
    [LectureListCode.CART]: {
      lectureGroups: null,
    },
  },
  isLectureListOpenOnMobile: false,
};

const list = (state = initialState, action: LectureListAction): ListState => {
  const groupLectures = (lectures: Lecture[]) => {
    const sortedLectures = lectures.sort((a, b) => {
      if (a.old_code !== b.old_code) {
        return a.old_code > b.old_code ? 10 : -10;
      }
      return a.class_no > b.class_no ? 1 : -1;
    });
    const courseIds: number[] = unique(sortedLectures.map((l) => l.course));
    const lectureGroups = courseIds
      .map((course) => sortedLectures.filter((l) => l.course === course))
      .filter((lectureGroup) => lectureGroup.length > 0);
    return lectureGroups;
  };

  const ungroupLectureGroups = (lectureGroups: Lecture[][] | null) =>
    lectureGroups ? lectureGroups.flat(1) : [];

  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_SELECTED_LIST_CODE: {
      return { ...state, selectedListCode: action.listCode };
    }
    case SET_LIST_LECTURES: {
      const newState = { ...state };
      newState.lists = { ...newState.lists };
      newState.lists[action.code] = { ...newState.lists[action.code] };
      newState.lists[action.code].lectureGroups = groupLectures(action.lectures);
      return newState;
    }
    /**
     * This is used to clear all lectures in all lists.
     * Only search list becomes empty array, others become null.
     * @example { SEARCH: [Lecture1, Lecture2, ...], BASIC: [Lecture3, Lecture4, ...], ... } => { SEARCH: [], BASIC: null, ...
     */
    case CLEAR_ALL_LISTS_LECTURES: {
      const newState = { ...state };
      newState.lists = { ...newState.lists };
      // keys can be not only LectureListCode but also FavoriteDepartment which set in FavoriteDepartmentsSubSection.
      const keys = Object.keys(newState.lists) as Array<LectureListCode | string>;
      keys.forEach((k) => {
        newState.lists[k as keyof typeof newState.lists].lectureGroups =
          k === LectureListCode.SEARCH ? [] : null;
      });
      return newState;
    }
    /**
     * This is used to make search result null before getting new search result.
     * @example { SEARCH: [Lecture1, Lecture2, ...], BASIC: [...], ... } => { SEARCH: null, BASIC: [...], ... }
     */
    case CLEAR_SEARCH_LIST_LECTURES: {
      const newState = { ...state };
      newState.lists = { ...newState.lists };
      newState.lists[LectureListCode.SEARCH].lectureGroups = null;
      return newState;
    }
    case ADD_LECTURE_TO_CART: {
      const { lectureGroups } = state.lists[LectureListCode.CART];
      const lectures = ungroupLectureGroups(lectureGroups);
      const newLectures = [...lectures, action.lecture];
      const newLectureGroups = groupLectures(newLectures);
      const newState = { ...state };
      newState.lists = { ...newState.lists };
      newState.lists[LectureListCode.CART].lectureGroups = newLectureGroups;
      return newState;
    }
    case DELETE_LECTURE_FROM_CART: {
      const { lectureGroups } = state.lists[LectureListCode.CART];
      const lectures = ungroupLectureGroups(lectureGroups);
      const newLectures = lectures.filter((l) => l.id !== action.lecture.id);
      const newLectureGroups = groupLectures(newLectures);
      const newState = { ...state };
      newState.lists = { ...newState.lists };
      newState.lists[LectureListCode.CART].lectureGroups = newLectureGroups;
      return newState;
    }
    case SET_MOBILE_IS_LECTURE_LIST_OPEN: {
      return { ...state, isLectureListOpenOnMobile: action.isLectureListOpenOnMobile };
    }
    default: {
      return state;
    }
  }
};

export default list;
