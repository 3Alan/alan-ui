import classNames from 'classnames';
import { FC, useRef } from 'react';
import { Options } from 'roughjs/bin/core';
import { Point } from 'roughjs/bin/geometry';
import { useSize } from '../../utils/hooks/useSize';
import ReactRough, { Polygon } from '../rough';
import { PlacementsType } from '../tooltip/constants';

const cls = 'rough-wrap';

interface PopoverWrapProps extends Options {
  placement?: PlacementsType;
  className?: string;
}

function getPath(width: number, height: number, placement: PlacementsType): Point[] {
  const minWidth = width > 60 ? width : 60;
  const minHeight = width > 30 ? height : 30;

  const pathMap = {
    bottom: [
      [2, 5],
      [(minWidth - 8) / 2, 5],
      [(minWidth - 8) / 2 + 4, 2],
      [(minWidth - 8) / 2 + 8, 5],
      [minWidth, 5],
      [minWidth, minHeight + 5],
      [2, minHeight + 5]
    ],
    top: [
      [2, 0],
      [minWidth, 2],
      [minWidth, minHeight],
      [(minWidth - 8) / 2 + 8, minHeight],
      [(minWidth - 8) / 2 + 4, minHeight + 3],
      [(minWidth - 8) / 2, minHeight],
      [2, minHeight]
    ],
    left: [
      [0, 0],
      [minWidth, 0],
      [minWidth, (minHeight - 8) / 2],
      [minWidth + 3, (minHeight - 8) / 2 + 4],
      [minWidth, (minHeight - 8) / 2 + 8],
      [minWidth, minHeight],
      [0, minHeight]
    ],
    right: [
      [minWidth + 5, 0],
      [5, 0],
      [5, (minHeight - 8) / 2],
      [2, (minHeight - 8) / 2 + 4],
      [5, (minHeight - 8) / 2 + 8],
      [5, minHeight],
      [minWidth + 5, minHeight]
    ]
  };
  return pathMap[placement] as Point[];
}

const PopoverWrap: FC<PopoverWrapProps> = props => {
  const { children, className, placement = 'top', ...roughOptions } = props;
  const element = useRef<HTMLDivElement>(null);
  const { width, height } = useSize(element);
  const placementPath = getPath(width, height, placement);

  return (
    <div className={classNames(cls, `${cls}-${placement}`)} ref={element}>
      <div className={classNames(`${cls}-popover`, className)}>{children}</div>

      {/* TODO: 根据align 计算小箭头的三个关键点位，小箭头为一个等腰三角形，宽度/高度固定为8/3 */}
      {/* +15为小箭头的安全大小 */}
      <ReactRough width={width + 15} height={height + 15} renderer="svg">
        <Polygon points={placementPath} {...roughOptions} />
      </ReactRough>
    </div>
  );
};

PopoverWrap.defaultProps = {
  placement: 'top',
  className: ''
};

export default PopoverWrap;
