import department from '../subject/department';

export default interface arbitraryPlannerItem {
  id: number;
  item_type: 'ARBITRARY';
  is_excluded: boolean;
  year: number;
  semester: 1 | 2 | 3 | 4;
  department?: department;
  type: string;
  type_en: string;
  credit: number;
  credit_au: number;
}
