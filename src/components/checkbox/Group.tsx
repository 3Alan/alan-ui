import React, { FC, useMemo, useState } from 'react';
import Checkbox from './Checkbox';
import GroupContext from './GroupContext';

export interface CheckboxOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  /**
   * 选中的checkbox的值
   */
  value?: string[];
  disabled?: boolean;
  onChange?: (value: string[], allChecked: boolean) => void;
}

export const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const { options, disabled, onChange, value: outerValue = [] } = props;
  // 受控组件
  const underControl = 'value' in props;

  const [innerValue, setInnerValue] = useState<string[]>([]);

  const value = useMemo(() => {
    return underControl ? outerValue : innerValue;
  }, [innerValue, outerValue]);

  const toggleOption = (v: string) => {
    const optionIndex = value.indexOf(v);
    const newValue = [...value];
    if (optionIndex === -1) {
      newValue.push(v);
    } else {
      newValue.splice(optionIndex, 1);
    }
    if (!underControl) {
      setInnerValue(newValue);
    }

    const allChecked = newValue.length === options.length;
    onChange?.(newValue, allChecked);
  };

  const children = options.map((item) => (
    <Checkbox
      key={item.value}
      value={item.value}
      checked={value?.includes(item.value)}
      disabled={disabled || item.disabled}
    >
      {item.label}
    </Checkbox>
  ));

  return <GroupContext.Provider value={{ value, disabled, toggleOption }}>{children}</GroupContext.Provider>;
};

export default CheckboxGroup;
