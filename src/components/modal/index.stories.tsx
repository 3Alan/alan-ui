import Modal from './index';
import Button from '../button';
import { useState } from 'react';

export default {
  title: 'Components/Modal',
  component: Modal
};

export const Default = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>open</Button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        awesome modal
      </Modal>
    </>
  );
};
Default.storyName = 'awesome modal';
