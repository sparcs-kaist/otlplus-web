import type { ReviewsFocusFrom } from '@/shapes/enum';

import type Lecture from '@/shapes/model/subject/Lecture';
import type Review from '@/shapes/model/review/Review';

interface FromNone {
  from: ReviewsFocusFrom.NONE;
  lecture?: null;
  reviews?: null;
}

interface FromLecture {
  from: ReviewsFocusFrom.LECTURE;
  lecture: Lecture;
  reviews: Review[];
}

interface FromReviews {
  from:
    | ReviewsFocusFrom.REVIEWS_LATEST
    | ReviewsFocusFrom.REVIEWS_MY
    | ReviewsFocusFrom.REVIEWS_LIKED
    | ReviewsFocusFrom.REVIEWS_RANKED;
  lecture?: null;
  reviews: Review[];
}

type ReviewsFocus = FromNone | FromLecture | FromReviews;

export default ReviewsFocus;
