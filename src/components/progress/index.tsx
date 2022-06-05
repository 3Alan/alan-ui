import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { RoughWrap } from '../roughWrap';

export interface ProgressProps {
  /** 进度 */
  percent: number;
  /** 进度条整体的高度 */
  height?: number;
  /** 是否显示进度文字 */
  showText?: boolean;
  className?: string;
}

const cls = 'alan-progress';

export const Progress: FC<ProgressProps> = ({ percent = 0, showText = true, height = 12, className }) => {
  const safePercent = useMemo(() => {
    if (percent > 100) {
      return 100;
    }
    if (percent < 0) {
      return 0;
    }
    return percent;
  }, [percent]);

  return (
    <div className={classNames(cls, className)}>
      <RoughWrap
        customElement="div"
        shape="rectTangle"
        className={`${cls}-outer`}
        style={{ height }}
        roughProps={{
          stroke: '#6B7280',
          strokeWidth: 1.5
        }}
      >
        <RoughWrap
          customElement="div"
          shape="rectTangle"
          className={`${cls}-inner`}
          data-testid="inner"
          style={{
            width: `${safePercent}%`,
            height
          }}
          roughProps={{
            fill: 'rgb(0, 120, 212)',
            stroke: 'none',
            fillWeight: 2.5
          }}
        />
      </RoughWrap>

      {showText && (
        <div data-testid="text" className={`${cls}-text`}>
          {safePercent}%
        </div>
      )}
    </div>
  );
};

export default Progress;
