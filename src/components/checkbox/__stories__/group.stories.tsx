import { ComponentStory } from '@storybook/react';
import { useState } from 'react';
import CheckboxGroup from '../Group';
import Checkbox from '../Checkbox';

export default {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    options: { control: false },
    value: { control: false }
  }
};

const checkList = ['Alan', 'Bob'];
const checkListOptions = checkList.map((item) => ({ label: item, value: item }));

export const checkboxGroup: ComponentStory<typeof CheckboxGroup> = (args) => {
  const [allChecked, setAllChecked] = useState(false);
  const [value, setValue] = useState<string[]>([]);

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllChecked(e.target.checked);
    if (e.target.checked) {
      setValue(checkList);
    } else {
      setValue([]);
    }
  };

  const onCheckAllChange = (value: string[], allChecked: boolean) => {
    setValue(value);
    setAllChecked(allChecked);
  };

  return (
    <div>
      <Checkbox checked={allChecked} onChange={checkAll}>
        check all
      </Checkbox>
      <div style={{ margin: '10px 0 0 10px' }}>
        <CheckboxGroup {...args} value={value} onChange={onCheckAllChange} options={checkListOptions} />
      </div>
    </div>
  );
};

checkboxGroup.storyName = 'CheckboxGroup';
