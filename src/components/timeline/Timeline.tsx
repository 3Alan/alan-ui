import { FC, memo } from 'react';

const cls = 'alan-timeline';

export interface TimelineProps {}

export const Timeline: FC<TimelineProps> = ({ children }) => {
  return <ul className={cls}>{children}</ul>;
};

export default memo(Timeline);
