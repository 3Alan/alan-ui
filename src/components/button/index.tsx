import { FC, useRef, useState } from 'react';
import classNames from 'classnames';
import ReactRough, { Rectangle } from '../rough';
import { useCallback } from 'react';
import { useSize } from '../../hooks/useSize';

export interface ButtonProps {
  size?: 'small' | 'default';
  type?: 'standard' | 'primary';
  disabled?: boolean;
  className?: string;
  /**
   * 手绘风格
   */
  drawnStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'dashed' | 'zigzag-line';
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
  const { children, type = 'primary', className, size, disabled, drawnStyle, ...restProps } = props;
  const parentRef = useRef<HTMLButtonElement>(null);
  const canvasSize = useSize(parentRef);
  const [fillStyle, setFillStyle] = useState(drawnStyle);

  const classes = classNames(
    cls,
    `${cls}-base`,
    {
      [`${cls}-${size}`]: size !== 'default'
    },
    className
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
    <button
      className={classes}
      style={{ color: disabled ? '#9CA3AF' : typeStyle[type].stroke }}
      ref={parentRef}
      disabled={disabled}
      onMouseEnter={onEnterEffect}
      onMouseLeave={onLeaveEffect}
      {...restProps}
    >
      <div className={`${cls}-inner-wrap`}>{children}</div>
      {/* TODO: 长宽根据父元素大小获取，撑满整个父元素，抽象成一个组件，使用createElement */}
      <ReactRough width={canvasSize.width + 4} height={canvasSize.height + 4} renderer="svg">
        <Rectangle
          x={2}
          y={2}
          width={canvasSize.width}
          height={canvasSize.height}
          fill={disabled ? '#D1D5DB' : typeStyle[type].fill}
          stroke={disabled ? '#9CA3AF' : typeStyle[type].stroke}
          fillStyle={fillStyle}
        />
      </ReactRough>
    </button>
  );
};

Button.defaultProps = {
  type: 'primary',
  size: 'default',
  drawnStyle: 'hachure',
  disabled: false,
  className: ''
};

export default Button;
