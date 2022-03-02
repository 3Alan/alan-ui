import classNames from 'classnames';
import { FC, memo, ReactNode } from 'react';

const cls = 'alan-timeline';

export interface TimelineItemProps {
  dot?: ReactNode;
}

export const TimelineItem: FC<TimelineItemProps> = ({ children, dot }) => {
  return (
    <li>
      <div className={`${cls}-tail`} />
      <div className={classNames({ [`${cls}-dot`]: !dot }, `${cls}-header`)}>{dot}</div>
      <div className={`${cls}-content`}>{children}</div>
    </li>
  );
};

export default memo(TimelineItem);
