import Modal from './index';
import { ComponentStory } from '@storybook/react';
import Button from '../button';
import { useState } from 'react';

export default {
  title: 'Components/Modal',
  component: Modal
};

// const Template: ComponentStory<typeof Modal> = args => {
//   const [visible, setVisible] = useState(false);
//   console.log(visible);

//   return (
//     <>
//       <Button onClick={() => setVisible(true)}>open</Button>
//       <Modal {...args}>awesome modal</Modal>
//     </>
//   );
// };

export const Default = () => {
  const [visible, setVisible] = useState(false);
  console.log(visible);

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
