import { ComponentStory } from '@storybook/react';
import Tooltip from '.';
import Button from '../button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: { control: false }
  }
};
const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div style={{ padding: 40, width: 300, margin: 'auto' }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Tooltip placement="top" {...args}>
        <Button>top</Button>
      </Tooltip>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
      <Tooltip placement="left" {...args}>
        <Button>left</Button>
      </Tooltip>
      <Tooltip placement="right" {...args}>
        <Button>right</Button>
      </Tooltip>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Tooltip placement="bottom" {...args}>
        <Button>bottom</Button>
      </Tooltip>
    </div>
  </div>
);

export const tooltip = Template.bind({});
tooltip.args = {
  content: 'a button',
  trigger: 'hover'
};
