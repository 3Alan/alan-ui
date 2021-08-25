import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import ReactRough, { Rectangle } from '../rough';

type NativeButtonProps = ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = AnchorHTMLAttributes<HTMLElement>;

export interface ButtonProps {
  size?: 'small' | 'default';
  type?: 'standard' | 'primary';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const cls = 'btn';

export const typeStyle = {
  primary: {
    fill: '#60A5FA',
    stroke: '#3B82F6'
  },
  standard: {
    fill: '#9CA3AF',
    stroke: '#6B7280'
  }
};

// ts Partial
const Button: FC<
  ButtonProps & Omit<React.ButtonHTMLAttributes<any>, 'onClick' | 'type'>
> = props => {
  const { children, type = 'primary', className, size, ...restProps } = props;
  const parentRef = useRef<HTMLButtonElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1, height: 1 });

  const classes = classNames(
    cls,
    `${cls}-base`,
    {
      [`${cls}-${type}`]: type,
      [`${cls}-${size}`]: size !== 'default'
    },
    className
  );

  useEffect(() => {
    if (parentRef && parentRef.current) {
      setCanvasSize({
        width: parentRef.current.offsetWidth,
        height: parentRef.current.offsetHeight
      });
    }
  }, [parentRef]);

  return (
    <button
      className={classes}
      style={{ color: typeStyle[type].stroke }}
      {...restProps}
      ref={parentRef}
    >
      {children}
      {/* TODO: 长宽根据父元素大小获取，撑满整个父元素，抽象成一个组件，使用createElement */}
      <ReactRough width={canvasSize.width + 10} height={canvasSize.height + 10}>
        <Rectangle
          x={2}
          y={2}
          width={canvasSize.width}
          height={canvasSize.height}
          fill={typeStyle[type].fill}
          stroke={typeStyle[type].stroke}
        />
      </ReactRough>
    </button>
  );
};

Button.defaultProps = {
  type: 'primary',
  size: 'default'
};

export default Button;
