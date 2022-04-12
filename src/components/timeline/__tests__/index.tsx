import { render } from '@testing-library/react';
import Timeline, { TimelineItem } from '../index';

describe('Timeline', () => {
  it('render correctly', () => {
    render(
      <Timeline>
        <TimelineItem dot="hi">custom dot</TimelineItem>
      </Timeline>
    );
  });
});
