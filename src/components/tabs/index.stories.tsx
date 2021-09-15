import { ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Tabs from './index';
import TabPane from './components/Pane';
import { Button } from '../button';
import { ToolTip } from '../tooltip';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: { TabPane },
  argTypes: {
    activeKey: { control: false }
  }
};

const Template: ComponentStory<typeof Tabs> = () => {
  const [key, setKey] = useState('1');
  return (
    <Tabs activeKey={key} onChange={(k) => setKey(k)}>
      <TabPane title="pane 1" tabKey="1">
        <div>pane 1 content</div>
        <p>It is a Tab component</p>
        <ToolTip content="toolTip">
          <Button>hover me</Button>
        </ToolTip>
      </TabPane>
      <TabPane title="pane 2" tabKey="2">
        <p>pane 2 content</p>
        <Button type="standard">standard button</Button>
      </TabPane>
      <TabPane title="disabled pane" tabKey="3" disabled>
        <p>disabled content</p>
      </TabPane>
    </Tabs>
  );
};

export const tabs = Template.bind({});
