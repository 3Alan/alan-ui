import Button from './index';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['primary', 'standard'],
      control: { type: 'select' }
    },
    onClick: {
      action: 'clicked',
      table: {
        disable: true
      }
    },
    drawnStyle: {
      options: [
        'hachure',
        'solid',
        'zigzag',
        'cross-hatch',
        'dots',
        'sunburst',
        'dashed',
        'zigzag-line'
      ],
      control: { type: 'select' }
    },
    roughness: {
      control: { type: 'range', min: 0, max: 3, step: 0.1 }
    }
  }
};

const Template: ComponentStory<typeof Button> = args => <Button {...args}>awesome</Button>;

export const DefaultSize = Template.bind({});
DefaultSize.args = {
  type: 'primary',
  disabled: false,
  size: 'default'
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  type: 'primary',
  disabled: false,
  size: 'small'
};
