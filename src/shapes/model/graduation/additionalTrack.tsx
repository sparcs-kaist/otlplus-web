import department from '../subject/department';
import { AdditionalTrackType } from '@/shapes/enum';

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
