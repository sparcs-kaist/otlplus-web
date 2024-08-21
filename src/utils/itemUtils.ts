import ArbitraryPlannerItem from '@/shapes/model/planner/ArbitraryPlannerItem';
import Planner from '@/shapes/model/planner/Planner';
import Course from '@/shapes/model/subject/Course';
import Department from '@/shapes/model/subject/Department';
import { PlannerItem } from '@/shapes/state/planner/ItemFocus';
import { PlannerItemType } from '@/shapes/enum';

// PlannerItem에서 해당 아이템의 연도를 반환합니다.

export const getYearOfItem = (item: PlannerItem) => {
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

//PlannerItem에서 해당 아이템의 학기를 반환합니다.

export const getSemesterOfItem = (item: PlannerItem) => {
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

//PlannerItem에서 해당 아이템의 학점을 반환합니다.

export const getCreditOfItem = (item: PlannerItem) => {
  // TODO: 추가 커스터마이징 구현
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

//PlannerItem에서 해당 아이템의 AU를 반환합니다.

export const getAuOfItem = (item: PlannerItem) => {
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

//PlannerItem에서 해당 아이템의 학점과 AU의 합을 반환하는 함수입니다.

export const getCreditAndAuOfItem = (item: PlannerItem) => {
  return getCreditOfItem(item) + getAuOfItem(item);
};

//ARBITRARY 아이템의 ID를 반환하는 함수입니다.

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

//ARBITRARY 아이템의 제목을 반환하는 함수입니다.

export const getTitleOfArbitrary = (type: string) => {
  return `임의의 ${type} 과목`;
};

//ARBITRARY 아이템의 영문 제목 을 반환하는 함수입니다.

export const getTitleEnOfArbitrary = (typeEn: string) => {
  return `Arbitrary ${typeEn} Course`;
};

//ARBITRARY 아이템의 옛 코드(old_code)를 반환하는 함수입니다.

export const getOldCodeOfArbitrary = (typeEn: string, department?: Department) => {
  if (typeEn.startsWith('Major')) {
    return `${department && department.code}---`;
  }
  return 'HSS---';
};

//Focus된 아이템의 Course 객체를 가져오는 함수입니다.

export const getCourseOfItem = (item: PlannerItem) => {
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

//특정 Course가 Planner에 추가되어 있는지 확인하는 함수입니다.

export const isAddedCourse = (course: Course, planner: Planner) => {
  return (
    planner &&
    [...planner.taken_items, ...planner.future_items, ...planner.arbitrary_items].some(
      (i) => !i.is_excluded && getCourseOfItem(i).id === course.id,
    )
  );
};
