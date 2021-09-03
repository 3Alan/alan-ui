import { ComponentStory } from '@storybook/react';
import GuideComponent from './index';

export default {
  title: 'Components/Guide',
  component: GuideComponent
};

const Template: ComponentStory<typeof GuideComponent> = (args) => {
  return (
    <div style={{ padding: '100px 30px 300px 30px' }}>
      <p>
        Hello, my name is <span id="one">Alan</span>
      </p>
      <p>
        It is a nice <strong className="two">guide</strong> component
      </p>
      <p>
        This is my <span id="three">github</span>
      </p>

      <GuideComponent {...args} />
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
      content: '❤❤❤'
    },
    {
      selector: '#three',
      spotType: 'highlight',
      spotColor: '#fff176',
      content: '🎶🎶🎶'
    }
  ]
};
