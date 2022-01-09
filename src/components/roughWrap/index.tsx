import { AllHTMLAttributes, createElement, forwardRef, memo, MutableRefObject, useRef } from 'react';
import classNames from 'classnames';
import { useSize } from 'ahooks';
import { Options } from 'roughjs/bin/core';
import ReactRough, { Rectangle, Ellipse } from '../rough';

export interface RoughWrapProps extends AllHTMLAttributes<HTMLElement> {
  customElement: string;
  shape?: 'rectTangle' | 'ellipse';
  roughProps?: Options;
  className?: string;
}

// 适用于矩形和椭圆（靠长宽和起点确定形状的图形）
const Shapes = {
  rectTangle: Rectangle,
  ellipse: Ellipse
};

const cls = 'alan-rough-wrap';

export const RoughWrap = forwardRef<unknown, RoughWrapProps>((props: RoughWrapProps, ref) => {
  const { children, customElement, shape = 'rectTangle', roughProps, className, ...resetProps } = props;
  const mountRef = useRef<HTMLElement>();
  const element = (ref || mountRef) as MutableRefObject<HTMLElement>;
  const size = useSize(element);
  const { width = 0, height = 0 } = size || {};
  const ShapeComponent = Shapes[shape];

  const childrenElement = (
    <>
      <div className={`${cls}-child`}>{children}</div>

      {/* 注意children和ReactRough的层级（z-index）关系 */}
      <ReactRough width={width + 4} height={height + 4} renderer="svg">
        <ShapeComponent x={2} y={2} width={width} height={height} {...roughProps} />
      </ReactRough>
    </>
  );

  return createElement(
    customElement,
    {
      ref: element,
      className: classNames(cls, className),
      ...resetProps
    },
    childrenElement
  );
});

RoughWrap.defaultProps = {
  className: '',
  roughProps: {}
};

export default memo(RoughWrap);
