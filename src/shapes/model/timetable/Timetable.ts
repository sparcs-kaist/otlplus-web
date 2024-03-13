import type Lecture from '../subject/Lecture';

export interface MyPseudoTimetable {
  id: number;
  lectures: Lecture[];
  isReadOnly: true;
}

export default interface Timetable {
  id: number;
  lectures: Lecture[];
  arrange_order: number;
}
