import { render, sampleCourse, sampleLecture } from '@/test-utils';
import PlannerTile from '../PlannerTile';
import { PlannerItemType } from '@/shapes/enum';

test('renders PlannerTile', async () => {
  render(
    <PlannerTile
      item={{
        id: 0,
        item_type: PlannerItemType.TAKEN,
        is_excluded: true,
        lecture: sampleLecture,
        course: sampleCourse,
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
