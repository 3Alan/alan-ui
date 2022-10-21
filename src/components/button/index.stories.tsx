import { ComponentStory } from '@storybook/react';
import Button from './index';

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
    showShadow: {
      control: 'boolean'
    },
    radius: {
      description: '边框圆角半径',
      table: {
        type: {
          summary: 'string',
          detail: 'tl tr br bl'
        },
        defaultValue: {
          summary: '0 0 0 0'
        }
      },
      control: { type: 'text' }
    }
  }
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>awesome</Button>;

export const button = Template.bind({});
button.args = {
  type: 'primary',
  disabled: false,
  size: 'default',
  radius: '0 0 0 0'
};
