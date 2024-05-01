import { combineReducers } from 'redux';
import list from './list';
import courseFocus from './courseFocus';
import search from './search';

const CombinedReducer = combineReducers({
  list: list,
  courseFocus: courseFocus,
  search: search,
});

export type DictionaryState = ReturnType<typeof CombinedReducer>;
export default CombinedReducer;
