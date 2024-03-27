const BASE_STRING = 'P_P_';

/* eslint-disable prefer-template */
export const RESET = `${BASE_STRING}RESET` as const;
export const SET_PLANNERS = `${BASE_STRING}SET_PLANNERS` as const;
export const CLEAR_PLANNERS = `${BASE_STRING}CLEAR_PLANNERS` as const;
export const SET_SELECTED_PLANNER = `${BASE_STRING}SET_SELECTED_PLANNER` as const;
export const CREATE_PLANNER = `${BASE_STRING}CREATE_PLANNER` as const;
export const DELETE_PLANNER = `${BASE_STRING}DELETE_PLANNER` as const;
export const DUPLICATE_PLANNER = `${BASE_STRING}DUPLICATE_PLANNER` as const;
export const UPDATE_PLANNER = `${BASE_STRING}UPDATE_PLANNER` as const;
export const ADD_ITEM_TO_PLANNER = `${BASE_STRING}ADD_ITEM_TO_PLANNER` as const;
export const UPDATE_ITEM_IN_PLANNER = `${BASE_STRING}UPDATE_ITEM_IN_PLANNER` as const;
export const REMOVE_ITEM_FROM_PLANNER = `${BASE_STRING}REMOVE_ITEM_FROM_PLANNER` as const;
export const REORDER_PLANNER = `${BASE_STRING}REORDER_PLANNER` as const;
export const UPDATE_CELL_SIZE = `${BASE_STRING}UPDATE_CELL_SIZE` as const;
export const SET_IS_TRACK_SETTINGS_SECTION_OPEN =
  `${BASE_STRING}SET_IS_TRACK_SETTINGS_SECTION_OPEN` as const;
/* eslint-enable prefer-template */

import Planner from '@/shapes/model/planner/Planner';
import { ItemType } from '@/components/tiles/PlannerTile';

export function reset() {
  return {
    type: RESET,
  };
}

export function setPlanners(planners: Planner[]) {
  return {
    type: SET_PLANNERS,
    planners: planners,
  };
}

export function clearPlanners() {
  return {
    type: CLEAR_PLANNERS,
  };
}

export function setSelectedPlanner(planner: Planner) {
  return {
    type: SET_SELECTED_PLANNER,
    planner: planner,
  };
}

export function createPlanner(newPlanner: Planner) {
  return {
    type: CREATE_PLANNER,
    newPlanner: newPlanner,
  };
}

export function deletePlanner(planner: Planner) {
  return {
    type: DELETE_PLANNER,
    planner: planner,
  };
}

export function updatePlanner(updatedPlanner: Planner) {
  return {
    type: UPDATE_PLANNER,
    updatedPlanner: updatedPlanner,
  };
}

export function addItemToPlanner(item: ItemType) {
  return {
    type: ADD_ITEM_TO_PLANNER,
    item: item,
  };
}

export function updateItemInPlanner(item: ItemType) {
  return {
    type: UPDATE_ITEM_IN_PLANNER,
    item: item,
  };
}

export function removeItemFromPlanner(item: ItemType) {
  return {
    type: REMOVE_ITEM_FROM_PLANNER,
    item: item,
  };
}

export function reorderPlanner(planner: Planner, arrangeOrder: number) {
  return {
    type: REORDER_PLANNER,
    planner: planner,
    arrangeOrder: arrangeOrder,
  };
}

export function updateCellSize(width: number, height: number) {
  return {
    type: UPDATE_CELL_SIZE,
    width: width,
    height: height,
  };
}

export function setIsTrackSettingsSectionOpen(isTrackSettingsSectionOpen: boolean) {
  return {
    type: SET_IS_TRACK_SETTINGS_SECTION_OPEN,
    isTrackSettingsSectionOpen: isTrackSettingsSectionOpen,
  };
}

export type PlannerAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof setPlanners>
  | ReturnType<typeof clearPlanners>
  | ReturnType<typeof setSelectedPlanner>
  | ReturnType<typeof createPlanner>
  | ReturnType<typeof deletePlanner>
  | ReturnType<typeof updatePlanner>
  | ReturnType<typeof addItemToPlanner>
  | ReturnType<typeof updateItemInPlanner>
  | ReturnType<typeof removeItemFromPlanner>
  | ReturnType<typeof reorderPlanner>
  | ReturnType<typeof updateCellSize>
  | ReturnType<typeof setIsTrackSettingsSectionOpen>;
