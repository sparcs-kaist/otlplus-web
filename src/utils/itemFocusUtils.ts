import { ItemFocusFrom } from '@/shapes/enum';
import {
  getCategoryOfItem,
  getSeparateMajorTracks,
  isIdenticalCategory,
} from './itemCategoryUtils';
import { CategoryFirstIndex } from '@/shapes/enum';
import { getCourseOfItem, getCreditOfItem, getAuOfItem } from './itemUtils';
import ItemFocus, { PlannerItem, PlannerCourse } from '@/shapes/state/planner/ItemFocus';
import Planner from '@/shapes/model/planner/Planner';

// Planner 페이지에서 아이템 포커스와 관련된 유틸들입니다.

export const isIdenticalItem = (item1: PlannerItem, item2: PlannerItem) =>
  item1 != null && item2 != null && item1.item_type === item2.item_type && item1.id === item2.id;

// 포커싱된 아이템이 플래너의 테이블에서 왔는지 확인합니다.
export const isTableFocusedItem = (item: PlannerItem, itemFocus: ItemFocus) =>
  (itemFocus.from === ItemFocusFrom.TABLE_TAKEN ||
    itemFocus.from === ItemFocusFrom.TABLE_FUTURE ||
    itemFocus.from === ItemFocusFrom.TABLE_ARBITRARY) &&
  isIdenticalItem(item, itemFocus.item);

// 클릭된 아이템이 플래너의 테이블에서 왔는지 확인합니다.
export const isTableClickedItem = (item: PlannerItem, itemFocus: ItemFocus) =>
  isTableFocusedItem(item, itemFocus) && itemFocus.clicked === true;

// 하나의 아이템만 포커싱되었는지 확인합니다.
export const isSingleFocusedItem = (item: PlannerItem, itemFocus: ItemFocus) =>
  isTableFocusedItem(item, itemFocus) ||
  ((itemFocus.from === ItemFocusFrom.LIST || itemFocus.from === ItemFocusFrom.ADDING) &&
    getCourseOfItem(item) &&
    itemFocus.course &&
    getCourseOfItem(item).id === itemFocus.course.id);

// 여러개의 아이템이 포커싱되었는지 확인합니다. (주로 옆의 Summary Section 에서 사용됨.)
export const isMultipleFocusedItem = (
  item: PlannerItem,
  itemFocus: ItemFocus,
  planner?: Planner,
) => {
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

// 아이템이 포커싱되었는지 확인하고, 포커싱되었을 경우, 포커싱된 아이템의 플래너 타일을 하이라이트하고, 다른 플래너 타일은 흐리게(Dimmed) 처리하는 유틸들입니다.
export const isFocusedItem = (item: PlannerItem, itemFocus: ItemFocus, planner?: Planner) => {
  return isSingleFocusedItem(item, itemFocus) || isMultipleFocusedItem(item, itemFocus, planner);
};

export const isDimmedItem = (item: PlannerItem, itemFocus: ItemFocus) =>
  !isFocusedItem(item, itemFocus) && itemFocus.clicked === true;

// 아래는 좌측 하단의 Search 섹션에서 아이템의 포커싱 여부를 확인하기 위해서 사용되는 유틸들입니다.
export const isFocusedListCourse = (course: PlannerCourse, itemFocus: ItemFocus) =>
  itemFocus.from === ItemFocusFrom.LIST && itemFocus.course?.id === course.id;

export const isClickedListCourse = (course: PlannerCourse, itemFocus: ItemFocus) =>
  itemFocus.from === ItemFocusFrom.LIST &&
  itemFocus.course?.id === course.id &&
  itemFocus.clicked === true;

export const isDimmedListCourse = (course: PlannerCourse, itemFocus: ItemFocus) =>
  itemFocus.clicked === true &&
  (itemFocus.course?.id !== course.id || itemFocus.from !== ItemFocusFrom.LIST);
