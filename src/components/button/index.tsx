import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';

type NativeButtonProps = ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = AnchorHTMLAttributes<HTMLElement>;

// ts Partial
const Button: FC = ({ children }) => <button>{children}</button>;

export default Button;
