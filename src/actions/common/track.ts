const BASE_STRING = 'C_T_';

/* eslint-disable prefer-template */
export const SET_TRACKS = `${BASE_STRING}SET_TRACKS` as const;
/* eslint-enable prefer-template */

import GeneralTrack from '@/shapes/model/graduation/GeneralTrack';
import MajorTrack from '@/shapes/model/graduation/MajorTrack';
import AdditionalTrack from '@/shapes/model/graduation/AdditionalTrack';

interface TracksProps {
  general: GeneralTrack[];
  major: MajorTrack[];
  additional: AdditionalTrack[];
}

export function setTracks(tracks: TracksProps) {
  return {
    type: SET_TRACKS,
    tracks: tracks,
  };
}

export type TrackAction = ReturnType<typeof setTracks>;
