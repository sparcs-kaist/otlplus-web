import i18n from 'i18next';
import { getStr as getStrOfExamtime } from './examtimeUtils';
import Lecture from '@/shapes/model/subject/Lecture';
import Timetable from '@/shapes/model/timetable/Timetable';
import { LectureFocusFrom } from '@/shapes/enum';
import { getTranslatedString } from './translationUtils';
import LectureFocus from '@/shapes/state/timetable/LectureFocus';
import LectureLists from '@/shapes/state/timetable/LectureLists';

// 타임테이블 페이지에서 사용되는 유틸들입니다.
// 특정 렉처가 어디에서 포커싱되었는지를 확인하거나, 렉처 내부의 프로퍼티 이름을 가져오는 등의 목적을 위해서 사용됩니다.
// util 이름이 직관적이라 따로 설명 주석을 달지는 않았습니다.
export const isSpecialLecture = (lecture: Lecture) => {
  const isNormalLecture =
    lecture.class_title === lecture.class_no || (lecture.class_title === 'A' && !lecture.class_no);
  return !isNormalLecture;
};

export const inTimetable = (lecture: Lecture, timetable: Timetable) =>
  timetable && timetable.lectures.some((l) => l.id === lecture.id);

export const inCart = (lecture: Lecture, cart: LectureLists['cart']) =>
  cart.lectureGroups !== null &&
  cart.lectureGroups.some((lg: Lecture[]) => lg.some((l) => l.id === lecture.id));

export const isListClicked = (lecture: Lecture, lectureFocus: LectureFocus) =>
  lectureFocus.from === LectureFocusFrom.LIST &&
  lectureFocus.clicked === true &&
  lectureFocus.lecture?.id === lecture.id;

export const isListFocused = (lecture: Lecture, lectureFocus: LectureFocus) =>
  lectureFocus.from === LectureFocusFrom.LIST && lectureFocus.lecture?.id === lecture.id;

export const isTableClicked = (lecture: Lecture, lectureFocus: LectureFocus) =>
  lectureFocus.from === LectureFocusFrom.TABLE &&
  lectureFocus.clicked === true &&
  lectureFocus.lecture?.id === lecture.id;

export const isTableFocused = (lecture: Lecture, lectureFocus: LectureFocus) =>
  lectureFocus.from === LectureFocusFrom.TABLE && lectureFocus.lecture?.id === lecture.id;

export const isSingleFocused = (lecture: Lecture, lectureFocus: LectureFocus) =>
  lectureFocus.lecture !== null && lectureFocus.lecture?.id === lecture.id;

export const isMultipleFocused = (lecture: Lecture, lectureFocus: LectureFocus) =>
  lectureFocus.from === LectureFocusFrom.MULTIPLE &&
  lectureFocus.multipleDetails.some((d) => d.lecture.id === lecture.id);

export const isDimmedTableLecture = (lecture: Lecture, lectureFocus: LectureFocus) =>
  lectureFocus.clicked === true && lectureFocus.lecture?.id !== lecture.id;

export const isDimmedListLectureGroup = (lectureGroup: Lecture[], lectureFocus: LectureFocus) =>
  lectureFocus.clicked === true &&
  (lectureGroup.every((l) => lectureFocus.lecture?.id !== l.id) ||
    lectureFocus.from !== LectureFocusFrom.LIST);

export const isFocused = (lecture: Lecture, lectureFocus: LectureFocus) =>
  isSingleFocused(lecture, lectureFocus) || isMultipleFocused(lecture, lectureFocus);

//  포커싱된 lecture와 현재 타임테이블의 모든 lecture의 목록을 반환합니다.
export const getOverallLectures = (selectedTimetable: Timetable, lectureFocus: LectureFocus) => {
  const timetableLectures = selectedTimetable ? selectedTimetable.lectures : [];
  const hasSingleFocusedLectureOutsideTable =
    lectureFocus.lecture && !inTimetable(lectureFocus.lecture, selectedTimetable);

  return timetableLectures.concat(
    hasSingleFocusedLectureOutsideTable ? [lectureFocus.lecture] : [],
  );
};

// SYNC: Keep synchronized with Django apps/subject/models.py Lecture.get_professors_short_str()
export const getProfessorsShortStr = (lecture: Lecture) => {
  const professors = lecture.professors.slice().sort((a, b) => (a.name < b.name ? -1 : 1));
  const professorNames = professors.map((p) => getTranslatedString(p, 'name'));
  if (professorNames.length <= 2) {
    return professorNames.join(', ');
  }
  return i18n.t('ui.others.sthAndNumOtherPeople', {
    something: professorNames[0],
    count: professorNames.length - 1,
  });
};

export const getProfessorsFullStr = (lecture: Lecture) => {
  const professors = lecture.professors.slice().sort((a, b) => (a.name < b.name ? -1 : 1));
  const professorNames = professors.map((p) => getTranslatedString(p, 'name'));
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
  const { classtimes } = lecture;
  if (classtimes.length === 0) {
    return i18n.t('ui.placeholder.unknown');
  }
  return getTranslatedString(classtimes[0], 'classroom');
};

export const getRoomStr = (lecture: Lecture) => {
  const { classtimes } = lecture;

  if (classtimes.length === 0) {
    return i18n.t('ui.placeholder.unknown');
  }
  return getTranslatedString(classtimes[0], 'room_name');
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
