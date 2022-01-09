import { FC, memo, MouseEvent, useRef, DragEvent, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Icon from '../icon';
import { RoughWrap } from '../roughWrap';

interface DraggerProps {
  onAdd?: (e: MouseEvent) => void;
  onDrop?: (e: DragEvent<HTMLDivElement>) => void;
}

const cls = 'alan-upload';

const Dragger: FC<DraggerProps> = (props) => {
  const { onAdd, onDrop } = props;
  const addElement = useRef<HTMLDivElement>(null);

  const [roughProps, setRoughProps] = useState({
    stroke: '#d9d9d9',
    strokeLineDash: [3, 3]
  });

  const onMouseEnter = () => {
    setRoughProps({
      ...roughProps,
      stroke: '#1890ff'
    });
  };

  const onMouseLeave = () => {
    setRoughProps({
      ...roughProps,
      stroke: '#d9d9d9'
    });
  };

  const onDragEnter = () => {
    setRoughProps({
      ...roughProps,
      stroke: '#1890ff'
    });
  };

  const onDragLeave = () => {
    setRoughProps({
      ...roughProps,
      stroke: '#d9d9d9'
    });
  };

  const onDropEffect = (e: DragEvent<HTMLDivElement>) => {
    setRoughProps({
      ...roughProps,
      stroke: '#d9d9d9'
    });
    onDrop?.(e);
  };

  return (
    <RoughWrap
      customElement="div"
      ref={addElement}
      roughProps={roughProps}
      onClick={onAdd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropEffect}
    >
      <div className={`${cls}-add`}>
        <Icon width={16} height={16} item={FaPlus} />
        <div>Upload</div>
      </div>
    </RoughWrap>
  );
};

export default memo(Dragger);
