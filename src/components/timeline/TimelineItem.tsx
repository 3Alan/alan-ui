import { useSize } from 'ahooks';
import { FC, memo, useRef } from 'react';
import ReactRough, { Line } from '../rough';
import RoughWrap from '../roughWrap';

const cls = 'alan-timeline';

export interface TimelineItemProps {
  color?: string;
}

export const TimelineItem: FC<TimelineItemProps> = memo(({ children, color }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const size = useSize(contentRef);

  return (
    <li>
      <div className={`${cls}-dot-wrap`}>
        <RoughWrap
          contentClassName={`${cls}-dot`}
          customElement="span"
          shape="ellipse"
          roughProps={{ roughness: 0, fill: color || '#60A5FA', fillStyle: 'solid', stroke: '#374151' }}
        />
        <ReactRough className={`${cls}-tail`} width={12} height={size?.height} renderer="svg">
          <Line
            x1={6}
            y1={0}
            x2={6}
            y2={size?.height || 0}
            roughness={0}
            fillStyle="solid"
            stroke="#9CA3AF"
            strokeLineDash={[2]}
          />
        </ReactRough>
      </div>

      <div className={`${cls}-content`} ref={contentRef}>
        {children}
      </div>
    </li>
  );
});

export default TimelineItem;
