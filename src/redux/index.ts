import { combineReducers } from 'redux';

import dictionaryReducer from '@/redux/reducers/dictionary/index';
import timetableReducer from '@/redux/reducers/timetable/index';
import writeReviewsReducer from '@/redux/reducers/write-reviews/index';
import commonReducer from '@/redux/reducers/common/index';
import plannerReducer from '@/redux/reducers/planner/index';

const rootReducer = combineReducers({
  common: commonReducer,
  dictionary: dictionaryReducer,
  timetable: timetableReducer,
  writeReviews: writeReviewsReducer,
  planner: plannerReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
