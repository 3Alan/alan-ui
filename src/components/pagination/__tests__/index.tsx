import { render } from '@testing-library/react';
import { useState } from 'react';
import Pagination, { PaginationProps } from '../index';

const PaginationTester = (props: Omit<PaginationProps, 'current' | 'onChange' | 'pageSize'>) => {
  const [current, setCurrent] = useState(1);
  return (
    <Pagination
      current={current}
      pageSize={20}
      onChange={(page) => {
        setCurrent(page);
      }}
      {...props}
    />
  );
};

describe('Pagination', () => {
  it('prev button is disabled when current = 1', () => {
    const { getByText } = render(<PaginationTester total={120} />);
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('6')).toBeInTheDocument();
  });
});
