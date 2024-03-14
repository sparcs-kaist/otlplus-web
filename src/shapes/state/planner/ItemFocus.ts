import type { ItemFocusFrom } from '@/shapes/enum';
import type Course from '@/shapes/model/subject/Course';
import type Department from '@/shapes/model/subject/Department';
import type FuturePlannerItem from '@/shapes/model/planner/FuturePlannerItem';
import type ArbitraryPlannerItem from '@/shapes/model/planner/ArbitraryPlannerItem';
import type Lecture from '@/shapes/model/subject/Lecture';
import type Review from '@/shapes/model/review/Review';
import type TakenPlannerItem from '@/shapes/model/planner/TakenPlannerItem';

export interface ArbitraryPseudoCourse {
  id: number;
  isArbitrary: true;
  department?: Department;
  type: string;
  type_en: string;
  credit: number;
  credit_au: number;
  title: string;
  title_en: string;
  old_code: string;
}

interface NoneItem {
  from: ItemFocusFrom.NONE;
  clicked: false;
  item?: null;
  course?: null;
  category?: null;
  reviews?: null;
  lectures?: null;
}

interface ListItem {
  from: ItemFocusFrom.LIST;
  clicked: boolean;
  item?: null;
  course?: Course | ArbitraryPseudoCourse;
  category?: null;
  reviews?: Review;
  lectures?: Lecture;
}

interface AddingItem {
  from: ItemFocusFrom.ADDING;
  clicked: true;
  item?: null;
  course?: Course | ArbitraryPseudoCourse;
  category?: null;
  reviews?: Review;
  lectures?: Lecture;
}

interface TableItem {
  from: ItemFocusFrom.TABLE_TAKEN | ItemFocusFrom.TABLE_FUTURE | ItemFocusFrom.TABLE_ARBITRARY;
  clicked: boolean;
  item?: TakenPlannerItem | FuturePlannerItem | ArbitraryPlannerItem;
  course?: Course | ArbitraryPseudoCourse;
  category?: null;
  reviews?: Review;
  lecture?: Lecture;
}

interface CategoryItem {
  from: ItemFocusFrom.CATEGORY;
  clicked: boolean;
  item?: null;
  course?: null;
  category: number[];
  reviews?: null;
  lectures?: null;
}

type ItemFocus = NoneItem | ListItem | AddingItem | TableItem | CategoryItem;

export default ItemFocus;
