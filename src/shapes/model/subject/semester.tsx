interface semester {
  year: number;
  semester: 1 | 2 | 3 | 4;
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
