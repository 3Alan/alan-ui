import { render } from '@testing-library/react';
import Icon from '../index';

describe('Icon', () => {
  it('render correct', () => {
    render(<Icon type="close" />);
  });
});
