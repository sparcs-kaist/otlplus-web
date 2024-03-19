import { useTranslatedString } from '@/hooks/useTranslatedString';
import Lecture from '@/shapes/model/subject/Lecture';
import i18n from 'i18next';

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
