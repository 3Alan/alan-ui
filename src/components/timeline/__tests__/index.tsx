import { render } from '@testing-library/react';
import Timeline, { TimelineItem } from '../index';

describe('Timeline', () => {
  it('render correctly', () => {
    render(
      <Timeline>
        <TimelineItem>custom dot</TimelineItem>
        <TimelineItem color="#374151">custom dot</TimelineItem>
      </Timeline>
    );
  });
});
