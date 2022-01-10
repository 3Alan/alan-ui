import { render } from '@testing-library/react';
import Progress from '../index';

describe('Progress', () => {
  it('inner should have correct width', () => {
    const { getByTestId } = render(<Progress percent={30} />);
    const inner = getByTestId('inner');
    expect(inner).toHaveStyle('width: 30%');
  });

  it('text should have correct content', () => {
    const { getByTestId } = render(<Progress percent={30} />);
    const text = getByTestId('text');
    expect(text).toContainHTML('30%');
  });

  it('text should be hidden when showText is false', () => {
    const { queryByTestId } = render(<Progress percent={30} showText={false} />);
    const text = queryByTestId('text');
    expect(text).toBeFalsy();
  });

  it('width and text should be 100 when percent is more than 100', () => {
    const { getByTestId } = render(<Progress percent={120} />);
    const text = getByTestId('text');
    const inner = getByTestId('inner');
    expect(text).toContainHTML('100%');
    expect(inner).toHaveStyle('width: 100%');
  });

  it('width and text should be 0 when percent is less than 0', () => {
    const { getByTestId } = render(<Progress percent={-20} />);
    const text = getByTestId('text');
    const inner = getByTestId('inner');
    expect(text).toContainHTML('0%');
    expect(inner).toHaveStyle('width: 0%');
  });
});
