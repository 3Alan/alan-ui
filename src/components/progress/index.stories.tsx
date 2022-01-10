import { ComponentStory } from '@storybook/react';
import { useInterval } from 'ahooks';
import { useState } from 'react';
import Progress from './index';

export default {
  title: 'Components/Progress',
  component: Progress
};

export const progress: ComponentStory<typeof Progress> = (args) => {
  const [percent, setPercent] = useState(30);

  useInterval(() => {
    if (percent > 100) {
      setPercent(30);
    } else {
      setPercent(percent + 10);
    }
  }, 1000);

  return <Progress {...args} percent={percent} />;
};
