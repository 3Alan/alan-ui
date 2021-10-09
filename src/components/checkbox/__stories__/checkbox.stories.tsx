import { ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Checkbox from '../Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: false },
    value: {
      table: {
        disable: true
      }
    }
  }
};

export const checkbox: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Checkbox {...args} checked={checked} onChange={onChange}>
      checkbox
    </Checkbox>
  );
};
