import { FC, HTMLProps } from 'react';
import ReactRough, { Path } from '../rough';
import { IconType } from './constants';

export interface IconProps extends HTMLProps<HTMLDivElement> {
  type: keyof typeof IconType;
}

const Icon: FC<IconProps> = (props) => {
  const { type, ...resetProps } = props;
  return (
    <div {...resetProps}>
      <ReactRough width={10} height={10} renderer="svg">
        <Path d={IconType[type]} />
      </ReactRough>
    </div>
  );
};
export default Icon;
