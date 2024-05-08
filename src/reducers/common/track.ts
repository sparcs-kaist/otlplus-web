import { SET_TRACKS, TrackAction, TracksProps } from '../../actions/common/track';

interface TrackState {
  tracks: TracksProps | null;
}

const initialState: TrackState = {
  tracks: null,
};

export const reducer = (state = initialState, action: TrackAction): TrackState => {
  switch (action.type) {
    case SET_TRACKS:
      return { ...state, tracks: action.tracks };
    default:
      return state;
  }
};

export default reducer;
