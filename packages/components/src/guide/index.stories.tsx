import { ComponentStory, Meta } from '@storybook/react';
import { useState } from 'react';
import Button from '../button';
import GuideComponent, { GuideProps } from './index';

export default {
  title: 'Components/Guide',
  component: GuideComponent,
  argTypes: {
    selector: {
      description: '高亮元素（使用css选择器）',
      table: {
        category: 'StepItem',
        type: {
          summary: 'string'
        }
      }
    },
    spotType: {
      description: '高亮效果',
      table: {
        category: 'StepItem',
        type: {
          summary: 'underline | box | circle | highlight | strike-through | crossed-off | bracket'
        }
      }
    },
    spotColor: {
      description: '高亮颜色',
      table: {
        category: 'StepItem',
        type: {
          summary: 'string'
        }
      }
    },
    multiline: {
      description: '多行效果，且只作用于行内元素',
      table: {
        category: 'StepItem',
        type: {
          summary: 'boolean'
        }
      }
    },
    content: {
      description: '弹框内容',
      table: {
        category: 'StepItem',
        type: {
          summary: 'any'
        }
      }
    },
    mask: {
      control: false
    }
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: 30, paddingBottom: 300 }}>
        <Story />
      </div>
    )
  ]
} as Meta<GuideProps>;

const Template: ComponentStory<typeof GuideComponent> = (args) => {
  const [show, setShow] = useState(false);
  return (
    <div className="alan">
      <p>To prevent the inability to view the docs, current example has mask props (default true) set to false</p>
      <Button onClick={() => setShow(true)}>start</Button>
      <p>
        Hello, my name is <span id="one">Alan</span>
      </p>
      <div style={{ height: 600, width: 200 }} />
      <p>
        It is a nice <strong className="two">guide</strong> component
      </p>
      <p>
        It is a nice <strong className="two2">guide</strong> component
      </p>
      <div style={{ height: 600, width: 200 }} />
      <p>
        This is my <span id="three">github</span>
      </p>
      <span id="four">
        It is a long paragraph!It is a long paragraph!It is a long paragraph!It is a long paragraph!It is a long
        paragraph!It is a long paragraph!It is a long paragraph!
      </span>

      {show && <GuideComponent {...args} />}
    </div>
  );
};

export const guide = Template.bind({});
guide.args = {
  steps: [
    {
      selector: '#one',
      spotType: 'box',
      spotColor: 'red',
      content: '😘😘😘'
    },
    {
      selector: '.two',
      spotType: 'underline',
      spotColor: 'red',
      content: '🎉🎉🎉'
    },
    {
      selector: '.two2',
      spotType: 'strike-through',
      content: '👀👀👀'
    },
    {
      selector: '#three',
      spotType: 'circle',
      spotColor: '#fff176',
      content: '🎶🎶🎶'
    },
    {
      selector: '#four',
      spotType: 'highlight',
      spotColor: '#fff176',
      content: '🎶🎶🎶',
      multiline: true
    }
  ],
  mask: false
};
