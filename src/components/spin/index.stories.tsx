import { useState } from 'react';
import Button from '../button';
import SpinComponent from './index';

export default {
  title: 'Components/Spin',
  component: SpinComponent
};

export const Spin = () => {
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
      <SpinComponent spinning={spining} />
    </>
  );
};
