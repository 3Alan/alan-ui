import { ComponentStory } from '@storybook/react';
import Tooltip from '../tooltip';
import Button from '../button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip
};
const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div style={{ padding: 80 }}>
    <Tooltip {...args}>
      <Button>hover me</Button>
    </Tooltip>
  </div>
);

export const tooltip = Template.bind({});
tooltip.args = {
  content: 'a button',
  trigger: 'hover',
  placement: 'top'
};
