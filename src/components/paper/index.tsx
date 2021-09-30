import { FC } from 'react';
import { RoughWrap } from '../roughWrap';

const cls = 'alan-paper';

export interface PaperProps {}

// TODO:
const Paper: FC<PaperProps> = (props) => {
  const { children } = props;
  return (
    <RoughWrap className={`${cls}-wrap`} customElement="div" shape="rectTangle">
      {children}
    </RoughWrap>
  );
};

export default Paper;
