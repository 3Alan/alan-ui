import { FC, memo, MouseEvent, useRef, DragEvent } from 'react';

interface DraggerProps {
  onAdd?: (e: MouseEvent) => void;
  onDrop?: (e: DragEvent<HTMLDivElement>) => void;
}

const cls = 'alan-upload';

const Dragger: FC<DraggerProps> = (props) => {
  const addElement = useRef<HTMLDivElement>(null);
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

  const onDropEffect = (e: DragEvent<HTMLDivElement>) => {
    if (addElement.current) {
      addElement.current.style.borderColor = '#d9d9d9';
    }
    onDrop?.(e);
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
      +<div>Upload</div>
    </div>
  );
};

export default memo(Dragger);
