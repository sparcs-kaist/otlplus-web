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
  REVIEWS_LATEST = 'LATEST',
  REVIEWS_MY = 'MY',
  REVIEWS_LIKED = 'LIKED',
  REVIEWS_RANKED = 'RANKED',
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
