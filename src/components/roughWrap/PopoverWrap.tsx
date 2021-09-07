import classNames from 'classnames';
import { useImperativeHandle, AllHTMLAttributes, forwardRef, CSSProperties, useRef, LegacyRef, memo } from 'react';
import { Options } from 'roughjs/bin/core';
import { useSize } from 'ahooks';
import { getPopoverPath, getSafeSize } from '../../utils';
import Icon from '../icon';
import ReactRough, { Polygon } from '../rough';
import { PlacementsType } from '../tooltip/constants';

const cls = 'alan-rough-wrap';

interface PopoverWrapProps extends Options, AllHTMLAttributes<HTMLElement> {
  placement?: PlacementsType;
  style?: CSSProperties;
  wrapClassName?: string;
  closeable?: boolean;
  onClose?: () => void;
  className?: string;
}

export const PopoverWrap = forwardRef<unknown, PopoverWrapProps>((props, ref) => {
  const { children, className, wrapClassName, placement = 'top', style, closeable, onClose, ...roughOptions } = props;
  const element = useRef<HTMLElement>();
  const { width, height } = useSize(element);
  const placementPath = getPopoverPath(width, height, placement);
  const { width: safeWidth, height: safeHeight } = getSafeSize(placement, width, height);

  useImperativeHandle(ref, () => element.current);

  return (
    <div
      ref={element as LegacyRef<HTMLDivElement>}
      className={classNames(cls, `${cls}-popover-wrap`, `${cls}-${placement}`, wrapClassName)}
      style={style}
    >
      {closeable && <Icon type="close" className={`${cls}-close`} onClick={onClose} />}

      <div className={classNames(`${cls}-popover`, className)}>{children}</div>

      {/* +15为小箭头的安全大小 */}
      <ReactRough width={safeWidth} height={safeHeight} renderer="svg">
        <Polygon points={placementPath} {...roughOptions} />
      </ReactRough>
    </div>
  );
});

PopoverWrap.defaultProps = {
  placement: 'top',
  style: {},
  closeable: false,
  className: ''
};

export default memo(PopoverWrap);
