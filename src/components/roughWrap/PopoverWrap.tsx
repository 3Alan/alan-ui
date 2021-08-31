import classNames from 'classnames';
import { FC, useRef } from 'react';
import { useSize } from '../../utils/hooks/useSize';
import ReactRough, { LinearPath } from '../rough';

const cls = 'rough-wrap';

interface PopoverWrapProps {
  className?: string;
}

const PopoverWrap: FC<PopoverWrapProps> = props => {
  const { children, className } = props;
  const element = useRef<HTMLDivElement>(null);
  const canvasSize = useSize(element);

  return (
    <div className={cls} ref={element}>
      <div className={classNames(`${cls}-child`, className)}>{children}</div>

      {/* TODO: 根据align 计算关键小箭头的三个关键点位 */}
      <ReactRough width={canvasSize.width + 4} height={canvasSize.height + 15} renderer="svg">
        <LinearPath
          points={[
            [2, 0],
            [canvasSize.width, 2],
            [canvasSize.width, canvasSize.height],
            [14, canvasSize.height],
            [10, canvasSize.height + 8],
            [6, canvasSize.height],
            [4, canvasSize.height],
            [2, 2]
          ]}
        />
      </ReactRough>
    </div>
  );
};

export default PopoverWrap;
