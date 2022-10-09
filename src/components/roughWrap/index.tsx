import { AllHTMLAttributes, createElement, forwardRef, memo, MutableRefObject, useRef } from 'react';
import classNames from 'classnames';
import { useSize } from 'ahooks';
import { Options } from 'roughjs/bin/core';
import ReactRough, { Rectangle, Ellipse, RoundedRectTangle } from '../rough';

export interface RoughWrapProps extends AllHTMLAttributes<HTMLElement> {
  customElement: string;
  shape?: 'rectTangle' | 'roundedRectTangle' | 'ellipse';
  roughProps?: Options;
  showShadow?: boolean;
  className?: string;
  radius?: number;
}

// 适用于矩形和椭圆（靠长宽和起点确定形状的图形）
const Shapes = {
  rectTangle: Rectangle,
  roundedRectTangle: RoundedRectTangle,
  ellipse: Ellipse
};

const cls = 'alan-rough-wrap';

export const RoughWrap = forwardRef<unknown, RoughWrapProps>((props: RoughWrapProps, ref) => {
  const {
    children,
    customElement,
    shape = 'rectTangle',
    roughProps,
    showShadow = false,
    className,
    radius = 0,
    ...resetProps
  } = props;
  const mountRef = useRef<HTMLElement>();
  const element = (ref || mountRef) as MutableRefObject<HTMLElement>;
  const size = useSize(element);
  const { width = 0, height = 0 } = size || {};
  const ShapeComponent = Shapes[shape];
  const borderWidth = 1;
  const allBorderWidth = borderWidth * 2;

  const childrenElement = (
    <>
      <div className={`${cls}-child`}>{children}</div>

      {/* 注意children和ReactRough的层级（z-index）关系 */}
      <ReactRough
        className={`${cls}-svg`}
        width={width + allBorderWidth}
        height={height + allBorderWidth}
        renderer="svg"
      >
        <ShapeComponent
          radius={radius as number}
          x={borderWidth}
          y={borderWidth}
          width={width}
          height={height}
          {...roughProps}
        />
      </ReactRough>

      {showShadow && (
        <ReactRough
          className={`${cls}-shadow`}
          width={width + allBorderWidth}
          height={height + allBorderWidth}
          renderer="svg"
          style={{ left: 4, top: 4 }}
        >
          <ShapeComponent
            radius={radius as number}
            x={borderWidth}
            y={borderWidth}
            width={width}
            height={height}
            {...roughProps}
            fill="#F5F3FF"
          />
        </ReactRough>
      )}
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
