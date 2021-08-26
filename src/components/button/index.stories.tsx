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
    size: {
      control: false
    },
    onClick: {
      action: 'clicked',
      table: {
        disable: true
      }
    },
    drawnStyle: {
      options: ['hachure', 'solid', 'zigzag', 'cross-hatch', 'dots', 'dashed', 'zigzag-line'],
      control: { type: 'select' }
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
