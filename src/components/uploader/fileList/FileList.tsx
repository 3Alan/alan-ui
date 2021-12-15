import React, { FC, Fragment, memo } from 'react';
import { UploadFile } from '../interface';
import FileItem from './FileItem';
import './index.scss';

interface FileListProps {
  items?: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

const cls = 'uploader-fl';

const FileList: FC<FileListProps> = (props) => {
  const { items, onRemove } = props;

  return (
    <>
      {items.map((item) => (
        <FileItem item={item} key={item.uid} className={`${cls}-fileList-item`} onRemove={() => onRemove(item)} />
      ))}
    </>
  );
};

export default memo(FileList);
