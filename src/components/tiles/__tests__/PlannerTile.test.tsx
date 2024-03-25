import { render } from '@/test-utils';
import PlannerTile from '../PlannerTile';
import { PlannerItemType, SemesterType } from '@/shapes/enum';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'ko',
      },
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  withTranslation: () => (Component: any) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };
    return Component;
  },
}));

test('loads and displays greeting', async () => {
  render(
    <PlannerTile
      item={{
        id: 0,
        item_type: PlannerItemType.TAKEN,
        is_excluded: true,
        lecture: {
          id: 0,
          title: '',
          title_en: '',
          course: 0,
          old_code: '',
          class_no: '',
          year: 0,
          semester: SemesterType.SPRING,
          code: '',
          department: 0,
          department_code: '',
          department_name: '',
          department_name_en: '',
          type: '',
          type_en: '',
          limit: 0,
          num_people: 0,
          is_english: false,
          num_classes: 0,
          num_labs: 0,
          credit: 0,
          credit_au: 0,
          common_title: '',
          common_title_en: '',
          class_title: '',
          class_title_en: '',
          review_total_weight: 0,
          professors: [],
          grade: 0,
          load: 0,
          speech: 0,
          classtimes: [],
          examtimes: [],
        },
        course: {
          id: 0,
          old_code: '',
          type: '',
          type_en: '',
          title: '',
          title_en: '',
          summary: '',
          review_total_weight: 0,
          credit: 0,
          credit_au: 0,
          num_classes: 0,
          num_labs: 0,
          related_courses_prior: [],
          related_courses_posterior: [],
          professors: [],
          grade: 0,
          load: 0,
          speech: 0,
          userspecific_is_read: false,
        },
      }}
      yearIndex={0}
      semesterIndex={0}
      beginIndex={0}
      endIndex={0}
      color={0}
      tableSize={0}
      cellWidth={0}
      cellHeight={0}
      isPlannerWithSummer={false}
      isPlannerWithWinter={false}
      isDuplicate={false}
      isRaised={false}
      isHighlighted={false}
      isDimmed={false}
      isSimple={false}
      deleteLecture={(_) => {
        throw new Error('Function not implemented.');
      }}
    />,
  );
});
