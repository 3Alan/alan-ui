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
      {/* TODO： 每次都会重新渲染 */}
      <RoughWrap
        customElement="div"
        shape="roundedRectTangle"
        radius="5 5 5 5"
        className={`${cls}-outer`}
        style={{ height }}
        roughProps={{
          roughness: 0,
          stroke: '#6B7280',
          strokeWidth: 2
        }}
      >
        <RoughWrap
          customElement="div"
          shape="roundedRectTangle"
          radius="5 5 5 5"
          className={`${cls}-inner`}
          data-testid="inner"
          style={{
            width: `${safePercent}%`,
            height: height - 2
          }}
          roughProps={{
            roughness: 0,
            fill: '#93C5FD',
            fillStyle: 'solid',
            stroke: 'none'
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
