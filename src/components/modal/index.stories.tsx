import { useState } from 'react';
import Modal from './index';
import Button from '../button';

export default {
  title: 'Components/Modal',
  component: Modal
};

export const modal = () => {
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
