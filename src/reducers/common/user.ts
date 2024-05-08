import User from '@/shapes/model/session/User';
import { SET_USER, UPDATE_USER_REVIEW, UserAction } from '../../actions/common/user';

interface UserState {
  user?: User;
}

const initialState: UserState = {
  user: undefined,
};

export const reducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case UPDATE_USER_REVIEW: {
      if (state.user === undefined) {
        return state;
      }
      const originalReviews = state.user?.reviews || [];
      const { review } = action;
      const foundIndex = originalReviews.findIndex((r) => r.id === review.id);
      const newReviews =
        foundIndex !== -1
          ? [
              ...originalReviews.slice(0, foundIndex),
              review,
              ...originalReviews.slice(foundIndex + 1, originalReviews.length),
            ]
          : [...originalReviews.slice(), review];
      return { ...state, user: { reviews: newReviews } };
    }
    default:
      return state;
  }
};

export default reducer;
