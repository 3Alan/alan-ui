import React, { FC, useMemo, useState, useCallback, memo } from 'react';
import classNames from 'classnames';

import RoughWrap from '../roughWrap';

export interface ButtonProps {
  size?: 'small' | 'default';
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
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const cls = 'alan-btn';

export const typeStyle = {
  primary: {
    fill: '#BFDBFE',
    stroke: '#3B82F6'
  },
  standard: {
    fill: '#9CA3AF',
    stroke: '#1F2937'
  }
};

/**
 * 按钮组件
 */
export const Button: FC<ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLElement>, 'onClick' | 'type' | 'disabled'>> =
  (props) => {
    const { children, type = 'primary', className, size, disabled, drawnStyle, roughness, ...restProps } = props;
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
        fillStyle,
        roughness
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
        {children}
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

export default memo(Button);
