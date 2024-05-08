import { SET_SEMESTERS, SemesterAction } from '../../actions/common/semester';
import Semester from '@/shapes/model/subject/Semester';

interface SemesterState {
  semesters: Semester[] | null;
}

const initialState: SemesterState = {
  semesters: null,
};

export const reducer = (state = initialState, action: SemesterAction): SemesterState => {
  switch (action.type) {
    case SET_SEMESTERS:
      return { ...state, semesters: action.semesters };
    default:
      return state;
  }
};

export default reducer;
