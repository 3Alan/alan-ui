import Button from '../button';
import { useState } from 'react';
import Spin from './index';

export default {
  title: 'Components/Spin',
  component: Spin
};

export const Default = () => {
  const [spining, setSpining] = useState(false);

  const onSpin = () => {
    setSpining(true);
    setTimeout(() => {
      setSpining(false);
    }, 6000);
  };

  return (
    <>
      <Button onClick={onSpin}>open 6s自动关闭</Button>
      <Spin spinning={spining}></Spin>
    </>
  );
};

Default.storyName = 'awesome spin';
