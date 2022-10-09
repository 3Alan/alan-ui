import classNames from 'classnames';
import { FC, useContext, useMemo, useState } from 'react';
import ReactRough, { Path } from '../rough';
import GroupContext from './GroupContext';

export interface CheckboxProps {
  /**
   * 默认是否选中
   */
  defaultChecked?: boolean;
  /**
   * 是否选中
   */
  checked?: boolean;
  disabled?: boolean;
  /**
   * 用于group
   */
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const cls = 'alan-checkbox';

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { children, checked: outerChecked, defaultChecked, onChange: outerOnChange, disabled, value } = props;
  const groupContext = useContext(GroupContext);

  const [innerChecked, setInnerChecked] = useState(defaultChecked || false);

  const register = (checked: boolean | undefined) => {
    if (groupContext && 'value' in props) {
      return groupContext.value.includes(value as string);
    }
    return checked;
  };

  const checked = useMemo(() => {
    return 'checked' in props ? register(outerChecked) : register(innerChecked);
  }, [outerChecked, innerChecked]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    groupContext?.toggleOption(value as string);

    if ('checked' in props) {
      outerOnChange?.(e);
    } else {
      setInnerChecked(e.target.checked);
    }
  };

  return (
    <label className={classNames(cls, { [`${cls}-disabled`]: disabled })}>
      <span>
        <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} value={value} />
      </span>

      <ReactRough className={`${cls}-box`} width={20} height={20} renderer="svg" svgViewBox="0 0 512 512">
        <Path
          d="M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64"
          roughness={0}
          strokeWidth={5}
          stroke={disabled ? '#9CA3AF' : '#1F2937'}
          // eslint-disable-next-line no-nested-ternary
          fill={disabled ? '#F3F4F6' : checked ? '#34D399' : '#fff'}
          fillStyle="solid"
        />
      </ReactRough>

      {checked && (
        <ReactRough className={`${cls}-icon`} width={20} height={20} renderer="svg" svgViewBox="0 0 512 512">
          <Path
            d="M213.333 362.667 106.667 256 136.531 226.136 213.333 302.938 375.469 140.802 405.333 170.667 213.333 362.667"
            roughness={0}
            bowing={0}
            strokeWidth={1}
            stroke={disabled ? '#9CA3AF' : 'none'}
            fill="#fff"
            fillStyle="solid"
          />
        </ReactRough>
      )}

      <span className={`${cls}-content`}>{children}</span>
    </label>
  );
};

export default Checkbox;
