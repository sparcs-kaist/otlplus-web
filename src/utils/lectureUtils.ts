import i18n from 'i18next';

import { LectureFocusFrom } from '@/shapes/enum';

import { getStr as getStrOfExamtime } from './examtimeUtils';
import Lecture from '@/shapes/model/subject/Lecture';
import Timetable from '@/shapes/model/timetable/Timetable';
import LectureFocus, { FromListOrTable, FromMutliple } from '@/shapes/state/timetable/LectureFocus';
import { useTranslatedString } from '@/hooks/useTranslatedString';

export const isSpecialLecture = (lecture: Lecture) => {
  const isNormalLecture =
    lecture.class_title === lecture.class_no || (lecture.class_title === 'A' && !lecture.class_no);
  return !isNormalLecture;
};

export const inTimetable = (lecture: Lecture, timetable: Timetable) =>
  timetable && timetable.lectures.some((l) => l.id === lecture.id);

export const inCart = (lecture: Lecture, cart: Lecture[][]) =>
  cart.lectureGroups !== null &&
  cart.lectureGroups.some((lg: Lecture[]) => lg.some((l) => l.id === lecture.id));

export const isListClicked = (lecture: Lecture, lectureFocus: LectureFocus) =>
  lectureFocus.from === LectureFocusFrom.LIST &&
  lectureFocus.clicked === true &&
  lectureFocus.lecture?.id === lecture.id;

export const isListFocused = (lecture: Lecture, lectureFocus: FromListOrTable) =>
  lectureFocus.from === LectureFocusFrom.LIST && lectureFocus.lecture.id === lecture.id;

export const isTableClicked = (lecture: Lecture, lectureFocus: FromListOrTable) =>
  lectureFocus.from === LectureFocusFrom.TABLE &&
  lectureFocus.clicked === true &&
  lectureFocus.lecture?.id === lecture.id;

export const isTableFocused = (lecture: Lecture, lectureFocus: FromListOrTable) =>
  lectureFocus.from === LectureFocusFrom.TABLE && lectureFocus.lecture?.id === lecture.id;

export const isSingleFocused = (lecture: Lecture, lectureFocus: LectureFocus) =>
  lectureFocus.lecture !== null && lectureFocus.lecture?.id === lecture.id;

export const isMultipleFocused = (lecture: Lecture, lectureFocus: FromMutliple) =>
  lectureFocus.from === LectureFocusFrom.MULTIPLE &&
  lectureFocus.multipleDetails.some((d) => d.lecture.id === lecture.id);

export const isDimmedTableLecture = (lecture: Lecture, lectureFocus: LectureFocus) =>
  lectureFocus.clicked === true && lectureFocus.lecture?.id !== lecture.id;

export const isDimmedListLectureGroup = (lectureGroup: Lecture[][], lectureFocus: LectureFocus) =>
  lectureFocus.clicked === true &&
  (lectureGroup.every((l) => lectureFocus.lecture?.id !== l.id) ||
    lectureFocus.from !== LectureFocusFrom.LIST);

export const isFocused = (lecture: Lecture, lectureFocus: LectureFocus) =>
  isSingleFocused(lecture, lectureFocus) || isMultipleFocused(lecture, lectureFocus);

export const getOverallLectures = (selectedTimetable, lectureFocus: LectureFocus) => {
  const timetableLectures = selectedTimetable ? selectedTimetable.lectures : [];
  const hasSingleFocusedLectureOutsideTable =
    lectureFocus.lecture && !inTimetable(lectureFocus.lecture, selectedTimetable);

  return timetableLectures.concat(
    hasSingleFocusedLectureOutsideTable ? [lectureFocus.lecture] : [],
  );
};

// SYNC: Keep synchronized with Django apps/subject/models.py Lecture.get_professors_short_str()
export const getProfessorsShortStr = (lecture: Lecture) => {
  const translate = useTranslatedString();
  const professors = lecture.professors.slice().sort((a, b) => (a.name < b.name ? -1 : 1));
  const professorNames = professors.map((p) => translate(p, 'name'));
  if (professorNames.length <= 2) {
    return professorNames.join(', ');
  }
  return i18n.t('ui.others.sthAndNumOtherPeople', {
    something: professorNames[0],
    count: professorNames.length - 1,
  });
};

export const getProfessorsFullStr = (lecture: Lecture) => {
  const translate = useTranslatedString();
  const professors = lecture.professors.slice().sort((a, b) => (a.name < b.name ? -1 : 1));
  const professorNames = professors.map((p) => translate(p, 'name'));
  return professorNames.join(', ');
};

export const getBuildingStr = (lecture: Lecture) => {
  const { classtimes } = lecture;
  if (classtimes.length === 0) {
    return i18n.t('ui.placeholder.unknown');
  }
  return classtimes[0].building_code;
};

export const getClassroomStr = (lecture: Lecture) => {
  const translate = useTranslatedString();
  const { classtimes } = lecture;
  if (classtimes.length === 0) {
    return i18n.t('ui.placeholder.unknown');
  }
  return translate(classtimes[0], 'classroom');
};

export const getRoomStr = (lecture: Lecture) => {
  const { classtimes } = lecture;
  const translate = useTranslatedString();
  if (classtimes.length === 0) {
    return i18n.t('ui.placeholder.unknown');
  }
  return translate(classtimes[0], 'room_name');
};

export const getExamFullStr = (lecture: Lecture) => {
  const { examtimes } = lecture;
  const examStrings = examtimes.map((e) => getStrOfExamtime(e));
  if (examStrings.length === 0) {
    return i18n.t('ui.placeholder.unknown');
  }
  return examStrings.join(', ');
};

export const getColorNumber = (lecture: Lecture) => (lecture.course % 16) + 1;

export const getSyllabusUrl = (lecture: Lecture) =>
  `https://cais.kaist.ac.kr/syllabusInfo?year=${lecture.year}&term=${lecture.semester}&subject_no=${lecture.code}&lecture_class=${lecture.class_no}&dept_id=${lecture.department}`;
