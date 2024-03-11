import department from '../subject/department';

interface majorTrack {
  id: number;
  start_year: number;
  end_year: number;
  department: department;
  basic_elective_doublemajor: number;
  major_required: number;
  major_elective: number;
}

export default majorTrack;
