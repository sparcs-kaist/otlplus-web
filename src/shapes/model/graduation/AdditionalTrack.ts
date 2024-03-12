import type Department from '../subject/Department';
import type { AdditionalTrackType } from '@/shapes/enum';

export default interface AdditionalTrack {
  id: number;
  start_year: number;
  end_year: number;
  type: AdditionalTrackType;
  department?: Department;
  major_required: number;
  major_elective: number;
}
