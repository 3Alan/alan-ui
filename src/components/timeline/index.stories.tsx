import { ComponentStory } from '@storybook/react';
import { FaGithub, FaRegCheckCircle } from 'react-icons/fa';
import Tooltip from '../tooltip';
import Timeline from '../timeline';
import { TimelineItem } from './TimelineItem';
import Icon from '../icon';

export default {
  title: 'Components/Timeline',
  component: Tooltip,
  argTypes: {}
};
const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Timeline>
    <TimelineItem dot="hi">custom dot</TimelineItem>
    <TimelineItem>
      <div>
        <div style={{ paddingBottom: 10 }}>default dot</div>
        <div>hello</div>
      </div>
    </TimelineItem>
    <TimelineItem dot={<Icon item={FaGithub} width={16} />}>https://github.com/3Alan/alan-ui</TimelineItem>
    <TimelineItem dot={<Icon item={FaRegCheckCircle} width={16} fill="green" />}>4214</TimelineItem>
  </Timeline>
);

export const timeline = Template.bind({});
