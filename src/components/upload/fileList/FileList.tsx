import { FC, memo } from 'react';
import { ListType, UploadFile } from '../interface';
import PictureItem from './PictureItem';
import TextItem from './TextItem';

interface FileListProps {
  items?: UploadFile[];
  type?: 'picture' | 'text';
  onRemove: (file: UploadFile) => void;
}

const cls = 'alan-upload-fl';

const FileList: FC<FileListProps> = (props) => {
  const { items = [], type = ListType.PICTURE, onRemove } = props;

  if (type === ListType.TEXT) {
    return (
      <>
        {items.map((item) => (
          <TextItem item={item} key={item.uid} onRemove={() => onRemove(item)} />
        ))}
      </>
    );
  }

  return (
    <>
      {items.map((item) => (
        <PictureItem item={item} key={item.uid} className={`${cls}-picture-item`} onRemove={() => onRemove(item)} />
      ))}
    </>
  );
};

export default memo(FileList);
