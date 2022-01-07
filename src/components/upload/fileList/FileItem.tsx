import classNames from 'classnames';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { UploadFile, UploadStatus } from '../interface';
import { getBase64 } from '../utils';
import Modal from '../../modal';

interface FileItemProps {
  item: UploadFile;
  className?: string;
  onRemove: () => void;
}

const cls = 'upload-fl';

const FileItem: FC<FileItemProps> = (props) => {
  const { item, onRemove, className } = props;
  const { url, status } = item;
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const uploadFailed = useMemo(() => status === UploadStatus.ERROR, [status]);
  const uploading = useMemo(() => status === UploadStatus.UPLOADING, [status]);

  useEffect(() => {
    if (uploading) {
      getBase64(item.rawFile as File).then((res) => setPreviewImage(res));
    }
  }, [item, uploading]);

  const onPreview = () => {
    setIsPreviewVisible(true);
  };

  const onPreviewModalClose = () => {
    setIsPreviewVisible(false);
  };

  return (
    <div
      className={classNames(className, `${cls}-fi`, {
        [`${cls}-error`]: uploadFailed
      })}
    >
      {uploading && <img src={previewImage} alt="" />}
      {uploadFailed ? <div className={`${cls}-error-info`}>error</div> : <img src={url} alt="" onClick={onPreview} />}
      <div className={`${cls}-delete`} onClick={onRemove}>
        delete
      </div>

      <Modal maskClosable={false} visible={isPreviewVisible} onClose={onPreviewModalClose}>
        <img src={url} alt="" />
      </Modal>
    </div>
  );
};

export default memo(FileItem);
