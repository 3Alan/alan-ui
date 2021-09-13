import { ComponentStory } from '@storybook/react';
import Tabs from './index';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {}
};

const Template: ComponentStory<typeof Tabs> = (args) => {
  return <Tabs {...args} />;
};

export const tabs = Template.bind({});
tabs.args = {};
