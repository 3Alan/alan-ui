import { render, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import CheckboxGroup from '../Group';
import Checkbox from '../Checkbox';

const checkList = ['Alan', 'Bob'];
const checkListOptions = checkList.map((item) => ({ label: item, value: item }));

const CheckboxGroupTester = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [value, setValue] = useState<string[]>([]);

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllChecked(e.target.checked);
    if (e.target.checked) {
      setValue(checkList);
    } else {
      setValue([]);
    }
  };

  const onCheckAllChange = (value: string[]) => {
    setValue(value);
  };

  return (
    <div>
      <Checkbox checked={allChecked} onChange={checkAll}>
        check all
      </Checkbox>
      <div style={{ margin: '10px 0 0 10px' }}>
        <CheckboxGroup value={value} onChange={onCheckAllChange} options={checkListOptions} />
      </div>
    </div>
  );
};

describe('CheckboxGroup', () => {
  it('all checkbox should checked when click check all', () => {
    const { getByText, getAllByRole } = render(<CheckboxGroupTester />);

    fireEvent.click(getByText('Alan'));
    expect(getAllByRole('checkbox')[0]).not.toBeChecked();

    fireEvent.click(getByText('check all'));
    getAllByRole('checkbox').forEach((item) => {
      expect(item).toBeChecked();
    });

    fireEvent.click(getByText('check all'));
    getAllByRole('checkbox').forEach((item) => {
      expect(item).not.toBeChecked();
    });
  });

  it('all checkbox is checkable', () => {
    const { getByText, getAllByRole } = render(<CheckboxGroup options={checkListOptions} />);
    fireEvent.click(getByText('Alan'));
    expect(getAllByRole('checkbox')[0]).toBeChecked();

    fireEvent.click(getByText('Alan'));
    expect(getAllByRole('checkbox')[0]).not.toBeChecked();
  });

  it('should return ["Alan", "Bob"], false when all child checkbox is checked', () => {
    const mockFn = jest.fn();
    const { getByText, getAllByRole } = render(<CheckboxGroup options={checkListOptions} onChange={mockFn} />);
    fireEvent.click(getByText('Alan'));
    fireEvent.click(getByText('Bob'));
    getAllByRole('checkbox').forEach((item) => {
      expect(item).toBeChecked();
    });

    expect(mockFn).toHaveBeenCalledWith(['Alan', 'Bob'], true);

    fireEvent.click(getByText('Alan'));
    expect(getAllByRole('checkbox')[0]).not.toBeChecked();
  });
});
