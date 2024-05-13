import {
  RESET,
  SET_PLANNERS,
  CLEAR_PLANNERS,
  SET_SELECTED_PLANNER,
  CREATE_PLANNER,
  DELETE_PLANNER,
  UPDATE_PLANNER,
  ADD_ITEM_TO_PLANNER,
  UPDATE_ITEM_IN_PLANNER,
  REMOVE_ITEM_FROM_PLANNER,
  REORDER_PLANNER,
  UPDATE_CELL_SIZE,
  SET_IS_TRACK_SETTINGS_SECTION_OPEN,
  PlannerAction,
} from '@/actions/planner/planner';
import Planner from '@/shapes/model/planner/Planner';
import { PlannerItemType } from '@/shapes/enum';

interface PlannerState {
  planners: Planner[] | null;
  selectedPlanner: Planner | null;
  cellWidth: number;
  cellHeight: number;
  isDragging: boolean;
  isTrackSettingsSectionOpen: boolean;
  isPlannerTabsOpenOnMobile: boolean;
}

const initialState: PlannerState = {
  planners: null,
  selectedPlanner: null,
  cellWidth: 200,
  cellHeight: 50,
  isDragging: false,
  isTrackSettingsSectionOpen: false,
  isPlannerTabsOpenOnMobile: false,
};

const getListNameOfType = (type: PlannerItemType) => {
  switch (type) {
    case 'TAKEN':
      return 'taken_items';
    case 'FUTURE':
      return 'future_items';
    case 'ARBITRARY':
      return 'arbitrary_items';
    default:
      throw new Error(`Unhandled planner item type: ${type}`);
  }
};

/**
  설명이 필요한 action 들에 대해서만 주석을 작성함. 
  SET_PLANNERS
      컴포넌트 마운트 시 실행되며, (a) user 가 없을 경우, []로 planners state 를 초기화함  
      (b) user 가 있을 경우, 서버에서 user의 planner를 가져와서 state에 저장함.
      ===> (a) 부분 삭제하고 planners initial state 를 null 에서 []로 변경하고자 함. 

  UPDATE_PLANNER
      planner 의 세부 정보, (입학연월 등) 을 수정하는 action

  ADD_ITEM_TO_PLANNER / UPDATE_ITEM_IN_PLANNER / REMOVE_ITEM_FROM_PLANNER 
      planner 에 과목 item 을 추가/수정/삭제 하는 action, 
    
  REORDER_PLANNER
      planner 들 간의 순서를 바꾸는 action, 
      planner list에 있는 planner 들의 "arrange_order" field 를 수정하고, "arrange_order" field 를 기준으로 정렬함.

  SET_IS_TRACK_SETTINGS_SECTION_OPEN 
      planner 관련 정보를 수정하는 팝업창이 열려있는지 여부를 변경하는 action 
*/
const planner = (state = initialState, action: PlannerAction) => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_PLANNERS: {
      return {
        ...state,
        planners: action.planners,
        selectedPlanner: action.planners?.[0],
      };
    }
    case CLEAR_PLANNERS: {
      return {
        ...state,
        planners: [],
        selectedPlanner: null,
      };
    }
    case SET_SELECTED_PLANNER: {
      return {
        ...state,
        selectedPlanner: action.planner,
      };
    }
    case CREATE_PLANNER: {
      return {
        ...state,
        selectedPlanner: action.newPlanner,
        planners: [...state.planners, action.newPlanner],
      };
    }
    case DELETE_PLANNER: {
      const indexOfPlanner = state.planners.findIndex((t) => t.id === action.planner.id);
      const newPlanners = state.planners.filter((t) => t.id !== action.planner.id);
      const newSelectedPlanner =
        indexOfPlanner !== state.planners.length - 1
          ? newPlanners[indexOfPlanner]
          : newPlanners[indexOfPlanner - 1];
      return {
        ...state,
        selectedPlanner: newSelectedPlanner,
        planners: newPlanners,
      };
    }
    case UPDATE_PLANNER: {
      if (!state.selectedPlanner) {
        return state;
      }
      return {
        ...state,
        selectedPlanner:
          state.selectedPlanner.id === action.updatedPlanner.id
            ? action.updatedPlanner
            : state.selectedPlanner,
        planners: state.planners.map((t) =>
          t.id === action.updatedPlanner.id ? action.updatedPlanner : t,
        ),
      };
    }
    case ADD_ITEM_TO_PLANNER: {
      if (!state.selectedPlanner) {
        return state;
      }
      const listName = getListNameOfType(action.item.item_type);
      const newPlanner = {
        ...state.selectedPlanner,
        [listName]: state.selectedPlanner[listName].concat([action.item]),
      };
      const newPlanners = state.planners.map((t) => (t.id === newPlanner.id ? newPlanner : t));
      return {
        ...state,
        selectedPlanner: newPlanner,
        planners: newPlanners,
      };
    }
    case UPDATE_ITEM_IN_PLANNER: {
      if (!state.selectedPlanner) {
        return state;
      }
      const listName = getListNameOfType(action.item.item_type);
      const newPlanner = {
        ...state.selectedPlanner,
        [listName]: state.selectedPlanner[listName].map((i) =>
          i.id === action.item.id ? action.item : i,
        ),
      };
      const newPlanners = state.planners.map((t) => (t.id === newPlanner.id ? newPlanner : t));
      return {
        ...state,
        selectedPlanner: newPlanner,
        planners: newPlanners,
      };
    }
    case REMOVE_ITEM_FROM_PLANNER: {
      if (!state.selectedPlanner) {
        return state;
      }
      const listName = getListNameOfType(action.item.item_type);
      const newPlanner = {
        ...state.selectedPlanner,
        [listName]: state.selectedPlanner[listName].filter((i) => i.id !== action.item.id),
      };
      const newPlanners = state.planners.map((t) => (t.id === newPlanner.id ? newPlanner : t));
      return {
        ...state,
        selectedPlanner: newPlanner,
        planners: newPlanners,
      };
    }
    case REORDER_PLANNER: {
      const newPlanners = state.planners.map((t) => {
        if (t.id === action.planner.id) {
          return {
            ...t,
            arrange_order: action.arrangeOrder,
          };
        }
        if (
          action.arrangeOrder <= t.arrange_order &&
          t.arrange_order < action.planner.arrange_order
        ) {
          return {
            ...t,
            arrange_order: t.arrange_order + 1,
          };
        }
        if (
          action.planner.arrange_order < t.arrange_order &&
          t.arrange_order <= action.arrangeOrder
        ) {
          return {
            ...t,
            arrange_order: t.arrange_order - 1,
          };
        }
        return t;
      });
      newPlanners.sort((t1, t2) => t1.arrange_order - t2.arrange_order);
      const updatedPlanner = newPlanners.find((t) => t.id === state.selectedPlanner?.id);
      return {
        ...state,
        planners: newPlanners,
        selectedPlanner: updatedPlanner,
      };
    }
    case UPDATE_CELL_SIZE: {
      return {
        ...state,
        cellWidth: action.width,
        cellHeight: action.height,
      };
    }
    case SET_IS_TRACK_SETTINGS_SECTION_OPEN: {
      return {
        ...state,
        isTrackSettingsSectionOpen: action.isTrackSettingsSectionOpen,
      };
    }
    default: {
      return state;
    }
  }
};

export default planner;
