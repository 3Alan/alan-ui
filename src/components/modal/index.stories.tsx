import ModalComponent from './index';
import Button from '../button';
import { useState } from 'react';

export default {
  title: 'Components/Modal',
  component: ModalComponent
};

export const Modal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>open</Button>
      <ModalComponent visible={visible} onClose={() => setVisible(false)}>
        awesome modal
      </ModalComponent>
    </>
  );
};
