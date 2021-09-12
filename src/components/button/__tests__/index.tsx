import { fireEvent, render } from '@testing-library/react';
import Button from '../index';

const mockClickFn = jest.fn();

describe('Button', () => {
  it('should clickable when disabled set to false', () => {
    const { container } = render(
      <Button onClick={mockClickFn} type="primary">
        awesome
      </Button>
    );
    fireEvent.click(container.firstChild as HTMLButtonElement);
    expect(mockClickFn).toHaveBeenCalled();

    fireEvent.mouseLeave(container.firstChild as HTMLButtonElement);
  });

  it('should disabled when disabled set to true', () => {
    const { container } = render(
      <Button disabled onClick={mockClickFn}>
        awesome
      </Button>
    );
    expect(container.firstChild).toHaveAttribute('disabled');
    fireEvent.click(container.firstChild as HTMLButtonElement);
    expect(mockClickFn).not.toHaveBeenCalled();

    fireEvent.mouseEnter(container.firstChild as HTMLButtonElement);
    fireEvent.mouseLeave(container.firstChild as HTMLButtonElement);
    expect(container.firstChild).toHaveStyle('color: #9CA3AF');
  });

  it('should change size when size changed', () => {
    const { container } = render(
      <Button size="small" type="standard">
        small button
      </Button>
    );
    expect(container.firstChild).toHaveClass('alan-btn-small');
  });
  it('small size', () => {
    const { container } = render(
      <Button size="small" type="standard">
        small button
      </Button>
    );
    fireEvent.mouseEnter(container.firstChild as HTMLButtonElement);
    expect(container.firstChild).toHaveClass('alan-btn-small');
  });
});
