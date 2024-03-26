import { render, sampleLecture } from '@/test-utils';
import HorizontalTimetableTile from '../HorizontalTimetableTile';

test('render HorizontalTimetableTile', async () => {
  render(
    <HorizontalTimetableTile
      lecture={sampleLecture}
      beginIndex={0}
      endIndex={0}
      color={0}
      cellWidth={0}
      cellHeight={0}
    />,
  );
});
