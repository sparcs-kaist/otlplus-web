import { render, sampleClasstime, sampleLecture } from '@/test-utils';
import TimetableTile from '../TimetableTile';

test('renders TimetableTile', async () => {
  render(
    <TimetableTile
      lecture={sampleLecture}
      classtime={sampleClasstime}
      tableIndex={0}
      dayIndex={0}
      beginIndex={0}
      endIndex={0}
      color={0}
      cellWidth={0}
      cellHeight={0}
      isTimetableReadonly={false}
      isRaised={false}
      isHighlighted={false}
      isDimmed={false}
      isTemp={false}
      isSimple={false}
      deleteLecture={function (_): void {
        throw new Error('Function not implemented.');
      }}
    />,
  );
});
