import department from '../subject/department';

export enum AdditionalTrackType {
  DOUBLE,
  MINOR,
  ADVANCED,
  INTERDISCIPLINARY,
}

interface additionalTrack {
  id: number;
  start_year: number;
  end_year: number;
  type: AdditionalTrackType;
  department?: department;
  major_required: number;
  major_elective: number;
}

export default additionalTrack;
