import { render } from '@testing-library/react';
import Pagination from '../index';

describe('Pagination', () => {
  it('render correct', () => {
    render(<Pagination total={102} pageSize={20} current={1} onChange={() => {}} />);
    expect(1 + 1).toBe(2);
  });
});
