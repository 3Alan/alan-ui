/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { CSSProperties, FC, MutableRefObject, RefObject } from 'react';
import { Config } from 'roughjs/bin/core';
import RoughContext from './RoughContext';

type SvgRef = MutableRefObject<SVGSVGElement>;
type CanvasRef = MutableRefObject<HTMLCanvasElement>;
type Renderer = 'canvas' | 'svg';

interface RoughProps {
  width?: number;
  height?: number;
  config?: Config;
  svgViewBox?: string;
  renderer?: Renderer;
}

interface RoughCompProps extends RoughProps {
  forwardedRef?: RefObject<unknown>;
  className?: string;
  style?: CSSProperties;
}

export const ReactRoughComp: FC<RoughCompProps> = ({
  config,
  width,
  height,
  renderer,
  svgViewBox,
  forwardedRef,
  className,
  style,
  children
}) => {
  const svgRef = React.useRef<SVGSVGElement>();
  const canvasRef = React.useRef<HTMLCanvasElement>();

  if (forwardedRef) {
    return (
      <RoughContext.Provider
        value={{
          config,
          width,
          height,
          type: 'canvas',
          ref: forwardedRef as SvgRef
        }}
      >
        {children}
      </RoughContext.Provider>
    );
  }

  if (renderer === 'svg') {
    return (
      <RoughContext.Provider
        value={{
          config,
          type: 'svg',
          ref: svgRef as SvgRef
        }}
      >
        <svg
          className={className}
          style={{ ...style, width, height }}
          ref={svgRef as SvgRef}
          viewBox={svgViewBox || `0 0 ${width} ${height}`}
        >
          {children}
        </svg>
      </RoughContext.Provider>
    );
  }

  return (
    <RoughContext.Provider
      value={{
        config,
        width,
        height,
        type: 'canvas',
        ref: canvasRef as CanvasRef
      }}
    >
      <canvas className={className} style={style} width={width} height={height} ref={canvasRef as CanvasRef}>
        {children}
      </canvas>
    </RoughContext.Provider>
  );
};

export const ReactRough: React.FC<RoughCompProps> = React.forwardRef((props, ref) => {
  const { width = 300, height = 150, renderer = 'svg', ...resetProps } = props;
  return (
    <ReactRoughComp
      width={width}
      height={height}
      renderer={renderer}
      {...resetProps}
      forwardedRef={ref as RefObject<unknown>}
    />
  );
});

ReactRough.displayName = 'ReactRough';

export * from './RoughComponents';
export default ReactRough;
