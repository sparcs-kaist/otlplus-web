import { combineReducers } from 'redux';
import reviewsFocus from './reviewsFocus';
import latestReviews from './latestReviews';
import likedReviews from './likedReviews';
import rankedReviews from './rankedReviews';

const CombinedReducer = combineReducers({
  reviewsFocus: reviewsFocus,
  latestReviews: latestReviews,
  likedReviews: likedReviews,
  rankedReviews: rankedReviews,
});

export type WriteReviewsState = ReturnType<typeof CombinedReducer>;
export default CombinedReducer;
