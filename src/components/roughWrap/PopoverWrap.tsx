import classNames from 'classnames';
import { FC, useRef } from 'react';
import { Point } from 'roughjs/bin/geometry';
import { useSize } from '../../utils/hooks/useSize';
import ReactRough, { LinearPath } from '../rough';
import { PlacementsType } from '../tooltip/constants';

const cls = 'rough-wrap';

interface PopoverWrapProps {
  placement?: PlacementsType;
  className?: string;
}

function getPath(width: number, height: number, placement: PlacementsType): Point[] {
  const minWidth = width > 60 ? width : 60;
  const minHeight = width > 30 ? height : 30;

  const pathMap = {
    bottom: [
      [2, 8],
      [(minWidth - 8) / 2, 8],
      [(minWidth - 8) / 2 + 4, 0],
      [(minWidth - 8) / 2 + 8, 8],
      [minWidth, 8],
      [minWidth, minHeight + 8],
      [2, minHeight + 8],
      [2, 8]
    ],
    top: [
      [2, 0],
      [minWidth, 2],
      [minWidth, minHeight],
      [(minWidth - 8) / 2 + 8, minHeight],
      [(minWidth - 8) / 2 + 4, minHeight + 8],
      [(minWidth - 8) / 2, minHeight],
      [2, minHeight],
      [2, 0]
    ],
    left: [
      [0, 0],
      [minWidth, 0],
      [minWidth, (minHeight - 8) / 2],
      [minWidth + 8, (minHeight - 8) / 2 + 4],
      [minWidth, (minHeight - 8) / 2 + 8],
      [minWidth, minHeight],
      [0, minHeight],
      [0, 0]
    ],
    right: [
      [minWidth + 8, 0],
      [8, 0],
      [8, (minHeight - 8) / 2],
      [2, (minHeight - 8) / 2 + 4],
      [8, (minHeight - 8) / 2 + 8],
      [8, minHeight],
      [minWidth + 8, minHeight],
      [minWidth + 8, 0]
    ]
  };
  return pathMap[placement] as Point[];
}

const PopoverWrap: FC<PopoverWrapProps> = props => {
  const { children, className, placement = 'top' } = props;
  const element = useRef<HTMLDivElement>(null);
  const { width, height } = useSize(element);
  const placementPath = getPath(width, height, placement);

  return (
    <div
      className={classNames(cls, {
        [`${cls}-right`]: placement === 'right'
      })}
      ref={element}
    >
      <div className={classNames(`${cls}-child`, className)}>{children}</div>

      {/* TODO: 根据align 计算关键小箭头的三个关键点位，小箭头为一个等腰三角形，宽度固定为8，高度8 */}
      {/* +15为小箭头的安全大小 */}
      <ReactRough width={width + 15} height={height + 15} renderer="svg">
        <LinearPath points={placementPath} />
      </ReactRough>
    </div>
  );
};

PopoverWrap.defaultProps = {
  placement: 'top',
  className: ''
};

export default PopoverWrap;
