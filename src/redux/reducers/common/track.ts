import { SET_TRACKS, TrackAction, Tracks } from '../../actions/common/track';

interface TrackState {
  tracks: Tracks | null;
}

const initialState: TrackState = {
  tracks: null,
};

const track = (state = initialState, action: TrackAction): TrackState => {
  switch (action.type) {
    case SET_TRACKS:
      return { ...state, tracks: action.tracks };
    default:
      return state;
  }
};

export default track;
