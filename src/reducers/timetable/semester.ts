import { RESET, SET_SEMESTER, SemesterAction } from '@/actions/timetable/semester';
import { SemesterType } from '@/shapes/enum';

interface SemesterState {
  year: number | null;
  semester: SemesterType | null;
}

const initialState: SemesterState = {
  year: null,
  semester: null,
};

const semester = (state = initialState, action: SemesterAction): SemesterState => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case SET_SEMESTER: {
      return {
        year: action.year,
        semester: action.semester,
      };
    }
    default: {
      return state;
    }
  }
};

export default semester;
