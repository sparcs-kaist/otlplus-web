import {
  RESET,
  SET_ITEM_FOCUS,
  CLEAR_ITEM_FOCUS,
  SET_CATEGORY_FOCUS,
  CLEAR_CATEGORY_FOCUS,
  SET_REVIEWS,
  SET_LECTURES,
  ItemFocusAction,
} from '@/redux/actions/planner/itemFocus';
import { ItemFocusFrom } from '@/shapes/enum';
import ItemFocus, {
  AddingItem,
  CategoryItem,
  ListItem,
  NoneItem,
  TableItem,
} from '@/shapes/state/planner/ItemFocus';

const initialState = {
  from: ItemFocusFrom.NONE,
  clicked: false,
  item: null,
  course: null,
  category: null,
  reviews: null,
  lectures: null,
} as ItemFocus;

/*
  모든 ItemFocus 는 아래 5가지 중 하나의 타입을 가짐
  type ItemFocus = NoneItem | ListItem | AddingItem | TableItem | CategoryItem;

  CategoryItem 에 focusing 할 경우에는 SET_CATEGORY_FOCUS 액션을, 
  ListItem | AddingItem | TableItem 에 focusing 할 경우에는 SET_ITEM_FOCUS 액션을 사용함.

  (구체적인 사진은 notion과 PR 에 첨부된 사진을 참고.)
  1. NoneItem
      포커싱된 아이템이 없을 때.
  2. ListItem
      Planner 테이블 아래의 course list 중 하나의 항목을 클릭했을 때 포커싱되는 상태를 나타냄.
  3. AddingItem 
      Planner 테이블에 아이템을 추가할 때 
  4. TableItem
      Planner 테이블에서  각 항목을 클릭했을 때 포커싱되는 상태를 나타냄.
      Future, Taken, Arbitrary 중하나임. 
  5. CategoryItem
      플래너 우측의 기초/전공/교양 과목의 이수 상황을 보여주는 바에서 특정 카테고리를 호버하면 Focus, 언호버하면 Focus 해제됨.
      [CategoryIndex, N, M] 
      CategoryIndex: 0, 1, 2, 3, 4 중 하나. 
          순서대로 기초, 전공, 연구, 교양, 기타.
      N: 
          세부 전공을 의미.  전공/부전/복수/심화/자유 등을 가르킴. 
      M: 
        0, 1 중 하나. 0이면 필수 과목, 1이면 선택 과목. 
      (ex. [0, 1, 0] => 기초 1번째 필수 과목)
*/
const itemFocus = (state = initialState, action: ItemFocusAction): ItemFocus => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_ITEM_FOCUS: {
      const courseChanged = !state.course || state.course.id !== action.course.id;
      const changedItem = courseChanged ? { reviews: null, lectures: null } : {};
      return {
        ...state,
        from: action.from,
        clicked: action.clicked,
        item: action.item,
        course: action.course,
        ...changedItem,
      } as ListItem | AddingItem | TableItem;
    }
    case CLEAR_ITEM_FOCUS: {
      return {
        ...state,
        from: ItemFocusFrom.NONE,
        clicked: false,
        item: null,
        course: null,
        reviews: null,
        lectures: null,
      } as NoneItem;
    }
    case SET_CATEGORY_FOCUS: {
      return {
        ...state,
        from: ItemFocusFrom.CATEGORY,
        category: action.category,
      } as CategoryItem;
    }
    case CLEAR_CATEGORY_FOCUS: {
      return {
        ...state,
        from: ItemFocusFrom.NONE,
        category: null,
      } as NoneItem;
    }
    case SET_REVIEWS: {
      return {
        ...state,
        reviews: action.reviews,
      } as ListItem | AddingItem | TableItem;
    }
    case SET_LECTURES: {
      return {
        ...state,
        lectures: action.lectures,
      } as ListItem | AddingItem | TableItem;
    }
    default: {
      return state;
    }
  }
};

export default itemFocus;
