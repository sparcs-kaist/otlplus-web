import type { LectureFocusFrom } from '@/shapes/enum';
import type Lecture from '@/shapes/model/subject/Lecture';
import type Review from '@/shapes/model/review/Review';

type EmtpyArray = [];

interface FromNone {
  from: LectureFocusFrom.NONE;
  clicked: false;
  lecture?: null;
  reviews?: null;
  multipleTitle: '';
  multipleDetails: EmtpyArray;
}

interface FromListOrTable {
  from: LectureFocusFrom.LIST | LectureFocusFrom.TABLE;
  clicked: boolean;
  lecture?: Lecture;
  reviews?: Review[];
  multipleTitle: '';
  multipleDetails: EmtpyArray;
}

interface FromMutliple {
  from: LectureFocusFrom.TABLE;
  clicked: false;
  lecture?: null;
  reviews?: null;
  multipleTitle: '';
  multipleDetails: {
    lecture?: Lecture;
    name: string;
    info: string;
  }[];
}

type LectureFocus = FromNone | FromListOrTable | FromMutliple;

export default LectureFocus;
