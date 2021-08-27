import { FC, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useCallback } from 'react';
import RoughWrap from '../roughWrap';

export interface ButtonProps {
  size?: 'small' | 'default';
  type?: 'standard' | 'primary';
  disabled?: boolean;
  className?: string;
  /**
   * 手绘风格
   */
  drawnStyle?:
    | 'hachure'
    | 'solid'
    | 'zigzag'
    | 'cross-hatch'
    | 'dots'
    | 'sunburst'
    | 'dashed'
    | 'zigzag-line';
  /**
   * 潦草程度 推荐：0-10
   */
  roughness?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const cls = 'btn';

export const typeStyle = {
  primary: {
    fill: '#93C5FD',
    stroke: '#3B82F6'
  },
  standard: {
    fill: '#6B7280',
    stroke: '#4B5563'
  }
};

/**
 * 按钮组件
 */
export const Button: FC<
  ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLElement>, 'onClick' | 'type' | 'disabled'>
> = props => {
  const {
    children,
    type = 'primary',
    className,
    size,
    disabled,
    drawnStyle,
    roughness,
    ...restProps
  } = props;
  const [fillStyle, setFillStyle] = useState(drawnStyle);

  const classes = classNames(
    cls,
    `${cls}-base`,
    {
      [`${cls}-${size}`]: size !== 'default'
    },
    className
  );

  const shapProps = useMemo(
    () => ({
      fill: disabled ? '#D1D5DB' : typeStyle[type].fill,
      stroke: disabled ? '#9CA3AF' : typeStyle[type].stroke,
      fillStyle
    }),
    [type, fillStyle, disabled]
  );

  const onEnterEffect = useCallback(() => {
    if (disabled) {
      return;
    }
    setFillStyle('zigzag');
  }, [disabled]);

  const onLeaveEffect = useCallback(() => {
    if (disabled) {
      return;
    }
    setFillStyle(drawnStyle);
  }, [disabled, drawnStyle]);

  return (
    <RoughWrap
      customElement="button"
      shap="rectTangle"
      shapProps={shapProps}
      className={classes}
      style={{ color: disabled ? '#9CA3AF' : typeStyle[type].stroke }}
      disabled={disabled}
      onMouseEnter={onEnterEffect}
      onMouseLeave={onLeaveEffect}
      {...restProps}
    >
      <div className={`${cls}-inner-wrap`}>{children}</div>
    </RoughWrap>
  );
};

Button.defaultProps = {
  type: 'primary',
  size: 'default',
  drawnStyle: 'hachure',
  roughness: 1,
  disabled: false,
  className: ''
};

export default Button;
