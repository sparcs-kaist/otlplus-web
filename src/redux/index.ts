import { combineReducers } from 'redux';

import dictionaryReducer from '@/redux/reducers/dictionary';
import timetableReducer from '@/redux/reducers/timetable';
import writeReviewsReducer from '@/redux/reducers/write-reviews';
import commonReducer from '@/redux/reducers/common';
import plannerReducer from '@/redux/reducers/planner';

const rootReducer = combineReducers({
  common: commonReducer,
  dictionary: dictionaryReducer,
  timetable: timetableReducer,
  writeReviews: writeReviewsReducer,
  planner: plannerReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
