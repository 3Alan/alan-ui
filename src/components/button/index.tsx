import React, { FC, useMemo, useCallback, memo } from 'react';
import classNames from 'classnames';
import { Options } from 'roughjs/bin/core';
import RoughWrap, { RoughWrapProps } from '../roughWrap';

export interface ButtonProps extends Pick<RoughWrapProps, 'showShadow' | 'radius'> {
  size?: 'small' | 'default' | 'large';
  type?: 'standard' | 'primary';
  disabled?: boolean;
  className?: string;
  /** roughjs 相关参数 */
  roughProps?: Options;
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
  const { children, type = 'primary', className, size, disabled, radius, showShadow, roughProps, ...restProps } = props;

  const classes = classNames(
    cls,
    `${cls}-base`,
    {
      [`${cls}-${size}`]: size !== 'default'
    },
    className
  );

  const finalRoughProps = useMemo(
    () => ({
      fillStyle: 'solid',
      roughness: 0,
      strokeWidth: 1,
      ...roughProps,
      fill: disabled ? '#D1D5DB' : typeStyle[type].fill,
      stroke: disabled ? '#9CA3AF' : typeStyle[type].stroke,
      radius: '4 4 4 4'
    }),
    [type, disabled]
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
  }, [disabled]);

  return (
    <RoughWrap
      customElement="button"
      shape="roundedRectTangle"
      radius={radius}
      roughProps={finalRoughProps}
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
  disabled: false,
  className: ''
};

export default memo(Button);
