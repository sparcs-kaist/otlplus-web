import Semester from '@/shapes/model/subject/Semester';
import i18n from 'i18next';
import { SemesterType } from '@/shapes/enum';

export const getSemesterName = (semesterIndex: SemesterType) => {
  const semesterNames = {
    [SemesterType.SPRING]: i18n.t('ui.semester.spring'),
    [SemesterType.SUMMER]: i18n.t('ui.semester.summer'),
    [SemesterType.FALL]: i18n.t('ui.semester.fall'),
    [SemesterType.WINTER]: i18n.t('ui.semester.winter'),
  };
  return semesterNames[semesterIndex];
};

// TimeTable Page 우측 상단에서 학기 탭에 사용됩니다.
export const getTimetableSemester = (semesters: Semester[]): Semester => {
  const semestersDescending = semesters
    .filter((s) => s.courseDesciptionSubmission !== null)
    .map((s) => ({
      semesterObject: s,
      timetableStartTime: new Date(s.courseDesciptionSubmission),
    }))
    .sort((a, b) => b.timetableStartTime.getTime() - a.timetableStartTime.getTime());
  const now = Date.now();
  const timetableSemester = semestersDescending.find((s) => s.timetableStartTime.getTime() < now);
  if (timetableSemester === undefined) {
    return semesters[semesters.length - 1];
  }
  return timetableSemester.semesterObject;
};

// SYNC: Keep synchronized with Django apps/subject/models.py Semester.get_ongoing_semester()
export const getOngoingSemester = (semesters: Semester[]) => {
  const now = Date.now();
  const ongoingSemester = semesters.find(
    (s) => new Date(s.beginning).getTime() < now && now < new Date(s.end).getTime(),
  );
  return ongoingSemester; // Should return undefined when matching semester does not exist
};

// Main Page 의 상단에 현재 학사스케줄을 표시할 때 사용됩니다. ex) 수강신청기간 시작
export const getCurrentSchedule = (semesters: Semester[]) => {
  const USED_SCHEDULE_FIELDS = [
    'beginning',
    'end',
    'courseRegistrationPeriodStart',
    'courseRegistrationPeriodEnd',
    'courseAddDropPeriodEnd',
    'courseDropDeadline',
    'courseEvaluationDeadline',
    'gradePosting',
  ] as const;

  const allSchedules = semesters
    .map((s) =>
      USED_SCHEDULE_FIELDS.map((f) => {
        if (s[f] === null) {
          return undefined;
        }
        return {
          year: s.year,
          semester: s.semester,
          type: f,
          time: new Date(s[f]),
        };
      }),
    )
    .flat(1)
    .filter((s) => s !== undefined)
    .sort((a, b) => a.time.getTime() - b.time.getTime());
  const now = Date.now();
  const currentSchedule = allSchedules.find((s) => s.time.getTime() > now);

  return currentSchedule;
};
