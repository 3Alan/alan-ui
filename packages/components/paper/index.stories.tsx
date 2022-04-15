import { ComponentStory } from '@storybook/react';
import Paper from './index';

export default {
  title: 'Components/Paper',
  component: Paper
};

export const paper: ComponentStory<typeof Paper> = (args) => <Paper {...args}>123412</Paper>;
