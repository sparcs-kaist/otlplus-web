const BASE_STRING = 'C_T_';

export const SET_TRACKS = `${BASE_STRING}SET_TRACKS` as const;

import GeneralTrack from '@/shapes/model/graduation/GeneralTrack';
import MajorTrack from '@/shapes/model/graduation/MajorTrack';
import AdditionalTrack from '@/shapes/model/graduation/AdditionalTrack';

export interface Tracks {
  general: GeneralTrack[];
  major: MajorTrack[];
  additional: AdditionalTrack[];
}

export function setTracks(tracks: Tracks) {
  return {
    type: SET_TRACKS,
    tracks: tracks,
  };
}

export type TrackAction = ReturnType<typeof setTracks>;
