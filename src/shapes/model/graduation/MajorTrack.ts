import type Department from '../subject/Department';

export default interface MajorTrack {
  id: number;
  start_year: number;
  end_year: number;
  department: Department;
  basic_elective_doublemajor: number;
  major_required: number;
  major_elective: number;
}
