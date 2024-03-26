const BASE_STRING = 'I_CA_';

/* eslint-disable prefer-template */
export const RESET = `${BASE_STRING}RESET` as const;
export const SET_ITEM_FOCUS = `${BASE_STRING}SET_ITEM_FOCUS` as const;
export const CLEAR_ITEM_FOCUS = `${BASE_STRING}CLEAR_ITEM_FOCUS` as const;
export const SET_CATEGORY_FOCUS = `${BASE_STRING}SET_CATEGORY_FOCUS` as const;
export const CLEAR_CATEGORY_FOCUS = `${BASE_STRING}CLEAR_CATEGORY_FOCUS` as const;
export const SET_REVIEWS = `${BASE_STRING}SET_REVIEWS` as const;
export const SET_LECTURES = `${BASE_STRING}SET_LECTURES` as const;
/* eslint-enable prefer-template */

import Review from '@/shapes/model/review/Review';
import Course from '@/shapes/model/subject/Course';
import Lecture from '@/shapes/model/subject/Lecture';
import { ItemFocusFrom } from '@/shapes/enum';
import { ItemType } from '@/components/tiles/PlannerTile';
import { CategoryFirstIndex } from '@/shapes/enum';

export function reset() {
  return {
    type: RESET,
  };
}

export function setItemFocus(
  item: ItemType,
  course: Course,
  from: ItemFocusFrom,
  clicked: boolean,
) {
  return {
    type: SET_ITEM_FOCUS,
    item: item,
    course: course,
    from: from,
    clicked: clicked,
  };
}

export function clearItemFocus() {
  return {
    type: CLEAR_ITEM_FOCUS,
  };
}

export function setCategoryFocus(category: [CategoryFirstIndex, number, number]) {
  return {
    type: SET_CATEGORY_FOCUS,
    category: category,
  };
}

export function clearCategoryFocus() {
  return {
    type: CLEAR_CATEGORY_FOCUS,
  };
}

export function setReviews(reviews: Review[]) {
  return {
    type: SET_REVIEWS,
    reviews: reviews,
  };
}

export function setLectures(lectures: Lecture[]) {
  return {
    type: SET_LECTURES,
    lectures: lectures,
  };
}

export type ItemFocusAction =
  | ReturnType<typeof setItemFocus>
  | ReturnType<typeof clearItemFocus>
  | ReturnType<typeof setCategoryFocus>
  | ReturnType<typeof clearCategoryFocus>
  | ReturnType<typeof setReviews>
  | ReturnType<typeof setLectures>;
