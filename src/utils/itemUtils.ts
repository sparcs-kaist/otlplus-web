import { ItemType } from '@/components/tiles/PlannerTile';
import { PlannerItemType } from '@/shapes/enum';
import ArbitraryPlannerItem from '@/shapes/model/planner/ArbitraryPlannerItem';
import Department from '@/shapes/model/subject/Department';

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

export const getTitleOfArbitrary = (type: string, typeEn: string, department?: Department) => {
  return `임의의 ${type} 과목`;
};

export const getTitleEnOfArbitrary = (type: string, typeEn: string, department?: Department) => {
  return `Arbitrary ${typeEn} Course`;
};

export const getOldCodeOfArbitrary = (type: string, typeEn: string, department?: Department) => {
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
        title: getTitleOfArbitrary(item.type, item.type_en, item.department),
        title_en: getTitleEnOfArbitrary(item.type, item.type_en, item.department),
        old_code: getOldCodeOfArbitrary(item.type, item.type_en, item.department),
      };
  }
};
