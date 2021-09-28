import { render } from '@testing-library/react';
import { FaTimes } from 'react-icons/fa';
import Icon from '../index';

describe('Icon', () => {
  it('render correct', () => {
    render(<Icon item={FaTimes} />);
  });
});
