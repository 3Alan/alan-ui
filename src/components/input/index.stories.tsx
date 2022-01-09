import { ComponentStory } from '@storybook/react';
import Input from './index';

export default {
  title: 'Components/Input',
  component: Input
};

export const input: ComponentStory<typeof Input> = (args) => <Input {...args} />;
