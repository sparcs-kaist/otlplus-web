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
