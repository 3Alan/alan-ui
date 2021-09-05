import { render } from '@testing-library/react';
import Button from '../index';

it('test example', () => {
  const wrapper = render(<Button>awesome</Button>);
  const element = wrapper.queryByText('awesome');
  expect(element).toBeTruthy();
});
