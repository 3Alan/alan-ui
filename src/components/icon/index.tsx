import { FC } from 'react';
import { IconType } from 'react-icons';
import ReactRough, { Path } from '../rough';
import { PathProps } from '../rough/RoughComponentProps';

export interface IconProps extends Partial<PathProps> {
  /**
   * 对应的icon
   */
  item: IconType;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon: FC<IconProps> = (props) => {
  const { item, width, height, ...resetProps } = props;

  const { viewBox } = item({}).props.attr;
  const { d } = item({}).props.children[0].props;

  return (
    <ReactRough width={width} height={height} renderer="svg" svgViewBox={viewBox}>
      <Path {...resetProps} d={d} />
    </ReactRough>
  );
};

Icon.defaultProps = {
  width: 24,
  height: 24,
  fill: '#000'
};

export default Icon;
