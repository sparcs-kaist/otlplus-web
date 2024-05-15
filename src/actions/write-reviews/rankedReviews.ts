import Review from '@/shapes/model/review/Review';
import Semester from '@/shapes/model/subject/Semester';

const BASE_STRING = 'WR_RR_';

export const RESET = `${BASE_STRING}RESET` as const;
export const ADD_SEMESTER_REVIEWS = `${BASE_STRING}ADD_SEMESTER_REVIEWS` as const;
export const SET_SEMESTER_REVIEW_COUNT = `${BASE_STRING}SET_SEMESTER_REVIEW_COUNT` as const;

export function reset() {
  return {
    type: RESET,
  };
}

export function addSemesterReviews(semester: string, reviews: Review[]) {
  return {
    type: ADD_SEMESTER_REVIEWS,
    semester: semester,
    reviews: reviews,
  };
}

export function setSemesterReviewCount(semester: string, count: number) {
  return {
    type: SET_SEMESTER_REVIEW_COUNT,
    semester: semester,
    count: count,
  };
}

export type RankedReviewsAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof addSemesterReviews>
  | ReturnType<typeof setSemesterReviewCount>;
