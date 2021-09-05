import { render } from '@testing-library/react';
import Spin from '../index';

const pageWrapper = document.createElement('div');
pageWrapper.style.width = '100vw';
pageWrapper.style.height = '200vw';

describe('Spin', () => {
  it('body should unscrollable when mounted', () => {
    const { queryByText } = render(<Spin spinning />);
    expect(queryByText('Loading')).toBeTruthy();
    expect(document.body.style.height).toBe('100%');
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should unvisible when spinning set false', async () => {
    const { queryByText } = render(<Spin spinning={false} />);
    expect(queryByText('Loading')).toBeFalsy();
  });
});
