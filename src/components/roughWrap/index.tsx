import { AllHTMLAttributes, createElement, forwardRef, MutableRefObject, useRef } from 'react';
import ReactRough, { Rectangle, Ellipse } from '../rough';
import { useSize } from '../../utils/hooks/useSize';
import classNames from 'classnames';

export interface RoughWrapProps extends AllHTMLAttributes<HTMLElement> {
  customElement: string;
  shap: 'rectTangle' | 'ellipse';
  shapProps?: any;
  className?: string;
}

// 适用于矩形和椭圆（靠长宽和起点确定形状的图形）
const Shapes = {
  rectTangle: Rectangle,
  ellipse: Ellipse
};

const cls = 'alan-rough-wrap';

export const RoughWrap = forwardRef<unknown, RoughWrapProps>((props, ref) => {
  const { children, customElement, shap, shapProps, className, ...resetProps } = props;
  const innerElement = useRef<HTMLElement>();
  const element = (ref || innerElement) as MutableRefObject<HTMLElement>;
  const canvasSize = useSize(element);
  const ShapeComponent = Shapes[shap];

  const childrenElement = (
    <>
      <div className={`${cls}-child`}>{children}</div>

      {/* 注意childre和ReactRough的层级（z-index）关系 */}
      <ReactRough width={canvasSize.width + 4} height={canvasSize.height + 4} renderer="svg">
        <ShapeComponent
          x={2}
          y={2}
          width={canvasSize.width}
          height={canvasSize.height}
          {...shapProps}
        />
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
  shapProps: {}
};

export default RoughWrap;
