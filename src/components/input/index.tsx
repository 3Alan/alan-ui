import classNames from 'classnames';
import { FC, FocusEvent, InputHTMLAttributes, useState } from 'react';
import { RoughWrap } from '../roughWrap';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const cls = 'alan-input';

export const Input: FC<InputProps> = (props) => {
  const { className, onFocus, ...restProps } = props;
  const [roughProps, setRoughProps] = useState({
    stroke: '#d9d9d9'
  });

  const onInternalFocus = (e: FocusEvent<HTMLInputElement>) => {
    setRoughProps({
      stroke: '#000000d9'
    });
    onFocus?.(e);
  };

  const onInternalBlur = (e: FocusEvent<HTMLInputElement>) => {
    setRoughProps({
      stroke: '#d9d9d9'
    });
    onFocus?.(e);
  };

  return (
    <RoughWrap shape="rectTangle" roughProps={roughProps} customElement="div" className={classNames(cls, className)}>
      <input data-testid="input" {...restProps} onFocus={onInternalFocus} onBlur={onInternalBlur} />
    </RoughWrap>
  );
};

export default Input;
