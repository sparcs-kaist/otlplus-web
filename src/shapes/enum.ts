export const enum AdditionalTrackType {
  DOUBLE = 'DOUBLE', // 복수전공
  MINOR = 'MINOR', // 부전공
  ADVANCED = 'ADVANCED', // 심화전공
  INTERDISCIPLINARY = 'INTERDISCIPLINARY', // 융합전공
}

export const enum SemesterType {
  SPRING = 1,
  SUMMER = 2,
  FALL = 3,
  WINTER = 4,
}

export const enum ItemFocusFrom {
  NONE = 'NONE',
  LIST = 'LIST',
  ADDING = 'ADDING',
  TABLE_TAKEN = 'TABLE_TAKEN',
  TABLE_FUTURE = 'TABLE_FUTURE',
  TABLE_ARBITRARY = 'TABLE_ARBITRARY',
  CATEGORY = 'CATEGORY',
}

export const enum LectureFocusFrom {
  NONE = 'NONE',
  LIST = 'LIST',
  TABLE = 'TABLE',
  MULTIPLE = 'MULTIPLE',
}

export const enum ReviewsFocusFrom {
  NONE = 'NONE',
  LECTURE = 'LECTURE',
  REVIEWS_LATEST = 'REVIEWS_LATEST',
  REVIEWS_MY = 'REVIEWS_MY',
  REVIEWS_LIKED = 'REVIEWS_LIKED',
  REVIEWS_RANKED = 'REVIEWS_RANKED',
}

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
  SEARCH = 'SEARCH',
  BASIC = 'BASIC',
  HUMANITY = 'HUMANITY',
  TAKEN = 'TAKEN',
}

export const enum LectureListCode {
  SEARCH = 'SEARCH',
  BASIC = 'BASIC',
  HUMANITY = 'HUMANITY',
  CART = 'CART',
}

export const enum Day {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}

/** Redux state 중에서 서버에서 course 또는 lecture를 fetch 해서 저장하는 
 * planner.list , timetable.list , dictionary.list 에서
 아래  enum 을 optional key 로 사용합니다.*/
export const enum DepartmentCode {
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

export const enum Orientation {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}
