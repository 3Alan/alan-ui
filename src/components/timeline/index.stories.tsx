import { ComponentStory } from '@storybook/react';
import Timeline from '../timeline';
import { TimelineItem } from './TimelineItem';

export default {
  title: 'Components/Timeline',
  component: Timeline
};

const Template: ComponentStory<typeof Timeline> = () => (
  <Timeline>
    <TimelineItem color="#34D399">alan-ui</TimelineItem>
    <TimelineItem color="#FBBF24">https://github.com/3Alan/alan-ui</TimelineItem>
    <TimelineItem color="#F87171">2022-9-20</TimelineItem>
    <TimelineItem>
      <div>
        <div style={{ paddingBottom: 10 }}>2022-10-20</div>
        <div>new ui style</div>
      </div>
    </TimelineItem>
  </Timeline>
);

export const timeline = Template.bind({});
