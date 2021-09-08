import { fireEvent, render } from '@testing-library/react';
import { ToolTip, ToolTipProps } from '../index';

const TooltipTester = (props: Omit<ToolTipProps, 'content' | 'children'>) => {
  return (
    <ToolTip content="content" {...props}>
      <div>tooltip</div>
    </ToolTip>
  );
};

describe('Tooltip', () => {
  it('content should display when hover', () => {
    jest.useFakeTimers();
    const { getByText } = render(<TooltipTester trigger="hover" />);
    fireEvent.mouseEnter(getByText('tooltip'));

    const popover = document.querySelector('.rc-trigger-popup');
    expect(popover).toBeInTheDocument();
    expect(popover).toContainHTML('content');

    fireEvent.mouseLeave(getByText('tooltip'));
    setTimeout(() => {
      expect(popover).not.toBeInTheDocument();
    }, 1000);

    jest.runAllTimers();
  });

  it('content should display when click', () => {
    const { getByText } = render(<TooltipTester placement="top" trigger="click" />);
    fireEvent.click(getByText('tooltip'));

    const popover = document.querySelector('.alan-tooltip-content');
    expect(popover).toBeInTheDocument();
    expect(popover).toContainHTML('content');
  });
});
