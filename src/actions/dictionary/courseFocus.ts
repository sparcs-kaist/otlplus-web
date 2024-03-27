const BASE_STRING = 'D_CA_';

/* eslint-disable prefer-template */
export const RESET = `${BASE_STRING}RESET` as const;
export const SET_COURSE_FOCUS = `${BASE_STRING}SET_COURSE_FOCUS` as const;
export const CLEAR_COURSE_FOCUS = `${BASE_STRING}CLEAR_COURSE_FOCUS` as const;
export const SET_REVIEWS = `${BASE_STRING}SET_REVIEWS` as const;
export const UPDATE_REVIEW = `${BASE_STRING}UPDATE_REVIEW` as const;
export const SET_LECTURES = `${BASE_STRING}SET_LECTURES` as const;
/* eslint-enable prefer-template */

import Course from '@/shapes/model/subject/Course';
import Review from '@/shapes/model/review/Review';
import Lecture from '@/shapes/model/subject/Lecture';

export function reset() {
  return {
    type: RESET,
  };
}

export function setCourseFocus(course: Course) {
  return {
    type: SET_COURSE_FOCUS,
    course: course,
  };
}

export function clearCourseFocus() {
  return {
    type: CLEAR_COURSE_FOCUS,
  };
}

export function setReviews(reviews: Review[]) {
  return {
    type: SET_REVIEWS,
    reviews: reviews,
  };
}

export function updateReview(review: Review, isNew: boolean) {
  return {
    type: UPDATE_REVIEW,
    review: review,
    isNew: isNew,
  };
}

export function setLectures(lectures: Lecture[]) {
  return {
    type: SET_LECTURES,
    lectures: lectures,
  };
}

export type DictionaryAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof setCourseFocus>
  | ReturnType<typeof clearCourseFocus>
  | ReturnType<typeof setReviews>
  | ReturnType<typeof updateReview>
  | ReturnType<typeof setLectures>;
