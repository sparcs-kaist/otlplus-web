export const enum AdditionalTrackType {
  DOUBLE,
  MINOR,
  ADVANCED,
  INTERDISCIPLINARY,
}

export const enum SemesterType {
  SPRING = 1,
  SUMMER = 2,
  FALL = 3,
  WINTER = 4,
}

export const enum ItemFocusFrom {
  NONE,
  LIST,
  ADDING,
  TABLE_TAKEN,
  TABLE_FUTURE,
  TABLE_ARBITRARY,
  CATEGORY,
}

export const enum LectureFocusFrom {
  NONE,
  LIST,
  TABLE,
  MULTIPLE,
}

export const enum ReviewsFocusFrom {
  NONE,
  LECTURE,
  REVIEWS_LATEST,
  REVIEWS_MY,
  REVIEWS_LIKED,
  REVIEWS_RANKED,
}

// string enum for PlannerSubSection.jsx
export const enum PlannerItemType {
  TAKEN = 'TAKEN',
  FUTURE = 'FUTURE',
  ARBITRARY = 'ARBITRARY',
}

export const enum CategoryFirstIndex {
  TOTAL = -1,
  BASIC = 0,
  MAJOR = 1,
  RESEARCH = 2,
  GENERAL_AND_HUMANITY = 3,
  OTHERS = 4,
}

export const enum CourseListCode {
  SEARCH,
  BASIC,
  HUMANITY,
  TAKEN,
}

export const enum LectureListCode {
  SEARCH,
  BASIC,
  HUMANITY,
  CART,
}

export const enum Day {
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
  SUN,
}

/** Redux state 중에서 서버에서 course 또는 lecture를 fetch 해서 저장하는 
 * planner.list , timetable.list , dictionary.list 에서
 아래 enum 을 optional key 로 사용합니다.*/
export enum DepartmentCode {
  ALL = 'ALL',
  HSS = 'HSS',
  CE = 'CE',
  BTM = 'BTM',
  ME = 'ME',
  PH = 'PH',
  BiS = 'BiS',
  IE = 'IE',
  ID = 'ID',
  BS = 'BS',
  MAS = 'MAS',
  NQE = 'NQE',
  EE = 'EE',
  CS = 'CS',
  AE = 'AE',
  CH = 'CH',
  CBE = 'CBE',
  MS = 'MS',
  TS = 'TS',
  SS = 'SS',
  BCS = 'BCS',
  ETC = 'ETC',
}
