import { MyPseudoTimetable } from '@/shapes/model/timetable/Timetable';
import Timetable from '@/shapes/model/timetable/Timetable';
import {
  RESET,
  SET_TIMETABLES,
  CLEAR_TIMETABLES,
  SET_MY_TIMETABLE_LECTURES,
  SET_SELECTED_TIMETABLE,
  CREATE_TIMETABLE,
  DELETE_TIMETABLE,
  DUPLICATE_TIMETABLE,
  ADD_LECTURE_TO_TIMETABLE,
  REMOVE_LECTURE_FROM_TIMETABLE,
  REORDER_TIMETABLE,
  UPDATE_CELL_SIZE,
  SET_IS_DRAGGING,
  SET_MOBILE_IS_TIMETABLE_TABS_OPEN,
  TimetableAction,
} from '../../actions/timetable/timetable';

const MY = -1;

interface TimetableState {
  timetables: Timetable[] | null;
  myTimetable: MyPseudoTimetable;
  selectedTimetable: Timetable | null;
  cellWidth: number;
  cellHeight: number;
  isDragging: boolean;
  isTimetableTabsOpenOnMobile: boolean;
}

const initialState: TimetableState = {
  timetables: null,
  myTimetable: {
    id: MY,
    lectures: [],
    isReadOnly: true,
  },
  selectedTimetable: null,
  cellWidth: 200,
  cellHeight: 50,
  isDragging: false,
  isTimetableTabsOpenOnMobile: false,
};

const timetable = (state = initialState, action: TimetableAction) => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    /**
     * Set timetables of this semester when the first time timetable is loaded or the semester is changed.
     * If the selectedTimetable is not myTimetable, it will be updated to the first timetable of the semester.
     */
    case SET_TIMETABLES: {
      return {
        ...state,
        timetables: action.timetables,
        selectedTimetable:
          state.selectedTimetable?.id === state.myTimetable.id
            ? state.selectedTimetable
            : action.timetables[0],
      };
    }
    /**
     * Clear timetables before fetching new timetables when semester changes.
     */
    case CLEAR_TIMETABLES: {
      return {
        ...state,
        timetables: null,
        selectedTimetable:
          state.selectedTimetable?.id === state.myTimetable.id
            ? { ...state.selectedTimetable, lectures: [] }
            : null,
      };
    }
    case SET_MY_TIMETABLE_LECTURES: {
      return {
        ...state,
        // Update myTimetable with lectures
        myTimetable: { ...state.myTimetable, lectures: action.lectures },
        // Update selectedTimetable with lectures if myTimetable is selected
        selectedTimetable:
          state.selectedTimetable?.id === state.myTimetable.id
            ? { ...state.selectedTimetable, lectures: action.lectures }
            : state.selectedTimetable,
      };
    }
    /**
     * Set selectedTimetable when the user selects a timetable tab.
     */
    case SET_SELECTED_TIMETABLE: {
      return { ...state, selectedTimetable: action.timetable };
    }
    case CREATE_TIMETABLE: {
      if (!state.timetables) {
        return state;
      }
      const newArrangeOrder =
        state.timetables.length > 0
          ? Math.max(...state.timetables.map((t) => t.arrange_order)) + 1
          : 0;
      const newTable = {
        id: action.id,
        lectures: [],
        arrange_order: newArrangeOrder,
      };
      return { ...state, selectedTimetable: newTable, timetables: [...state.timetables, newTable] };
    }
    case DELETE_TIMETABLE: {
      if (!state.timetables) {
        return state;
      }
      const indexOfTable = state.timetables.findIndex((t) => t.id === action.timetable.id);
      const newTables = state.timetables.filter((t) => t.id !== action.timetable.id);
      const newSelectedTimetable =
        indexOfTable !== state.timetables.length - 1 // If the deleted timetable is not the last one
          ? newTables[indexOfTable]
          : newTables[indexOfTable - 1];
      return { ...state, selectedTimetable: newSelectedTimetable, timetables: newTables };
    }
    case DUPLICATE_TIMETABLE: {
      if (!state.timetables) {
        return state;
      }
      const newTable = {
        id: action.id,
        lectures: action.timetable.lectures,
        arrange_order: Math.max(...state.timetables.map((t) => t.arrange_order)) + 1,
      };
      return { ...state, selectedTimetable: newTable, timetables: [...state.timetables, newTable] };
    }
    case ADD_LECTURE_TO_TIMETABLE: {
      if (!state.timetables || !state.selectedTimetable) {
        return state;
      }
      const newTable = {
        ...state.selectedTimetable,
        lectures: state.selectedTimetable.lectures.concat([action.lecture]),
      };
      const newTables = state.timetables.map((t) => (t.id === newTable.id ? newTable : t));
      return { ...state, selectedTimetable: newTable, timetables: newTables };
    }
    case REMOVE_LECTURE_FROM_TIMETABLE: {
      if (!state.timetables || !state.selectedTimetable) {
        return state;
      }
      const newTable = {
        ...state.selectedTimetable,
        lectures: state.selectedTimetable.lectures.filter((l) => l.id !== action.lecture.id),
      };
      const newTables = state.timetables.map((t) => (t.id === newTable.id ? newTable : t));
      return { ...state, selectedTimetable: newTable, timetables: newTables };
    }
    case REORDER_TIMETABLE: {
      if (!state.timetables || !state.selectedTimetable || state.selectedTimetable.id === MY) {
        return state;
      }
      const newTables = state.timetables.map((t) => {
        if (t.id === action.timetable.id) {
          return {
            ...t,
            arrange_order: action.arrangeOrder,
          };
        }
        if (
          action.arrangeOrder <= t.arrange_order &&
          t.arrange_order < action.timetable.arrange_order
        ) {
          return {
            ...t,
            arrange_order: t.arrange_order + 1,
          };
        }
        if (
          action.timetable.arrange_order < t.arrange_order &&
          t.arrange_order <= action.arrangeOrder
        ) {
          return {
            ...t,
            arrange_order: t.arrange_order - 1,
          };
        }
        return t;
      });
      newTables.sort((t1, t2) => t1.arrange_order - t2.arrange_order);
      const updatedTable = newTables.find((t) => t.id === state.selectedTimetable?.id);
      return Object.assign({}, state, {
        timetables: newTables,
        selectedTimetable: updatedTable,
      });
    }
    case UPDATE_CELL_SIZE: {
      return { ...state, cellWidth: action.width, cellHeight: action.height };
    }
    case SET_IS_DRAGGING: {
      return { ...state, isDragging: action.isDragging };
    }
    case SET_MOBILE_IS_TIMETABLE_TABS_OPEN: {
      return { ...state, isTimetableTabsOpenOnMobile: action.isTimetableTabsOpenOnMobile };
    }
    default: {
      return state;
    }
  }
};

export default timetable;
