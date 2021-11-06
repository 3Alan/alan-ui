import { ComponentStory, Meta } from '@storybook/react';
import { FaGithub } from 'react-icons/fa';
import Icon from '../icon';
import ConfigProvider, { ConfigProviderProps } from './index';

export default {
  title: 'Components/ConfigProvider',
  component: ConfigProvider
} as Meta<ConfigProviderProps>;

const Template: ComponentStory<typeof ConfigProvider> = (args) => {
  return (
    <ConfigProvider fillStyle="zigzag" {...args}>
      <Icon item={FaGithub} width={100} height={100} />
    </ConfigProvider>
  );
};

export const configProvider = Template.bind({});

configProvider.storyName = 'ConfigProvider';
