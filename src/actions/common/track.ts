const BASE_STRING = 'C_T_';

/* eslint-disable prefer-template */
export const SET_TRACKS = `${BASE_STRING}SET_TRACKS` as const;
/* eslint-enable prefer-template */

import GeneralTrack from '@/shapes/model/graduation/GeneralTrack';
import AdditionalTrack from '@/shapes/model/graduation/AdditionalTrack';

export function setTracks(tracks: Array<GeneralTrack | AdditionalTrack>) {
  return {
    type: SET_TRACKS,
    tracks: tracks,
  };
}

export type TrackAction = ReturnType<typeof setTracks>;
