import { MediaAction, SET_IS_PORTRAIT } from '../../actions/common/media';

interface MediaState {
  isPortrait: boolean;
}

const initialState: MediaState = {
  isPortrait: false,
};

const media = (state = initialState, action: MediaAction): MediaState => {
  switch (action.type) {
    case SET_IS_PORTRAIT:
      return { ...state, isPortrait: action.isPortrait };
    default:
      return state;
  }
};

export default media;
