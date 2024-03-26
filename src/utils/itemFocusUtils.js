import { ItemFocusFrom } from '@/shapes/enum';
import {
  getCategoryOfItem,
  getSeparateMajorTracks,
  isIdenticalCategory,
} from './itemCategoryUtils';
import { CategoryFirstIndex } from '@/shapes/enum';
import { getCourseOfItem, getCreditOfItem, getAuOfItem } from './itemUtils';

export const isIdenticalItem = (item1, item2) =>
  item1 != null && item2 != null && item1.item_type === item2.item_type && item1.id === item2.id;

export const isTableFocusedItem = (item, itemFocus) =>
  (itemFocus.from === ItemFocusFrom.TABLE_TAKEN ||
    itemFocus.from === ItemFocusFrom.TABLE_FUTURE ||
    itemFocus.from === ItemFocusFrom.TABLE_ARBITRARY) &&
  isIdenticalItem(item, itemFocus.item);

export const isTableClickedItem = (item, itemFocus) =>
  isTableFocusedItem(item, itemFocus) && itemFocus.clicked === true;

export const isSingleFocusedItem = (item, itemFocus) =>
  isTableFocusedItem(item, itemFocus) ||
  ((itemFocus.from === ItemFocusFrom.LIST || itemFocus.from === ItemFocusFrom.ADDING) &&
    getCourseOfItem(item) &&
    itemFocus.course &&
    getCourseOfItem(item).id === itemFocus.course.id);

export const isMultipleFocusedItem = (item, itemFocus, planner) => {
  if (itemFocus.from !== ItemFocusFrom.CATEGORY) {
    return false;
  }
  if (!planner) {
    return false;
  }
  const focusedCategory = itemFocus.category;
  const itemCategory = getCategoryOfItem(planner, item);
  if (focusedCategory[0] === CategoryFirstIndex.TOTAL) {
    if (focusedCategory[2] === 0) {
      return getCreditOfItem(item) > 0;
    }
    return getAuOfItem(item) > 0;
  }
  if (focusedCategory[0] !== itemCategory[0]) {
    return false;
  }
  switch (focusedCategory[0]) {
    case CategoryFirstIndex.MAJOR: {
      const targetSmt = getSeparateMajorTracks(planner)[focusedCategory[1]];
      if (targetSmt.major_required === 0) {
        if (focusedCategory[2] === 0) {
          return false;
        }
        const mrCategory = [focusedCategory[0], focusedCategory[1], 0];
        return (
          isIdenticalCategory(itemCategory, focusedCategory) ||
          isIdenticalCategory(itemCategory, mrCategory)
        );
      }
      return isIdenticalCategory(itemCategory, focusedCategory);
    }
    default: {
      return isIdenticalCategory(itemCategory, focusedCategory);
    }
  }
};

export const isFocusedItem = (item, itemFocus, planner) =>
  isSingleFocusedItem(item, itemFocus) || isMultipleFocusedItem(item, itemFocus, planner);

export const isDimmedItem = (item, itemFocus) =>
  !isFocusedItem(item, itemFocus) && itemFocus.clicked === true;

export const isFocusedListCourse = (course, itemFocus) =>
  itemFocus.from === ItemFocusFrom.LIST && itemFocus.course.id === course.id;

export const isClickedListCourse = (course, itemFocus) =>
  itemFocus.from === ItemFocusFrom.LIST &&
  itemFocus.course.id === course.id &&
  itemFocus.clicked === true;

export const isDimmedListCourse = (course, itemFocus) =>
  itemFocus.clicked === true &&
  (itemFocus.course.id !== course.id || itemFocus.from !== ItemFocusFrom.LIST);
