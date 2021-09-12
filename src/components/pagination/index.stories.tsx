import { ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Pagination from './index';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    current: { control: false }
  }
};

const Template: ComponentStory<typeof Pagination> = (args) => {
  const [current, setCurrent] = useState(1);

  return (
    <Pagination
      {...args}
      current={current}
      onChange={(page) => {
        setCurrent(page);
      }}
    />
  );
};

export const pagination = Template.bind({});
pagination.args = {
  pageSize: 20,
  total: 102
};
