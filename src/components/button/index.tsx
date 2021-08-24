import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

type NativeButtonProps = ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = AnchorHTMLAttributes<HTMLElement>;

export interface ButtonProps {
  size?: 'small' | 'default';
  type?: 'standard' | 'primary';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const cls = 'btn';

// ts Partial
const Button: FC<
  ButtonProps & Omit<React.ButtonHTMLAttributes<any>, 'onClick' | 'type'>
> = props => {
  const { children, type, className, size, ...restProps } = props;

  const classes = classNames(
    cls,
    `${cls}-base`,
    {
      [`${cls}-${type}`]: type,
      [`${cls}-${size}`]: size !== 'default'
    },
    className
  );

  return (
    <button className={classes} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'primary',
  size: 'default'
};

export default Button;
