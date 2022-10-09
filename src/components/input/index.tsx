import classNames from 'classnames';
import { FC, FocusEvent, InputHTMLAttributes } from 'react';
import { RoughWrap } from '../roughWrap';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const cls = 'alan-input';

export const Input: FC<InputProps> = (props) => {
  const { className, label, onFocus, ...restProps } = props;

  const onInternalFocus = (e: FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);
  };

  const onInternalBlur = (e: FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);
  };

  return (
    <RoughWrap
      shape="roundedRectTangle"
      radius="9 9 9 9"
      contentClassName={`${cls}-wrap`}
      roughProps={{ roughness: 0, stroke: '#1F2937', fillStyle: 'solid' }}
      customElement="div"
      className={classNames(cls, className)}
    >
      <div className={`${cls}-content-wrap`}>
        <span className={`${cls}-label`}>{label}</span>
        <input data-testid="input" {...restProps} onFocus={onInternalFocus} onBlur={onInternalBlur} />
      </div>
    </RoughWrap>
  );
};

export default Input;
