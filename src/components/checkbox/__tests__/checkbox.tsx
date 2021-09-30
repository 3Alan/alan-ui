import { render, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import Checkbox from '../Checkbox';

const CheckboxTester = () => {
  const [checked, setChecked] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Checkbox checked={checked} onChange={onChange}>
      checkbox
    </Checkbox>
  );
};

describe('Checkbox', () => {
  it('should checkable when click without checked props', () => {
    const { getByText, getByRole } = render(<Checkbox>checkbox</Checkbox>);
    fireEvent.click(getByText('checkbox'));
    expect(getByRole('checkbox')).toBeChecked();

    fireEvent.click(getByText('checkbox'));
    expect(getByRole('checkbox')).not.toBeChecked();
  });

  it('should checkable when click with checked props', () => {
    const { getByText, getByRole } = render(<CheckboxTester />);
    fireEvent.click(getByText('checkbox'));
    expect(getByRole('checkbox')).toBeChecked();

    fireEvent.click(getByText('checkbox'));
    expect(getByRole('checkbox')).not.toBeChecked();
  });
});
