import classNames from 'classnames';
import { FC, useContext, useMemo, useState } from 'react';
import ReactRough, { LinearPath } from '../rough';
import { RoughWrap } from '../roughWrap';
import GroupContext from './GroupContext';

interface CheckboxProps {
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

      <RoughWrap
        shapeProps={{
          bowing: 1,
          roughness: 0.5,
          stroke: disabled ? '#9CA3AF' : '#374151',
          fill: disabled ? '#F3F4F6' : '#fff',
          fillStyle: 'solid'
        }}
        className={`${cls}-box`}
        customElement="span"
        shape="rectTangle"
      />

      {checked && (
        <div className={`${cls}-icon`}>
          <ReactRough width={14} height={14} renderer="svg">
            <LinearPath
              points={[
                [0, 7],
                [6, 13],
                [14, 1]
              ]}
              roughness={0.5}
              bowing={0}
              strokeWidth={2}
              stroke={disabled ? '#9CA3AF' : '#3B82F6'}
            />
          </ReactRough>
        </div>
      )}

      <span className={`${cls}-content`}>{children}</span>
    </label>
  );
};

export default Checkbox;
