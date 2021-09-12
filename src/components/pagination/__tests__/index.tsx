import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import Pagination, { PaginationProps } from '../index';

const mockFn = jest.fn();

const PaginationTester = (
  props: Omit<PaginationProps, 'current' | 'onChange' | 'pageSize'> & { defaultCurrent?: number }
) => {
  const { defaultCurrent = 1 } = props;
  const [current, setCurrent] = useState(defaultCurrent);
  return (
    <Pagination
      current={current}
      pageSize={20}
      onChange={(page) => {
        mockFn(page);
        setCurrent(page);
      }}
      {...props}
    />
  );
};

describe('Pagination', () => {
  it('prev button is disabled when current = 1', () => {
    const { getByTitle, getByRole } = render(<PaginationTester total={120} />);
    const prevButton = getByRole('list').firstElementChild;
    expect(prevButton).toHaveClass('alan-pagination-disabled');
    expect(getByTitle('1')).toHaveClass('alan-pagination-active');
    fireEvent.click(prevButton as HTMLLIElement);
    expect(getByTitle('1')).toHaveClass('alan-pagination-active');
  });

  it('should jump to next page when click next button and disabled when jump to end page', () => {
    const { getByTitle, getByRole } = render(<PaginationTester total={50} defaultCurrent={2} />);
    const nextButton = getByRole('list').lastElementChild;
    expect(nextButton).not.toHaveClass('alan-pagination-disabled');
    expect(getByTitle('2')).toHaveClass('alan-pagination-active');
    fireEvent.click(nextButton as HTMLLIElement);
    expect(getByTitle('3')).toHaveClass('alan-pagination-active');
    expect(nextButton).toHaveClass('alan-pagination-disabled');
  });

  it('should jump to prev page when click prev button and disabled when jump to start page', () => {
    const { getByTitle, getByRole } = render(<PaginationTester total={50} defaultCurrent={2} />);
    const prevButton = getByRole('list').firstElementChild;
    expect(prevButton).not.toHaveClass('alan-pagination-disabled');
    expect(getByTitle('2')).toHaveClass('alan-pagination-active');
    fireEvent.click(prevButton as HTMLLIElement);
    expect(getByTitle('1')).toHaveClass('alan-pagination-active');
    expect(prevButton).toHaveClass('alan-pagination-disabled');
  });

  it('should jump to the clicked pager and return current page', () => {
    const { getByTitle } = render(<PaginationTester total={50} />);
    fireEvent.click(getByTitle('2') as HTMLLIElement);
    expect(getByTitle('2')).toHaveClass('alan-pagination-active');
    expect(mockFn).toHaveBeenCalledWith(2);
  });

  it('pagination disabled', () => {
    const { getByTitle, container } = render(<PaginationTester disabled total={200} />);
    fireEvent.click(getByTitle('1') as HTMLLIElement);
    expect(getByTitle('1')).not.toHaveClass('alan-pagination-active');
    expect(mockFn).not.toHaveBeenCalled();

    fireEvent.click(getByTitle('>>') as HTMLLIElement);
    expect(mockFn).not.toHaveBeenCalled();

    fireEvent.click(container.lastElementChild as HTMLLIElement);
    expect(mockFn).not.toHaveBeenCalled();

    fireEvent.click(container.firstElementChild as HTMLLIElement);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should display jumpNext when there are more than 6 pages', () => {
    const { getByTitle } = render(<PaginationTester total={122} />);
    expect(getByTitle('>>')).toBeInTheDocument();
  });

  it('should not display jumpNext when there are less than 6 pages', () => {
    const { queryByText } = render(<PaginationTester total={120} />);
    expect(queryByText('>>')).toBeFalsy();
  });

  it('should display jumpPrev when there are more than 9 pages and current is 6', () => {
    const { getByTitle } = render(<PaginationTester total={200} defaultCurrent={6} />);
    expect(getByTitle('<<')).toBeInTheDocument();
  });

  it('should jump 5 pages when click jumpNext/jumpPrev', () => {
    const { getByTitle } = render(<PaginationTester total={300} defaultCurrent={10} />);
    expect(getByTitle('10')).toHaveClass('alan-pagination-active');
    fireEvent.click(getByTitle('<<'));
    expect(getByTitle('5')).toHaveClass('alan-pagination-active');

    fireEvent.click(getByTitle('>>'));
    fireEvent.click(getByTitle('>>'));
    expect(getByTitle('15')).toHaveClass('alan-pagination-active');
  });
});
