import { ComponentStory } from '@storybook/react';
import { FaGithub } from 'react-icons/fa';
import RoughOptions from '../../roughOptions';
import Icon from './index';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    ...RoughOptions,
    item: {
      control: false
    }
  }
};

export const icon: ComponentStory<typeof Icon> = (args) => <Icon {...args} item={FaGithub} />;

icon.args = {
  width: 100,
  height: 100
};
