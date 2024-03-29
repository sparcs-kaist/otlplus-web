import { render } from '@/test-utils';
import TimetableDragTile from '../TimetableDragTile';

test('renders TimetableDragTile', async () => {
  render(
    <TimetableDragTile dayIndex={0} beginIndex={0} endIndex={0} cellWidth={0} cellHeight={0} />,
  );
});
