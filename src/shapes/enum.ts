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
