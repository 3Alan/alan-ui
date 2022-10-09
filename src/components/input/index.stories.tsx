import { ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Input from './index';

export default {
  title: 'Components/Input',
  component: Input
};

export const input: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = useState('Alan');

  return <Input value={value} onChange={(e) => setValue(e.target.value)} {...args} />;
};

input.args = {
  label: 'Name'
};
