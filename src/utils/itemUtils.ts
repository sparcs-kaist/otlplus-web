import { ItemType } from '@/components/tiles/PlannerTile';
import { PlannerItemType } from '@/shapes/enum';
import ArbitraryPlannerItem from '@/shapes/model/planner/ArbitraryPlannerItem';
import Planner from '@/shapes/model/planner/Planner';
import Course from '@/shapes/model/subject/Course';
import Department from '@/shapes/model/subject/Department';

export const getYearOfItem = (item: ItemType) => {
  switch (item.item_type) {
    case PlannerItemType.TAKEN:
      return item.lecture.year;
    case PlannerItemType.FUTURE:
      return item.year;
    case PlannerItemType.ARBITRARY:
      return item.year;
    default:
      return 2000;
  }
};

export const getSemesterOfItem = (item: ItemType) => {
  switch (item.item_type) {
    case PlannerItemType.TAKEN:
      return item.lecture.semester;
    case PlannerItemType.FUTURE:
    case PlannerItemType.ARBITRARY:
      return item.semester;
    default:
      return 2000;
  }
};

export const getCreditOfItem = (item: ItemType) => {
  // TODO: Implement additional customization
  if (item.item_type === PlannerItemType.TAKEN) {
    return item.lecture.credit;
  }
  if (item.item_type === PlannerItemType.FUTURE) {
    return item.course.credit;
  }
  if (item.item_type === PlannerItemType.ARBITRARY) {
    return item.credit;
  }
  return 0;
};

export const getAuOfItem = (item: ItemType) => {
  if (item.item_type === PlannerItemType.TAKEN) {
    return item.lecture.credit_au;
  }
  if (item.item_type === PlannerItemType.FUTURE) {
    return item.course.credit_au;
  }
  if (item.item_type === PlannerItemType.ARBITRARY) {
    return item.credit_au;
  }
  return 0;
};

export const getCreditAndAuOfItem = (item: ItemType) => {
  return getCreditOfItem(item) + getAuOfItem(item);
};

export const getIdOfArbitrary = (type: string, typeEn: string, department?: Department) => {
  if (department) {
    if (typeEn.endsWith('Required')) {
      return -(department.id * 100 + 1);
    }
    if (typeEn.endsWith('Elective')) {
      return -(department.id * 100 + 2);
    }
    return -(department.id * 100 + 3);
  }
  return -991;
};

export const getTitleOfArbitrary = (type: string) => {
  return `임의의 ${type} 과목`;
};

export const getTitleEnOfArbitrary = (typeEn: string) => {
  return `Arbitrary ${typeEn} Course`;
};

export const getOldCodeOfArbitrary = (typeEn: string, department?: Department) => {
  if (typeEn.startsWith('Major')) {
    return `${department && department.code}---`;
  }
  return 'HSS---';
};

export const getCourseOfItem = (item: ItemType) => {
  switch (item.item_type) {
    case PlannerItemType.TAKEN:
      return item.course;
    case PlannerItemType.FUTURE:
      return item.course;
    case PlannerItemType.ARBITRARY:
    default:
      return {
        id: getIdOfArbitrary(item.type, item.type_en, (item as ArbitraryPlannerItem).department),
        isArbitrary: true,
        department: item.department,
        type: item.type,
        type_en: item.type_en,
        credit: item.credit,
        credit_au: item.credit_au,
        title: getTitleOfArbitrary(item.type),
        title_en: getTitleEnOfArbitrary(item.type_en),
        old_code: getOldCodeOfArbitrary(item.type_en, item.department),
      };
  }
};

export const isAddedCourse = (course: Course, planner: Planner) => {
  return (
    planner &&
    [...planner.taken_items, ...planner.future_items, ...planner.arbitrary_items].some(
      (i) => !i.is_excluded && getCourseOfItem(i).id === course.id,
    )
  );
};
