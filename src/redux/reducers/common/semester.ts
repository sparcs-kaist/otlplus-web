import { SET_SEMESTERS, SET_CURRENT_SEMESTER, SemesterAction } from '../../actions/common/semester';
import Semester from '@/shapes/model/subject/Semester';

interface SemesterState {
  semesters: Semester[] | null;
  currentSemester: Semester | null;
}

const initialState: SemesterState = {
  semesters: null,
  currentSemester: null,
};

const semester = (state = initialState, action: SemesterAction): SemesterState => {
  switch (action.type) {
    case SET_SEMESTERS:
      return { ...state, semesters: action.semesters };
    case SET_CURRENT_SEMESTER:
      return { ...state, currentSemester: action.semester };
    default:
      return state;
  }
};

export default semester;
