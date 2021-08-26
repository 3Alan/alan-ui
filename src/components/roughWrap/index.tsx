import { AllHTMLAttributes, createElement, FC, useRef } from 'react';
import ReactRough, { Rectangle, Circle, Ellipse } from '../rough';
import { useSize } from '../../hooks/useSize';
import './index.scss';
import classNames from 'classnames';

export interface RoughWrapProps extends AllHTMLAttributes<HTMLElement> {
  customElement: string;
  shap: 'rectTangle' | 'circle' | 'ellipse';
  shapProps: any;
  className?: string;
}

const Shapes = {
  rectTangle: Rectangle,
  circle: Circle,
  ellipse: Ellipse
};

const cls = 'rough-wrap';

export const RoughWrap: FC<RoughWrapProps> = props => {
  const { children, customElement, shap, shapProps, className, ...resetProps } = props;
  const element = useRef<HTMLElement>(null);
  const canvasSize = useSize(element);
  const ShapeComponent = Shapes[shap];

  const childrenElement = (
    <>
      {children}
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

  return createElement(customElement, {
    ref: element,
    children: childrenElement,
    className: classNames(cls, className),
    ...resetProps
  });
};

RoughWrap.defaultProps = {
  className: ''
};

export default RoughWrap;
