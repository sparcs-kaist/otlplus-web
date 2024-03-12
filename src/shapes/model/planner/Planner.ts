import TakenPlannerItem from './TakenPlannerItem';
import FuturePlannerItem from './FuturePlannerItem';
import ArbitraryPlannerItem from './ArbitraryPlannerItem';
import GeneralTrack from '../graduation/GeneralTrack';
import MajorTrack from '../graduation/MajorTrack';
import AdditionalTrack from '../graduation/AdditionalTrack';

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
