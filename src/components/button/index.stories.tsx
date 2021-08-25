import Button from './index';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['primary', 'standard'],
      control: { type: 'radio' }
    }
  }
};

const Template: ComponentStory<typeof Button> = args => <Button {...args}>awesome</Button>;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary'
};
