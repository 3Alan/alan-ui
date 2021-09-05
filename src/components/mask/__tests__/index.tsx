import { render } from '@testing-library/react';
import Mask from '../index';

const pageWrapper = document.createElement('div');
pageWrapper.style.width = '100vw';
pageWrapper.style.height = '200vw';

describe('Mask', () => {
  it('body should unscrollable when mounted', () => {
    render(<Mask />);
    expect(document.body.style.height).toBe('100%');
    expect(document.body.style.overflow).toBe('hidden');
  });
});
