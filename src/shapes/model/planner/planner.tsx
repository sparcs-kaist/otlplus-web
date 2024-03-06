import takenPlannerItem from './takenPlannerItem';
import futurePlannerItem from './futurePlannerItem';
import arbitraryPlannerItem from './arbitraryPlannerItem';
import generalTrack from '../graduation/generalTrack';
import majorTrack from '../graduation/majorTrack';
import additionalTrack from '../graduation/additionalTrack';

export default interface planner {
  id: number;
  start_year: number;
  end_year: number;
  general_track: generalTrack;
  major_track: majorTrack;
  additional_tracks: additionalTrack[];
  taken_items: takenPlannerItem[];
  future_items: futurePlannerItem[];
  arbitrary_items: arbitraryPlannerItem[];
  arrange_order: number;
}
