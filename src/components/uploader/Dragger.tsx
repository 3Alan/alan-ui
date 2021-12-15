import { Icon } from '@autobest-ui/components';
import React, { FC, memo, MouseEvent, useRef } from 'react';

interface DraggerProps {
  onAdd?: (e: MouseEvent) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const cls = 'ab-uploader';

const Dragger: FC<DraggerProps> = (props) => {
  const addElement = useRef<HTMLDivElement>();
  const { onAdd, onDrop } = props;

  const onDragEnter = () => {
    if (addElement.current) {
      addElement.current.style.borderColor = '#1890ff';
    }
  };

  const onDragLeave = () => {
    if (addElement.current) {
      addElement.current.style.borderColor = '#d9d9d9';
    }
  };

  const onDropEffect = (e) => {
    if (addElement.current) {
      addElement.current.style.borderColor = '#d9d9d9';
    }
    onDrop(e);
  };

  return (
    <div
      ref={addElement}
      className={`${cls}-add`}
      onClick={onAdd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropEffect}
    >
      <Icon name="plus" width={0.12} color="#7c7c7c" />
      <div>Upload</div>
    </div>
  );
};

export default memo(Dragger);
