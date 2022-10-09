import React, { FC, useMemo, useCallback, memo } from 'react';
import classNames from 'classnames';

import RoughWrap, { RoughWrapProps } from '../roughWrap';

export interface ButtonProps extends Pick<RoughWrapProps, 'showShadow' | 'radius'> {
  size?: 'small' | 'default' | 'large';
  type?: 'standard' | 'primary';
  disabled?: boolean;
  className?: string;
  /**
   * 手绘风格
   */
  drawnStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'sunburst' | 'dashed' | 'zigzag-line';
  /**
   * 潦草程度 推荐：0-10
   */
  roughness?: number;
  /** 边框宽度 */
  borderWidth?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const cls = 'alan-btn';

export const typeStyle = {
  primary: {
    fill: '#DDD6FE',
    stroke: '#374151',
    color: '#374151'
  },
  standard: {
    fill: '#1F2937',
    stroke: '#1F2937',
    color: '#F3F4F6'
  }
};

/**
 * 按钮组件
 */
export const Button: FC<
  ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'disabled'>
> = (props) => {
  const {
    children,
    type = 'primary',
    className,
    size,
    disabled,
    drawnStyle,
    roughness,
    radius,
    borderWidth,
    showShadow,
    ...restProps
  } = props;

  const classes = classNames(
    cls,
    `${cls}-base`,
    {
      [`${cls}-${size}`]: size !== 'default'
    },
    className
  );

  const roughProps = useMemo(
    () => ({
      fill: disabled ? '#D1D5DB' : typeStyle[type].fill,
      stroke: disabled ? '#9CA3AF' : typeStyle[type].stroke,
      fillStyle: drawnStyle,
      roughness,
      strokeWidth: borderWidth
    }),
    [type, drawnStyle, disabled]
  );

  const onEnterEffect = useCallback(() => {
    if (!disabled) {
      // TODO: hover effect
    }
  }, [disabled]);

  const onLeaveEffect = useCallback(() => {
    if (!disabled) {
      /// TODO: hover effect
    }
  }, [disabled, drawnStyle]);

  return (
    <RoughWrap
      customElement="button"
      shape="roundedRectTangle"
      radius={radius}
      roughProps={roughProps}
      className={classes}
      style={{ color: disabled ? '#9CA3AF' : typeStyle[type].color }}
      disabled={disabled}
      showShadow={showShadow}
      onMouseEnter={onEnterEffect}
      onMouseLeave={onLeaveEffect}
      {...restProps}
    >
      {children}
    </RoughWrap>
  );
};

Button.defaultProps = {
  type: 'primary',
  size: 'default',
  drawnStyle: 'solid',
  roughness: 0,
  disabled: false,
  className: '',
  borderWidth: 1
};

export default memo(Button);
