import { render, sampleLecture } from '@/test-utils';
import LectureGroupBlock from '../LectureGroupBlock';
import LectureGroupBlockRow from '../LectureGroupBlockRow';
import LectureGroupSimpleBlock from '../LectureGroupSimpleBlock';
import LectureSimpleBlock from '../LectureSimpleBlock';

test('render LectureGroupBlock', async () => {
  render(
    <LectureGroupBlock
      lectureGroup={[sampleLecture]}
      isRaised={false}
      isDimmed={false}
      isTaken={false}
    />,
  );
});

test('render LectureGroupBlockRow', async () => {
  render(
    <LectureGroupBlockRow
      lecture={sampleLecture}
      isHighlighted={false}
      inTimetable={false}
      isTimetableReadonly={false}
      inCart={false}
      fromCart={false}
      addToCart={() => {}}
      addToTable={() => {}}
      deleteFromCart={() => {}}
    />,
  );
});

test('render LectureGroupSimpleBlock', async () => {
  render(<LectureGroupSimpleBlock lectures={[sampleLecture]} />);
});

test('render LectureSimpleBlock', async () => {
  render(
    <LectureSimpleBlock
      lecture={sampleLecture}
      isRaised={false}
      isDimmed={false}
      hasReview={false}
    />,
  );
});
