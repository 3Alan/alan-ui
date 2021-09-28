import { ComponentStory } from '@storybook/react';
import Paper from './index';

export default {
  title: 'Components/Paper',
  component: Paper,
  argTypes: {
    current: { control: false }
  }
};

export const paper: ComponentStory<typeof Paper> = (args) => <Paper {...args}>123412</Paper>;
