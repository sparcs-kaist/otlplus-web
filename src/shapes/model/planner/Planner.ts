import type TakenPlannerItem from './TakenPlannerItem';
import type FuturePlannerItem from './FuturePlannerItem';
import type ArbitraryPlannerItem from './ArbitraryPlannerItem';
import type GeneralTrack from '../graduation/GeneralTrack';
import type MajorTrack from '../graduation/MajorTrack';
import type AdditionalTrack from '../graduation/AdditionalTrack';

export default interface Planner {
  id: number;
  start_year: number;
  end_year: number;
  general_track: GeneralTrack;
  major_track: MajorTrack;
  additional_tracks: AdditionalTrack[];
  taken_items: TakenPlannerItem[];
  future_items: FuturePlannerItem[];
  arbitrary_items: ArbitraryPlannerItem[];
  arrange_order: number;
}
