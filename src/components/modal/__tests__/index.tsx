import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import { Button } from '../../button';
import Modal, { ModalProps } from '../index';

const ModalTester = (props: Omit<ModalProps, 'visible' | 'onClose'>) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button data-testid="open" onClick={() => setShow(true)}>
        open
      </Button>
      <Modal visible={show} onClose={() => setShow(false)} {...props}>
        modal content
      </Modal>
    </>
  );
};

describe('Modal', () => {
  it('toggle modal', () => {
    const { getByTestId, getByText, queryByText } = render(<ModalTester />);
    fireEvent.click(getByTestId('open'));
    expect(getByText('modal content')).toBeInTheDocument();

    fireEvent.click(getByText('Close'));
    expect(queryByText('modal content')).toBeFalsy();
  });

  it('should close when click outside modal', () => {
    const { getByTestId, queryByText, container } = render(<ModalTester />);
    fireEvent.click(getByTestId('open'));

    fireEvent.mouseDown(container);
    expect(queryByText('modal content')).toBeFalsy();
  });

  it('should not close when click outside modal', () => {
    const { getByTestId, queryByText, container } = render(<ModalTester maskClosable={false} />);
    fireEvent.click(getByTestId('open'));

    fireEvent.mouseDown(container);
    expect(queryByText('modal content')).toBeInTheDocument();
  });
});
