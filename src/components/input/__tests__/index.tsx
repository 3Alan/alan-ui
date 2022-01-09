import { fireEvent, render } from '@testing-library/react';
import Input from '../index';

describe('Input', () => {
  it('render', () => {
    const { getByTestId } = render(<Input />);
    const internalInput = getByTestId('input');
    fireEvent.focusIn(internalInput);
    fireEvent.focusOut(internalInput);
  });
});
