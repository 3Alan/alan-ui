import classNames from 'classnames';
import { FC, FocusEvent, InputHTMLAttributes, useState } from 'react';
import { RoughWrap } from '../roughWrap';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const cls = 'alan-input';

export const Input: FC<InputProps> = (props) => {
  const { className, label, onFocus, ...restProps } = props;
  const [roughProps, setRoughProps] = useState({
    stroke: '#1F2937'
  });

  const onInternalFocus = (e: FocusEvent<HTMLInputElement>) => {
    setRoughProps({ stroke: '#3B82F6' });
    onFocus?.(e);
  };

  const onInternalBlur = (e: FocusEvent<HTMLInputElement>) => {
    setRoughProps({ stroke: '#1F2937' });
    onFocus?.(e);
  };

  return (
    <RoughWrap
      shape="roundedRectTangle"
      radius="9 9 9 9"
      contentClassName={`${cls}-wrap`}
      roughProps={{ roughness: 0, fillStyle: 'solid', ...roughProps }}
      customElement="div"
      className={classNames(cls, className)}
    >
      <div className={`${cls}-content-wrap`}>
        <span className={`${cls}-label`} style={{ color: roughProps.stroke }}>
          {label}
        </span>
        <input data-testid="input" {...restProps} onFocus={onInternalFocus} onBlur={onInternalBlur} />
      </div>
    </RoughWrap>
  );
};

export default Input;
