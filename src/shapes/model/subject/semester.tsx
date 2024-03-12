import { SemesterType } from '@/shapes/enum';
interface semester {
  year: number;
  semester: SemesterType;
  beginning: string;
  end: string;

  courseDesciptionSubmission: string;
  courseRegistrationPeriodStart: string;
  courseRegistrationPeriodEnd: string;
  courseAddDropPeriodEnd: string;
  courseDropDeadline: string;
  courseEvaluationDeadline: string;
  gradePosting: string;
}

export default semester;
